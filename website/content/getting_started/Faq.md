---
title: "FAQ"
date: "2019-11-29"
menu: "main"
weight: 10
---

## What is the difference between the Tensor and Vector types?

1) Conceptual: vectors are meant to and occur in lower level dialects - often where you expect hardware to have registers of that size. Tensors model higher-level "closer to the source" abstract representation. This is reflected in the abstraction modeled by the operations from the [`vector` dialect](https://mlir.llvm.org/docs/Dialects/Vector/), while Tensors would be more naturally present in the operations of the [`linalg` dialect](https://mlir.llvm.org/docs/Dialects/Linalg/).
2) Tensors can be dynamically shaped, unranked, or have 0 dimensions ; but Vectors can't be.
3) You can have a memref (a buffer in memory) containing Vectors but you can't have a memref of a tensor type.
4) The set of allowed element types is different: the Tensor type isn't limited while Vector is limited to float and integer types.

## Registered, loaded, dependent: what's up with Dialects management?

Before creating an Operation, a Type, or an Attribute, the associated Dialect
must be already *loaded* in the `MLIRContext`. For example the Toy tutorial
explicitly loads the Toy Dialect before emitting the Toy IR from the AST.

The process of loading a Dialect in the context is not thread-safe, which forces
all involved Dialects to be loaded before the multi-threaded pass manager starts
the execution. To keep the system modular and layered, invoking a pass pipeline
should never require pre-loading dialects explicitly. This is achieved by
requiring every pass to declare a list of *dependent* Dialects: these are
Dialects for which an entity (Operation, Type, or Attribute) can be created by
the pass, other than for Dialects that would already be in the input.
For example, a `convertLinalgToLoops` pass would declare the `SCF` Dialect as
dependent, but does not need to declare `Linalg`.

Finally, dialects can be *registered* with the context. The sole purpose of the
registration is to make these dialects available for the textual parser used by
tools like `mlir-opt` or `mlir-translate`. A compiler frontend emitting the IR
programmatically and invoking a pass pipeline would never need to register any
dialects.


## In dialect conversion, I want an operation to be removed after its users get converted, how do I do that?

This operation can be marked "illegal" and you can just do speculatively
`rewriter.erase(op);`. The operation won't be actually removed right now,
instead when mark something as erased you are basically saying to the driver
"I expect all uses of this to go away by the time everything is over". The
conversion will fail if the operation you marked as erased doesn't actually get
erased at the end.

## Why is dialect X missing feature Y?

Most likely, nobody has had a need for it yet. Many MLIR components, dialects
even more than others, grew out of specific needs and are extended by volunteers
sending patches to add the missing bits. Everybody is welcome to contribute!

In some specfic cases, the dialect design might have explicitly decided against
implementing a feature or chose an alternative modeling that provides a similar
functionality. Such design decisions are usually noted in the dialect or
rationale documents.

