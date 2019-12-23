---
date: 2017-10-19T15:26:15Z
lastmod: 2019-10-26T15:26:15Z
publishdate: 2018-11-23T15:26:15Z
---

# Multi-Level Intermediate Representation Overview

The MLIR project is a novel approach to building reusable and extensible
compiler infrastructure. MLIR aims to address software fragmentation, improve
compilation for heterogeneous hardware, significantly reduce the cost of
building domain specific compilers, and aid in connecting existing compilers
together.

# How to Contribute

Thank you for your interest in contributing to MLIR! If you want to contribute
to MLIR, be sure to review the [contribution guidelines](https://github.com/llvm/llvm-project/tree/master/mlir/CONTRIBUTING.md).

We don't accept pull-request on GitHub, instead we use [Phabricator](https://llvm.org/docs/Phabricator.html).

Please be mindful of the [LLVM Code of Conduct](https://llvm.org/docs/CodeOfConduct.html),
which pledges to foster an open and welcoming environment.

## More resources

For more information on MLIR, please see:

*   The MLIR section of the [LLVM forums](https://llvm.discourse.group/c/llvm-project/mlir) for any questions.
*   Real-time discussion on the MLIR channel of the [LLVM discord](https://discordapp.com/invite/JUQUPAZ) server.
*   Previous [talks](#mlir-talks).

See also the [TensorFlow MLIR SIG](https://github.com/tensorflow/community/blob/master/sigs/mlir/CHARTER.md)
which is organizing weekly public 'Open Design Meetings' about MLIR. If you’d like
to discuss a particular topic or have questions, please add it to the
[agenda doc](https://docs.google.com/document/d/1y_9f1AbfgcoVdJh4_aM6-BaSHvrHl8zuA5G4jv_94K8/edit#).
Details on how to join the meeting are in the agenda doc.

## What is MLIR for?

MLIR is intended to be a hybrid IR which can support multiple different
requirements in a unified infrastructure. For example, this includes:

*   The ability to represent dataflow graph (such as TensorFlow), including
    dynamic shapes, the user-extensible op ecosystem, TensorFlow variables, etc.
*   Optimizations and transformations typically done on a such graph (e.g. in
    Grappler).
*   Representation of kernels for ML operations in a form suitable for
    optimization.
*   Ability to host high-performance-computing-style loop optimizations across
    kernels (fusion, loop interchange, tiling, etc) and to transform memory
    layouts of data.
*   Code generation "lowering" transformations such as DMA insertion, explicit
    cache management, memory tiling, and vectorization for 1D and 2D register
    architectures.
*   Ability to represent target-specific operations, e.g. accelerator-specific
    high-level operations.
*   Quantization and other graph transformations done on a Deep-Learning graph.

MLIR is a common IR that also supports hardware specific operations. Thus,
any investment into the infrastructure surrounding MLIR (e.g. the compiler
passes that work on it) should yield good returns; many targets can use that
infrastructure and will benefit from it.

MLIR is a powerful representation, but it also has non-goals. We do not try to
support low level machine code generation algorithms (like register allocation
and instruction scheduling). They are a better fit for lower level optimizers
(such as LLVM). Also, we do not intend MLIR to be a source language that
end-users would themselves write kernels in (analogous to CUDA C++). On the
other hand, MLIR provides the backbone for representing any such DSL and
integrating it in the ecosystem.

## Compiler infrastructure

We benefited from experience gained from building other IRs (LLVM IR, XLA HLO,
and Swift SIL) when building MLIR. The MLIR framework encourage the existing
best practices, e.g. writing and maintaining an IR spec, building IR verifier,
providing the ability to dump and parse MLIR files to text, writing extensive
unit tests with the [FileCheck](https://llvm.org/docs/CommandGuide/FileCheck.html)
tool, and building the infrastructure as a set of modular libraries that can be
combined in new ways.

Other lessons have been incorporated and integrated into the design in subtle
ways. For example, LLVM has non-obvious design mistakes that prevent a
multithreaded compiler from working on multiple functions in an LLVM module at
the same time. MLIR solves these problems by having limited SSA scope to reduce
the use-def chains and by replacing cross-function references with explicit
[`symbol reference`](doc/LangRef/#symbol-reference-attribute).

# MLIR talks

* "[MLIR Primer: A Compiler Infrastructure for the End of Moore’s Law](https://ai.google/research/pubs/pub48035.pdf)"
  * Chris Lattner & Jacques Pienaar, Google at
    [Compilers for Machine Learning](https://www.c4ml.org/) workshop at
    [CGO 2019](http://cgo.org/cgo2019/)
* "[MLIR: Multi-Level Intermediate Representation for Compiler
    Infrastructure](https://llvm.org/devmtg/2019-04/talks.html#Keynote_1)"
  * Tatiana Shpeisman & Chris Lattner, Google at
    [EuroLLVM 2019](https://llvm.org/devmtg/2019-04)
* "[Tutorial: Building a Compiler with MLIR](https://llvm.org/devmtg/2019-04/talks.html#Tutorial_1)"
  * Mehdi Amini, Jacques Pienaar, Nicolas Vasilache, Google at
    [EuroLLVM 2019](https://llvm.org/devmtg/2019-04)
