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

### Use the free function variants for `dyn_cast`/`cast`/`isa`/...

When casting attributes or type, use the free functions variants, e.g.,
`dyn_cast<T>(x)`, `isa<T>(x)`, etc. Use of the cast methods variants (e.g.,
`x.dyn_cast<T>()`) should be avoided in new code as we'll remove these
methods in the future.
[Discussion on Discourse](https://discourse.llvm.org/t/preferred-casting-style-going-forward/68443)

### Port uses of LLVM Dialect to opaque pointers

LLVM 17 has stopped officially supporting typed pointers and MLIRs LLVM Dialect 
will follow suit soon by removing them. Users of the LLVM Dialect must switch
to using opaque pointers and stop relying on pointers having an element type.
See the initial [PSA](https://discourse.llvm.org/t/psa-in-tree-conversion-passes-can-now-be-used-with-llvm-opaque-pointers-please-switch-your-downstream-projects/68738)
post for precise instructions and timeline. 

## On-going Refactoring


## Past Deprecation and Refactoring

