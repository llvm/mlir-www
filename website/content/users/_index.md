---
title: "Users of MLIR"
date: 2019-11-29T15:26:15Z
draft: false
weight: 1
---

In alphabetical order below.

## [Flang](https://github.com/llvm/llvm-project/tree/master/flang)

Flang is a ground-up implementation of a Fortran front end written in modern C++.
[F18](https://github.com/flang-compiler/f18) was subsequently accepted into the
LLVM project and rechristened as Flang. The high level IR of the Fortran compiler
is modeled using MLIR.

## [IREE](https://github.com/google/iree)

IREE (pronounced "eerie") is a compiler and minimal runtime system for
compiling ML models for execution against a HAL (Hardware Abstraction Layer)
that is aligned with Vulkan. It aims to be a viable way to compile and run
ML devices on a variety of small and medium sized systems, leveraging either
the GPU (via Vulkan/SPIR-V), CPU or some combination. It also aims to
interoperate seamlessly with existing users of Vulkan APIs, specifically
focused on games and rendering pipelines.

## [PlaidML](https://github.com/plaidml/plaidml)

PlaidML is a tensor compiler that facilitates reusable and performance portable
ML models across various hardware targets including CPUs, GPUs, and
accelerators.

## [RISE](https://rise-lang.org/)

RISE is a spiritual successor to the
[Lift project](http://www.lift-project.org/): "a high-level functional data
parallel language with a system of rewrite rules which encode algorithmic
and hardware-specific optimisation choices".

## [TRFT: TensorFlow Runtime](https://github.com/tensorflow/runtime)

TFRT aims to provide a unified, extensible infrastructure layer for an
asynchronous runtime system.

## [TensorFlow](https://www.tensorflow.org/mlir)

MLIR is used as a Graph Transformation framework and the foundation for
building many tools (TFLite converter, quantization, ...).


