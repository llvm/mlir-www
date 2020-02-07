---
title: "Open Projects"
date: 2019-11-29T15:26:15Z
draft: false
weight: 25
---

Below is a list of projects that can be suitable for [Google Summer of Code
(GSOC)](https://summerofcode.withgoogle.com/) or just for someone to get started
with contributing to MLIR. See also [the "beginner" issues](https://bugs.llvm.org/buglist.cgi?keywords=beginner%2C%20&keywords_type=allwords&list_id=176893&product=MLIR&query_format=advanced&resolution=---)
on the bugtracker.
If you're interested in one of these projects, feel free to discuss it on
the MLIR section of the [LLVM forums](https://llvm.discourse.group/c/llvm-project/mlir)
or on the MLIR channel of the [LLVM discord](https://discord.gg/xS7Z362)
server. The mentors are indicative and suggestion of first point of contact for
starting on these projects.

* [bugpoint/llvm-reduce](https://llvm.org/docs/BugpointRedesign.html) and
  llvm-canon kind of tools for MLIR (mentor: Mehdi Amini, Jacques Pienaar)
* Rework the MLIR python bindings, add a C APIs for core concepts (mentor:
Nicolas Vasilache, Alex Zinenko)
* Automatic formatter for TableGen (similar to clang-format for C/C++)
* LLVM IR declaratively defined. (mentor: Alex Zinenko)
* MLIR Binary serialization / bitcode format (Mehdi Amini)
* SPIR-V module combiner
  * Basic: merging modules and remove identical functions
  * Advanced: comparing logic and use features like spec constant to reduce
  similar but not identical functions
* GLSL to SPIR-V dialect frontend
  * Requires: building up graphics side of the SPIR-V dialect
  * Purpose: give MLIR more frontends :) improve graphics tooling
  * Potential real-world usage: providing a migration solution from WebGL
  (shaders represented as GLSL) to WebGPU (shaders represented as SPIR-V)
* TableGen "front-end dialect" (mentor: Jacques Pienaar)
* Making MLIR interact with existing polyhedral tools: isl, pluto (mentor: Alex Zinenko)
* MLIR visualization (mentor: Jacques Pienaar)
* Rewrite patterns expressed in MLIR (mentor: Jacques Pienaar)
