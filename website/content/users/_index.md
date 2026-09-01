---
title: "Users of MLIR"
date: 2023-05-04
lastmod: 2026-09-02
draft: false
weight: 1
---

This page collects publicly documented projects that use MLIR as compiler
infrastructure or define MLIR dialects and transformations. Entries are
alphabetized by project name. Archived or superseded projects are labeled.

Know of a project that is missing, or one whose description has changed? Please
submit an update to this page.

## [Accera](https://github.com/microsoft/Accera)

Accera is a research compiler and Python library from Microsoft Research for
scheduling compute-intensive loop nests. It translates programs through MLIR
pipelines to produce optimized binaries for target platforms.

## [Allo](https://github.com/cornell-zhang/allo)

Allo is a Python-embedded language and compiler for accelerator design. It uses
MLIR to represent modular kernels, compose schedules, and lower designs to
hardware and software backends.

## [AscendNPU IR](https://gitee.com/ascend/ascendnpu-ir)

AscendNPU IR is an MLIR-based intermediate-representation system for Huawei
Ascend NPUs. It provides dialects, transformations, and interfaces for
describing and optimizing AI workloads.

## [Beaver](https://github.com/beaver-lodge/beaver)

Beaver provides MLIR and LLVM tooling for Elixir and Zig. It uses Elixir's
metaprogramming facilities to make defining and manipulating MLIR dialects and
operations more accessible.

## [BTOR2MLIR](https://github.com/jetafese/btor2mlir)

BTOR2MLIR is an MLIR dialect and toolchain for the BTOR2 hardware-verification
format. It enables BTOR2 models to reuse compiler transformations and software
verification backends.

## [Buddy MLIR](https://github.com/buddy-compiler/buddy-mlir)

Buddy MLIR is a compiler framework that connects domain-specific languages to
domain-specific architectures. It provides MLIR dialects, transformations,
runtime components, and examples for heterogeneous systems.

## [ByteIR](https://github.com/bytedance/byteir)

ByteIR is an MLIR-based compiler for CPUs, GPUs, and ASICs. It provides compiler
passes, frontends, and runtime components for lowering machine-learning
workloads across heterogeneous targets.

## [Catalyst](https://github.com/PennyLaneAI/catalyst)

Catalyst is an experimental just-in-time compiler for hybrid
quantum-classical PennyLane programs. Its MLIR-based compiler represents
quantum operations in dedicated dialects and lowers programs through LLVM and
QIR while supporting control flow and automatic differentiation.

## [CIRCT](https://circt.llvm.org/)

CIRCT is an application of MLIR and LLVM methodology to hardware
design. It provides reusable dialects, transformations, and tools for hardware
compilers and electronic-design-automation workflows.

## [ClangIR](https://clang.llvm.org/docs/CIR/)

ClangIR (CIR) introduces a high-level MLIR representation between Clang's AST
and LLVM IR. It preserves more C and C++ semantics for analysis and
transformation before lowering to LLVM IR.

## [Concrete](https://github.com/zama-ai/concrete)

Concrete is an open-source compiler for programs that operate on
fully-homomorphic-encryption data. Its Python interface lowers encrypted
programs through MLIR and LLVM to implementations based on TFHE.

## [CUDA-Q](https://github.com/NVIDIA/cuda-quantum)

CUDA-Q is a heterogeneous quantum-classical programming platform. Its compiler
uses MLIR dialects for quantum and classical computation before lowering to
QIR, LLVM IR, or target-specific representations.

## [DSP-MLIR](https://github.com/MPSLab-ASU/DSP_MLIR)

DSP-MLIR is an experimental MLIR dialect and compiler for digital signal
processing. It represents common DSP operations and applies domain-specific
rewrites before lowering them through MLIR.

## [Enzyme](https://enzyme.mit.edu/)

Enzyme provides automatic differentiation across multiple compiler levels.
[EnzymeMLIR](https://github.com/EnzymeAD/Enzyme/tree/main/enzyme/Enzyme/MLIR)
exposes first-class forward- and reverse-mode differentiation in MLIR. Projects
such as
[Enzyme-JAX](https://github.com/EnzymeAD/Enzyme-JAX) use it in MLIR-based
compiler pipelines.

## [EUDSL](https://github.com/llvm/eudsl)

EUDSL is an experimental LLVM project for building embedded domain-specific
languages that target MLIR. It includes language bindings, code generators,
and utilities for constructing MLIR-based frontends and tools.

## [Firefly](https://github.com/GetFirefly/firefly) (archived)

Firefly was a compiler and runtime for Erlang and Elixir. It used MLIR for its
final optimization and code-generation stages, targeting native code and
WebAssembly. The project was archived in June 2024.

## [Flang](https://flang.llvm.org/docs/)

Flang is LLVM's Fortran frontend. Its FIR and HLFIR dialects use MLIR to
represent, analyze, optimize, and lower Fortran programs before LLVM code
generation.

## [HEIR](https://heir.dev/)

HEIR is an open-source MLIR toolchain for homomorphic encryption. It defines
dialects and transformations spanning high-level tensor programs,
encryption-scheme representations, and target cryptographic libraries.

## [Hexagon-MLIR](https://github.com/qualcomm/hexagon-mlir)

Hexagon-MLIR is an open-source compiler stack for Qualcomm Hexagon NPUs. It
uses MLIR to lower Triton kernels and PyTorch models through Hexagon-specific
dialects, transformations, and runtime interfaces.

## [Intel Extension for MLIR (IMEX)](https://github.com/intel/mlir-extensions)

IMEX develops MLIR dialects, transformations, and runtime integrations for
Intel CPUs and GPUs. It also serves as a staging ground for components intended
for upstream MLIR.

## [IREE](https://github.com/iree-org/iree)

IREE is an end-to-end MLIR-based compiler and runtime for machine-learning
models. Its retargetable stack scales from data-center systems to mobile and
edge devices across a range of accelerator backends.

## [JSIR](https://github.com/google/jsir)

JSIR is an MLIR-based high-level representation for JavaScript analysis and
lossless source-to-source transformation. Google uses it for tasks including
decompilation and deobfuscation.

## [LAPIS](https://github.com/sandialabs/LAPIS)

LAPIS is an MLIR-based compiler for linear-algebra workloads that targets
Kokkos and other performance-portability programming models. It can integrate
with Torch-MLIR to compile models originating in PyTorch.

## [LingoDB](https://github.com/lingo-db/lingo-db)

LingoDB is an MLIR-based query compiler for relational and other data-intensive
workloads. It uses multiple dialects and transformation stages to optimize and
JIT-compile database queries.

## [MARCO](https://github.com/marco-compiler/marco)

MARCO is an experimental Modelica compiler. It represents Base Modelica
programs with an MLIR dialect and lowers them to executable code and supporting
runtime components.

## [MLIR-AIE (IRON)](https://github.com/Xilinx/mlir-aie)

MLIR-AIE provides an MLIR toolchain and the IRON Python API for AMD Ryzen AI
NPUs and Versal AI Engines. It models compute tiles, data movement, and device
configuration and lowers programs to deployable device artifacts.

## [MLIR-AIR](https://github.com/Xilinx/mlir-air)

MLIR-AIR provides dialects, tools, and libraries for asynchronous,
hierarchical accelerator programming. It models data movement and execution on
spatial accelerators and integrates with MLIR-AIE for AMD AI Engine targets.

## [MLIR-DaCe](https://github.com/spcl/mlir-dace)

MLIR-DaCe connects MLIR with DaCe's Stateful DataFlow Graph representation. Its
data-centric dialect and conversion infrastructure enable optimization across
the two ecosystems.

## [MLIR-EmitC](https://github.com/iml130/mlir-emitc) (archived and superseded)

MLIR-EmitC developed conversions from MLIR dialects to C and C++. The project
was archived in December 2024 and superseded by the upstream
[EmitC dialect and emitter](https://mlir.llvm.org/docs/Dialects/EmitC/).

## [MLIR-TensorRT](https://github.com/NVIDIA/TensorRT-Incubator/tree/main/mlir-tensorrt)

MLIR-TensorRT is a compiler and runtime for executing MLIR programs with
TensorRT and GPU code-generation backends. It accepts StableHLO and other MLIR
dialects, partitions supported work for TensorRT, and lowers remaining
operations through fallback pipelines.

## [Mojo](https://mojolang.org/)

Mojo is an open-source, Pythonic systems programming language for
high-performance heterogeneous computing. Its compiler is built with MLIR and
supports interoperability with the Python ecosystem.

## [MQT Compiler Collection](https://github.com/munich-quantum-toolkit/core)

The MQT Compiler Collection is an MLIR-based framework in MQT Core for quantum
and classical compilation. It provides quantum dialects, transformations, and
interoperability with formats and tools across the quantum software ecosystem.

## [Numba-MLIR](https://github.com/numba/numba-mlir)

Numba-MLIR is a proof-of-concept Numba backend that uses MLIR for CPU and GPU
code generation. It retains Numba-compatible Python decorators and frontend
behavior while replacing the downstream compiler pipeline.

## [ONNX-MLIR](https://onnx.ai/onnx-mlir/)

ONNX-MLIR imports ONNX models into MLIR and lowers them to optimized native
binaries or libraries. Its dialects and passes support targets ranging from
general-purpose processors to specialized accelerators.

## [OpenXLA](https://openxla.org/)

OpenXLA is an open machine-learning compiler ecosystem whose projects include
XLA, StableHLO, and Shardy. These projects use MLIR to represent and transform
models from frameworks such as JAX, TensorFlow, and PyTorch for CPUs, GPUs, and
accelerators.

## [PhoebeDB](https://phoebedb.com/)

PhoebeDB is a PostgreSQL-compatible HTAP database system. Its query compiler
uses a custom MLIR pipeline to optimize relational operations and JIT-compile
them through LLVM.

## [PlaidML](https://github.com/plaidml/plaidml) (archived)

PlaidML was a portable tensor compiler and runtime. Its experimental v1
architecture adopted MLIR for graph and kernel compilation. The project was
archived in March 2025.

## [PolyBlocks](https://docs.polymagelabs.com/)

PolyBlocks is a commercial MLIR-based JIT and ahead-of-time compilation engine
for machine learning. It supports models from PyTorch, TensorFlow, and JAX and
targets CPUs and multiple accelerator platforms.

## [Polygeist](https://github.com/llvm/Polygeist)

Polygeist is a C and C++ frontend for MLIR. It preserves high-level control
flow, memory, and parallel constructs so they can be analyzed and transformed
before lowering to lower-level dialects.

## [PyDSL](https://github.com/Huawei-CPLLab/PyDSL)

PyDSL is a Pythonic frontend for MLIR. It maps a deliberately close-to-Python
syntax to MLIR operations, types, and control flow while keeping the translation
layer thin and extensible.

## [Pylir](https://github.com/Pylir/Pylir)

Pylir is an optimizing ahead-of-time compiler for Python. It represents Python
semantics in custom high-level MLIR dialects and progressively lowers programs
to LLVM IR.

## [Qwerty](https://github.com/gt-tinker/qwerty)

Qwerty is a compiler and runtime for a Python-embedded,
basis-oriented quantum programming language. It uses MLIR for its high-level
quantum representation and can emit OpenQASM 3 and QIR.

## [RISE](https://rise-lang.org/)

RISE is a functional language for expressing and optimizing parallel
computations. Its research MLIR integration represents RISE programs as a
dialect and lowers optimized computations toward C, OpenMP, OpenCL, and CUDA.

## [rocMLIR](https://github.com/ROCm/rocMLIR)

rocMLIR is an MLIR-based kernel generator for AMD GPUs. It specializes and
lowers operations such as matrix multiplication, convolution, and attention
and is used by projects including MIGraphX.

## [ScaleHLS](https://github.com/UIUC-ChenLab/scalehls)

ScaleHLS is an MLIR-based high-level-synthesis framework. It compiles HLS C/C++
or PyTorch models through domain-specific analyses and optimizations and emits
optimized HLS C/C++ for FPGA toolchains.

## [Substrait MLIR](https://github.com/substrait-io/substrait-mlir-contrib)

Substrait MLIR is a work-in-progress dialect and serialization library for the
Substrait query-plan format. It provides common infrastructure for projects
that need to import, transform, or export Substrait plans with MLIR.

## [TensorFlow](https://www.tensorflow.org/mlir)

TensorFlow uses MLIR across its compiler stack to represent, transform, and
lower machine-learning programs. MLIR-based infrastructure supports graph
optimization, hardware targeting, and deployment-oriented compilation.

## [Tenstorrent tt-mlir](https://github.com/tenstorrent/tt-mlir)

tt-mlir is Tenstorrent's MLIR compiler stack. It defines dialects and lowering
pipelines that transform machine-learning workloads for Tenstorrent hardware
and its TTNN and TT-Metal software layers.

## [TFRT](https://github.com/tensorflow/runtime)

TFRT provides asynchronous host-runtime and compiler infrastructure used in
TensorFlow and XLA execution paths. Its MLIR components represent host programs
and lower them to executable runtime forms.

## [Torch-MLIR](https://github.com/llvm/torch-mlir)

Torch-MLIR imports PyTorch programs into MLIR's Torch dialect. It then lowers
them into representations that can be consumed by the wider MLIR compiler
ecosystem and target-specific backends.

## [TPP-MLIR](https://github.com/libxsmm/tpp-mlir)

TPP-MLIR provides an MLIR dialect and compilation flow for Tensor Processing
Primitives. It lowers linear-algebra workloads to optimized primitive libraries
such as LIBXSMM.

## [TPU-MLIR (SOPHGO)](https://github.com/sophgo/tpu-mlir)

TPU-MLIR imports models from common machine-learning formats and lowers them
through high-level and TPU-specific dialects for SOPHGO processors. It includes
optimization, quantization, code-generation, and deployment tooling.

## [Triton](https://github.com/triton-lang/triton)

Triton is a Python language and compiler for writing efficient custom deep
learning primitives. Its MLIR-based compiler targets NVIDIA and AMD GPUs, with
a CPU backend under development.

## [VAST](https://github.com/trailofbits/vast)

VAST is an experimental C and C++ program-analysis and instrumentation
pipeline. It uses a hierarchy of MLIR dialects to retain source-level semantics
while progressively lowering programs.

## [Zaozi](https://github.com/xinpian-tech/zaozi)

Zaozi is an experimental hardware embedded DSL written in Scala 3. It provides
direct bindings to the MLIR and CIRCT C APIs and uses them to construct modular
hardware compiler frontends.
