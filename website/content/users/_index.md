---
title: "Users of MLIR"
date: 2023-05-04T21:00:54Z
draft: false
weight: 1
---

In alphabetical order below.

## [Accera](https://github.com/microsoft/Accera)

Accera is a compiler that enables you to experiment with loop optimizations without
hand-writing Assembly code. With Accera, these problems and impediments can be
addressed in an optimized way. It is available as a Python library and supports
cross-compiling to a wide range of processor targets.

## [Beaver](https://github.com/beaver-lodge/beaver)

Beaver is an MLIR frontend in Elixir and Zig.
Powered by Elixir's composable modularity and meta-programming features,
Beaver provides a simple, intuitive, and extensible interface for MLIR.

## [Bᴛᴏʀ2ᴍʟɪʀ](https://github.com/jetafese/btor2mlir): A Format and Toolchain for Hardware Verification

Bᴛᴏʀ2ᴍʟɪʀ applies MLIR to the domain of hardware verification by offering a clean way to take advantage of a format's
strengths. For example, we support the use of software verification methods for hardware
verification problems represented in the Bᴛᴏʀ2 format. The project aims to spur and support research
in the formal verification domain, and has been shown to be competitive with existing methods.

## [Catalyst](https://github.com/PennyLaneAI/catalyst)

Catalyst is an AOT/JIT compiler for [PennyLane](https://pennylane.ai/) that
accelerates hybrid quantum programs, with:

- full auto-differentiation support, via custom quantum gradients
  and [Enzyme](https://github.com/EnzymeAD/Enzyme)-based backpropagation,
- a dynamic quantum programming model,
- and integration into the Python ML ecosytem.

Catalyst also comes with the [Lightning](https://github.com/PennyLaneAI/pennylane-lightning/)
high performance simulator by default, but supports an extensible backend system that is
constantly evolving, aiming to deliver execution on heterogenous architectures with GPUs and QPUs.

## [CIRCT](https://github.com/llvm/circt): Circuit IR Compilers and Tools

The CIRCT project is an (experimental!) effort looking to apply MLIR and the LLVM
development methodology to the domain of hardware design tools.

## [Concrete](https://github.com/zama-ai/concrete): TFHE Compiler that converts python programs into FHE equivalent

Concrete is an open-source framework that simplifies the use of
[Fully Homomorphic Encryption](https://fhe.org) (FHE) and makes writing FHE
programs easy for developers

FHE is a powerful technology that enables computations on encrypted data without
needing to decrypt it. This capability ensures user privacy and provides robust
protection against data breaches.

Concrete enables developers to efficiently develop privacy-preserving
applications for various use cases. For instance,
[Concrete ML](https://github.com/zama-ai/concrete-ml) is built on top of
Concrete to integrate privacy-preserving features of FHE into machine learning
use cases.

## [DSP-MLIR](https://github.com/MPSLab-ASU/DSP_MLIR): A Framework for Digital Signal Processing Applications in MLIR

DSP-MLIR is a framework designed specifically for DSP applications. It provides
a DSL (Frontend), compiler, and rewrite patterns that detect DSP patterns and
apply optimizations based on DSP theorems. The framework supports a wide range
of DSP operations, including filters (FIR, IIR, filter response), transforms
(DCT, FFT, IFFT), and other signal processing operations such as delay and gain,
along with additional functionalities for application development. 

## [Enzyme](https://enzyme.mit.edu): General Automatic Differentiation of MLIR
Enzyme (specifically EnzymeMLIR) is a first-class automatic differentiation 
sytem for MLIR. Operations and types implement or inheret general interfaces
to specify their differentiable behavior, which allows Enzyme to provide
efficient forward and reverse pass derivatives. Source code is available [here](https://github.com/EnzymeAD/Enzyme/tree/main/enzyme/Enzyme/MLIR).
See also the [Enzyme-JaX](https://github.com/EnzymeAD/Enzyme-JAX) project which
uses Enzyme to differentiate StableHLO, and thus provide MLIR-native
differentiation and codegen for JaX.

## [Firefly](https://github.com/GetFirefly/firefly): A new compiler and runtime for BEAM languages

Firefly is not only a compiler, but a runtime as well. It consists of two parts:

- A compiler for Erlang to native code for a given target (x86, ARM, WebAssembly)
- An Erlang runtime, implemented in Rust, which provides the core functionality
  needed to implement OTP

The primary motivator for Firefly's development was the ability to compile Elixir
applications that could target WebAssembly, enabling use of Elixir as a language
for frontend development. It is also possible to use Firefly to target other
platforms as well, by producing self-contained executables on platforms such as
x86.

## [Flang](https://github.com/llvm/llvm-project/tree/main/flang)

Flang is a ground-up implementation of a Fortran front end written in modern C++.
It started off as the [f18 project](https://github.com/flang-compiler/f18) with an
aim to replace the previous [flang project](https://github.com/flang-compiler/flang)
and address its various deficiencies. F18 was subsequently accepted into the LLVM
project and rechristened as Flang. The high level IR of the Fortran compiler is modeled
using MLIR.

## [HEIR](https://github.com/google/heir)

HEIR (Homomorphic Encryption Intermediate Representation) is an MLIR-based
toolchain developed by Google for compiling programs that utilize homomorphic
encryption. Homomorphic encryption allows computations to be performed directly
on encrypted data without needing to decrypt it first, thereby preserving data
privacy throughout the computational process.

Building upon the foundation of MLIR (Multi-Level Intermediate Representation),
HEIR provides a flexible and extensible framework for developing compilers
targeting homomorphic encryption. This approach facilitates the optimization and
transformation of code in a manner that is both modular and scalable.

## [IREE](https://github.com/google/iree)

IREE (pronounced "eerie") is a compiler and minimal runtime system for
compiling ML models for execution against a HAL (Hardware Abstraction Layer)
that is aligned with Vulkan. It aims to be a viable way to compile and run
ML devices on a variety of small and medium sized systems, leveraging either
the GPU (via Vulkan/SPIR-V), CPU or some combination. It also aims to
interoperate seamlessly with existing users of Vulkan APIs, specifically
focused on games and rendering pipelines.

## [Kokkos](https://kokkos.org)

The Kokkos C++ Performance Portability Ecosystem is a production level solution 
for writing modern C++ applications in a hardware agnostic way. It is part of the 
US Department of Energies Exascale Project – the leading effort in the US to prepare 
the HPC community for the next generation of super computing platforms. The Ecosystem 
consists of multiple libraries addressing the primary concerns for developing and 
maintaining applications in a portable way. The three main components are the Kokkos 
Core Programming Model, the Kokkos Kernels Math Libraries and the Kokkos Profiling and 
Debugging Tools.

There is current [work](https://github.com/kokkos/kokkos.github.io/files/13651039/Kokkos_MLIR.pdf) 
ongoing to convert MLIR to portable Kokkos-based source code, add a partition dialect 
to MLIR to support tiled and distributed sparse tensors and target spatial dataflow 
accelerators.

## [Lingo DB](https://www.lingo-db.com): Revolutionizing Data Processing with Compiler Technology

LingoDB is a cutting-edge data processing system that leverages compiler technology
to achieve unprecedented flexibility and extensibility without sacrificing
performance. It supports a wide range of data-processing workflows beyond
relational SQL queries, thanks to declarative sub-operators. Furthermore,
LingoDB can perform cross-domain optimization by interleaving optimization
passes of different domains and its flexibility enables sustainable support
for heterogeneous hardware.

LingoDB heavily builds on the MLIR compiler framework for compiling queries
to efficient machine code without much latency.

## [MARCO](https://github.com/marco-compiler/marco): Modelica Advanced Research COmpiler
MARCO is a prototype compiler for the Modelica language, with focus on the
efficient compilation and simulation of large-scale models.
The Modelica source code is processed by external tools to obtain a
modeling language independent representation in Base Modelica, for which an
MLIR dialect has been designed.

The project is complemented by multiple runtime libraries, written in C++, that
are used to drive the generated simulation, provide support functions, and to
ease interfacing with external differential equations solvers.

## [MLIR-AIE](https://github.com/Xilinx/mlir-aie): Toolchain for AMD/Xilinx AIEngine devices

MLIR-AIE is a toolchain providing low-level device configuration for Versal
AIEngine-based devices. Support is provided to target the AIEngine portion of
the device, including processors, stream switches, TileDMA and ShimDMA blocks.
Backend code generation is included, targetting the LibXAIE library, along with
some higher-level abstractions enabling higher-level design.

## [MLIR-DaCe](https://github.com/spcl/mlir-dace): Data-Centric MLIR Dialect

MLIR-DaCe is a project aiming to bridge the gap between control-centric and
data-centric intermediate representations. By bridging these two groups of IRs,
it allows the combination of control-centric and data-centric optimizations in
optimization pipelines. In order to achieve this, MLIR-DaCe provides a data-centric
dialect in MLIR to connect the MLIR and DaCe frameworks.

## [MLIR-EmitC](https://github.com/iml130/mlir-emitc)

MLIR-EmitC provides a way to translate ML models into C++ code. The repository
contains scripts and tools to translate Keras and TensorFlow models into the
[TOSA](https://mlir.llvm.org/docs/Dialects/TOSA/) and
[StableHLO](https://github.com/openxla/stablehlo/) dialect and to convert those to
[EmitC](https://mlir.llvm.org/docs/Dialects/EmitC/).
The latter is used to generate calls to a reference implementation.

The [EmitC](https://mlir.llvm.org/docs/Dialects/EmitC/) dialect itself, as well
as the C++ emitter, are part of MLIR core and are no longer provided as part of
the MLIR-EmitC repository.

## [Mojo](https://docs.modular.com/mojo/)

Mojo is a new programming language that bridges the gap between research and
production by combining the best of Python syntax with systems programming and
metaprogramming, all leveraging the MLIR ecosystem.
It aims to be a strict superset of Python (i.e. be compatible with existing
programs) and to embrace the CPython immediately for long-tail ecosystem
enablement.

## [Nod Distributed Runtime](https://nod.ai/project/distributedruntime/): Asynchronous fine-grained op-level parallel runtime

Nod's MLIR based Parallel Compiler and Distributed Runtime  provide a way to
easily scale out training and inference of very large models across multiple
heterogeneous devices (CPUs/GPUs/Accelerators/FPGAs)  in a cluster while
exploiting fine-grained op-level parallelism.

## [ONNX-MLIR](https://github.com/onnx/onnx-mlir)

To represent neural network models, users often use [Open Neural Network
Exchange (ONNX)](http://onnx.ai/onnx-mlir/) which is an open standard format for
machine learning interoperability.
ONNX-MLIR is a MLIR-based compiler for rewriting a model in ONNX into a standalone
binary that is executable on different target hardwares such as x86 machines,
IBM Power Systems, and IBM System Z.

See also this paper: [Compiling ONNX Neural Network Models Using
MLIR](https://arxiv.org/abs/2008.08272).

## [OpenXLA](https://github.com/openxla)

A community-driven, open source ML compiler ecosystem, using the best of XLA & MLIR.

## [PlaidML](https://github.com/plaidml/plaidml)

PlaidML is a tensor compiler that facilitates reusable and performance portable
ML models across various hardware targets including CPUs, GPUs, and
accelerators.

## [PolyBlocks](https://www.polymagelabs.com/technology/#polyblocks): An MLIR-based JIT and AOT compiler

PolyBlocks is a high-performance MLIR-based end-to-end compiler for DL and
non-DL computations. It can perform both JIT and AOT compilation. Its compiler
engine is aimed at being fully automatic, modular, analytical model-driven, and
fully code generating (no reliance on vendor/HPC libraries).

## [Polygeist](https://github.com/llvm/Polygeist): C/C++ frontend and optimizations for MLIR

Polygeist is a C/C++ frontend for MLIR which preserves high-level structure
from programs such as parallelism. Polygeist also includes high-level optimizations
for MLIR, as well as various raising/lowering utilities.

See both the polyhedral Polygeist paper
[Polygeist: Raising C to Polyhedral MLIR](https://ieeexplore.ieee.org/document/9563011)
and the GPU Polygeist paper
[High-Performance GPU-to-CPU Transpilation and Optimization via High-Level Parallel Constructs](https://arxiv.org/abs/2207.00257)

## [Pylir](https://github.com/zero9178/Pylir)

Pylir aims to be an optimizing Ahead-of-Time Python Compiler with high language
conformance. It uses MLIR Dialects for the task of high level, language specific
optimizations as well as LLVM for code generation and garbage collector
support.

## [RISE](https://rise-lang.org/)

RISE is a spiritual successor to the
[Lift project](http://www.lift-project.org/): "a high-level functional data
parallel language with a system of rewrite rules which encode algorithmic
and hardware-specific optimisation choices".

## [SOPHGO TPU-MLIR](https://github.com/sophgo/tpu-mlir)

TPU-MLIR is an open-source machine-learning compiler based on MLIR for
SOPHGO TPU. https://arxiv.org/abs/2210.15016.

## [Substrait MLIR](https://github.com/substrait-io/substrait-mlir-contrib/)

Substrait MLIR is an input/output dialect for
[Substrait](https://substrait.io/), the cross-language serialization format of
database query plans (akin to an intermediate representation/IR for database
queries).

## [TensorFlow](https://www.tensorflow.org/mlir)

MLIR is used as a Graph Transformation framework and the foundation for
building many tools (XLA, TFLite converter, quantization, ...).

## [Tenstorrent MLIR Compiler](https://github.com/tenstorrent/tt-mlir)

tt-mlir is a compiler project aimed at defining MLIR dialects to abstract compute
on Tenstorrent AI accelerators. It is built on top of the MLIR compiler infrastructure
and targets TTNN.

For more information on the project, see https://tenstorrent.github.io/tt-mlir/.

## [TFRT: TensorFlow Runtime](https://github.com/tensorflow/runtime)

TFRT aims to provide a unified, extensible infrastructure layer for an
asynchronous runtime system.

## [Torch-MLIR](https://github.com/llvm/torch-mlir)

The Torch-MLIR project aims to provide first class compiler support from the
PyTorch ecosystem to the MLIR ecosystem.

## [Triton](https://github.com/openai/triton)

Triton is a language and compiler for writing highly efficient custom
Deep-Learning primitives. The aim of Triton is to provide an open-source
environment to write fast code at higher productivity than CUDA, but also
with higher flexibility than other existing DSLs.

## [VAST](https://github.com/trailofbits/vast): C/C++ frontend for MLIR

VAST is a library for program analysis and instrumentation of C/C++ and related languages.
VAST provides a foundation for customizable program representation for a broad spectrum
of analyses. Using the MLIR infrastructure, VAST provides a toolset to represent C/C++
program at various stages of the compilation and to transform the representation to the
best-fit program abstraction.

## [Verona](https://github.com/microsoft/verona)

Project Verona is a research programming language to explore the concept of
concurrent ownership. They are providing a new concurrency model that seamlessly
integrates ownership.
