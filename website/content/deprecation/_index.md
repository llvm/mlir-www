---
title: "Depreciations"
date: 2023-02-16T15:26:15Z
draft: false
weight: 2
---

This page collects current depreciation in MLIR of API and features we intend
to remove soon.

## Use free function for `dyn_cast`/`cast`

When casting attributes or type, use the free functions variants, e.g.,
`dyn_cast<T>(x)`, `isa<T>(x)`, etc. Use of the cast methods variants (e.g.,
`x.dyn_cast<T>()`) should be avoided in new code as we'll remove these
methods in the future.

