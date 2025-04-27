---
title: "Deprecations & Current Refactoring"
date: 2023-02-16T15:26:15Z
draft: false
weight: 2
---

This page collects current deprecations in MLIR of API and features we intend
to remove soon, as well as large refactoring an migration on-going.
We try to list these here for the purpose of helping downstream users keeping
up with MLIR development.

## Deprecated

### Use `matchAndRewrite` instead of `match` / `rewrite`

The `match` and `rewrite` functions of `RewritePattern` and `ConversionPattern`
are deprecated. Use the combined `matchAndRewrite` instead.

## On-going Refactoring & large changes

# Past Deprecation and Refactoring

## LLVM 17

### "Promised Interface" and the need to explicitly register InlinerExtension for the `FuncDialect`.

We're tightening the contract around injecting interfaces into the system externally, starting with
`DialectInterface`. As an important visible change at the moment is that if you're using the inliner
with the `FuncDialect`, you need to call `func::registerAllExtensions(registry);` when setting up
your `MLIRContext`.

### Properties && changes to the generic printing format

See on [Discourse](https://discourse.llvm.org/t/rfc-introducing-mlir-operation-properties/67846/19).

Properties is a new feature in MLIR that will allow to separate the storage of
inherent attributes from the discardable ones. One key visible change is the
generic assembly format which gain a new attribute entry in-between `<` `>`.

### `preloadDialectInContext` has been deprecated for >1y and was removed

See https://github.com/llvm/llvm-project/commit/9c8db444bc85

If you have an mlir-opt tool and you’re still depending on
`preloadDialectInContext`, you need to revisit your pipeline. This option
used with mlir-opt is hiding issues with the pipeline, and indications of
missing getDependentDialects().
[Discussion on Discourse](https://discourse.llvm.org/t/psa-preloaddialectincontext-has-been-deprecated-for-1y-and-will-be-removed/68992)

### Migrating `mlir-opt`-like tools to use `MlirOptMainConfig`

See https://github.com/llvm/llvm-project/commit/ffd6f6b91a3

If your `mlir-opt`-like tool is using the
`MlirOptMain(int argc, char **argv, ...)` entry point you won’t be affected,
otherwise, see the
[Discussion on Discourse](https://discourse.llvm.org/t/psa-migrating-mlir-opt-like-tools-to-use-mliroptmainconfig/68991)

### Deprecation of `gpu-to-(cubin|hsaco)` in favor of GPU compilation attributes

[GPU compilation attributes](https://mlir.llvm.org/docs/Dialects/GPU/#gpu-compilation) are a completely new mechanism for handling the compilation
of GPU modules down to binary or other formats in an extensible way. This mechanism lifts
many current restrictions the GPU serialization passes had, like being present only if the
CUDA driver is there or not linking to LibDevice.

One key difference is the usage of `ptxas` or the `nvptxcompiler` library for compiling PTX
to binary; hence the CUDATollkit is required for generating binaries.

For these attributes to work correctly, making registration calls to `registerNVVMTargetInterfaceExternalModels`,
`registerROCDLTargetInterfaceExternalModels` and `registerOffloadingLLVMTranslationInterfaceExternalModels` are necessary.

The passes `gpu-to-(cubin|hsaco)` will be removed in a future release.

## LLVM 18

### Port uses of LLVM Dialect to opaque pointers

LLVM 17 has stopped officially supporting typed pointers, and MLIRs LLVM Dialect
is now in the process of dropping the support as well. This was announced back
in February 2023 ([PSA](https://discourse.llvm.org/t/psa-in-tree-conversion-passes-can-now-be-used-with-llvm-opaque-pointers-please-switch-your-downstream-projects/68738))
, and now the final steps, i.e., removing the typed pointers, have started
([PSA](https://discourse.llvm.org/t/psa-removal-of-typed-pointers-from-the-llvm-dialect/74502)).
If you are still targeting LLVM dialect with typed pointers, an update to
support opaque pointers will be necessary.


## LLVM 19

### Removal of `gpu-to-(cubin|hsaco)` in favor of GPU compilation attributes

**Notice: The passes `gpu-to-(cubin|hsaco)` have been removed from the monorepo, use target attributes instead. See the LLVM 17 section on this page for more information.**

## LLVM 20

### Removal of `vector.reshape`

This operation was added back in 2019, and since then, no lowerings or uses have
been implemented in upstream MLIR or any known downstream projects. Due to this
lack of use, it was decided that the operation should be removed.

[Discussion on Discourse](https://discourse.llvm.org/t/rfc-should-vector-reshape-be-removed/80478)

## LLVM 21

### Use the free function variants for `dyn_cast`/`cast`/`isa`/...

When casting attributes or type, use the free functions variants, e.g.,
`dyn_cast<T>(x)`, `isa<T>(x)`, etc. Use of the cast methods variants (e.g.,
`x.dyn_cast<T>()`) should be avoided in new code as we removed these
methods in https://github.com/llvm/llvm-project/pull/135556.

[Discussion on Discourse](https://discourse.llvm.org/t/preferred-casting-style-going-forward/68443)
