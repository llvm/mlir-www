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

## On-going Refactoring


## Past Deprecation and Refactoring

