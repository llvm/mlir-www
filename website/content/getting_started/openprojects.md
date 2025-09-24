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
* MLIR sparsifier (aka sparse compiler) [starter tasks](https://github.com/llvm/llvm-project/labels/mlir%3Asparse) (mentor: Aart Bik)
* Improving [mlir-reduce](https://mlir.llvm.org/docs/Tools/mlir-reduce/) (mentor: Jacques Pienaar, Mehdi Amini).
  This tools is basic in its current form and needs investment to make it really useful in practice.
  That means developing new reduction pattern and strategies. Possibly interfaces for dialects
  to plug into injecting custom logic.

