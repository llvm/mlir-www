---
title: "Users of MLIR"
date: 2019-11-29T15:26:15Z
draft: false
weight: 1
---

## Flang: the LLVM Fortran compiler

The high level IR of the Fortran compiler is modeled using MLIR.

## [TensorFlow](https://www.tensorflow.org/mlir)
  MLIR is used as a Graph Transformation framework and the foundation for
  building many tools (TFLite converter, quantization, ...).

## [RISE](https://rise-lang.org/)

RISE is a spiritual successor to the
[Lift project](http://www.lift-project.org/): "a high-level functional data
parallel language with a system of rewrite rules which encode algorithmic
and hardware-specific optimisation choices".

## [IREE](https://github.com/google/iree)

IREE (pronounced "eerie") is a compiler and minimal runtime system for compiling ML models for execution against a HAL (Hardware Abstraction Layer) that is aligned with Vulkan. It aims to be a viable way to compile and run ML devices on a variety of small and medium sized systems, leveraging either the GPU (via Vulkan/SPIR-V), CPU or some combination. It also aims to interoperate seamlessly with existing users of Vulkan APIs, specifically focused on games and rendering pipelines.
