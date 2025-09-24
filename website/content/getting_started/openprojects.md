---
title: "Open Projects"
date: 2019-11-29T15:26:15Z
draft: false
weight: 25
---

Below is a list of projects that can be suitable for [Google Summer of Code
(GSOC)](https://summerofcode.withgoogle.com/) or just for someone to get started
with contributing to MLIR. See also [the "beginner" issues](https://github.com/llvm/llvm-project/issues?q=is%3Aopen+label%3Amlir%3Allvm+label%3Abeginner)
on the bugtracker.
If you're interested in one of these projects, feel free to discuss it on
the MLIR section of the [LLVM forums](https://llvm.discourse.group/c/mlir/31)
or on the MLIR channel of the [LLVM discord](https://discord.gg/xS7Z362)
server. The mentors are indicative and suggestion of first point of contact for
starting on these projects.

* Building an MLIR interpreter (mentor: Mehdi Amini).
  At the moment we have constant folding implemented as an eager folding on a per op basis.
  This relies on attribute storage and is very inefficient. It also does not mesh well with
  control-flow (symbolic execution of a for loop for example). The idea would be to revamp
  this to ultimately allow to have features like "constexpr evaluation" of functions in MLIR.
* [llvm-canon](https://llvm.org/devmtg/2019-10/slides/Paszkowski-LLVMCanon.pdf) kind of tool for MLIR (mentor: Mehdi Amini, Jacques Pienaar)
* GLSL to SPIR-V dialect frontend (mentor: Lei Zhang)
  * Requires: building up graphics side of the SPIR-V dialect
  * Purpose: give MLIR more frontends :) improve graphics tooling
  * Potential real-world usage: providing a migration solution from WebGL
  (shaders represented as GLSL) to WebGPU (shaders represented as SPIR-V-like language, [WGSL](https://gpuweb.github.io/gpuweb/wgsl.html))
* MLIR sparsifier (aka sparse compiler) [starter tasks](https://github.com/llvm/llvm-project/labels/mlir%3Asparse) (mentor: Aart Bik)
* MLIR visualization (mentor: Jacques Pienaar)
  MLIR allows for representing multiple levels of abstraction all together in the same IR/function. Visualizing MLIR modules therefore requires going beyond visualizing a graph of nodes all at the same level (which is not trivial in and of itself!), nor is it specific to Machine Learning. Beyond visualizing a MLIR module, there is also visualizing MLIR itself that is of interest. In particular, visualizing the rewrite rules, visualizing the matching process (including the failure to match, sort of like https://www.debuggex.com/ but for declarative rewrites), considering effects of rewrites over time, etc. The visualizations should all be built with open source components but whether standalone (e.g., combining with, say, GraphViz to generate offline images) or dynamic tools (e.g., displayed in browser) is open for discussion. It should be usable completely offline in either case. We will be working with interested students to refine the exact project based on interests given the wide scope of potential approaches. And open to proposals within this general area.
* Improving [mlir-reduce](https://mlir.llvm.org/docs/Tools/mlir-reduce/) (mentor: Jacques Pienaar, Mehdi Amini).
  This tools is basic in its current form and needs investment to make it really useful in practice.
  That means developing new reduction pattern and strategies. Possibly interfaces for dialects
  to plug into injecting custom logic.

