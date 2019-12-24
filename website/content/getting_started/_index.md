---
title: "Getting Started"
date: 2019-11-29T15:26:15Z
draft: false
weight: 10
---

Please refer to the [LLVM Getting Started](https://llvm.org/docs/GettingStarted.html)
in general to build LLVM. Below are quick instructions to build MLIR with LLVM.

The following instructions for compiling and testing MLIR assume that you have
`git`, [`ninja`](https://ninja-build.org/), and a working C++ toolchain (see
[LLVM requirements](https://llvm.org/docs/GettingStarted.html#requirements).

```sh
git clone https://github.com/llvm/llvm-project.git
mkdir llvm-project/build
cd llvm-project/build
cmake -G Ninja ../llvm -DLLVM_ENABLE_PROJECTS=mlir -DLLVM_BUILD_EXAMPLES=ON -DLLVM_TARGETS_TO_BUILD="host"
cmake --build . --target check-mlir
```

To compile and test on Windows using Visual Studio 2017:

```bat
REM In shell with Visual Studio environment set up, e.g., with command such as
REM   $visual-studio-install\Auxiliary\Build\vcvarsall.bat" x64
REM invoked.
git clone https://github.com/llvm/llvm-project.git
mkdir llvm-project\build
cd llvm-project\build
cmake ..\llvm -G "Visual Studio 15 2017 Win64" -DLLVM_ENABLE_PROJECT=mlir -DLLVM_BUILD_EXAMPLES=ON -DLLVM_TARGETS_TO_BUILD="host" -DCMAKE_BUILD_TYPE=Release -Thost=x64
cmake --build . --target check-mlir
```

As a starter, you may try [the tutorial](docs/tutorials/toy/ch-1/) on
building a compiler for a Toy language.
