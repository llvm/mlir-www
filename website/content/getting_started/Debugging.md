---
title: "Debugging Tips"
date: "2020-03-30"
menu: "main"
weight: 10
---

## Inspecting compilation

There's no silver bullet for debugging the compilation process. Standard debugging techniques (printf debugging, gdb/lldb, IDE graphical debuggers, etc.) are of course applicable, but below are MLIR-specific facilities that are quite useful before diving into a generic debug flow. These facilities assume that you have reduced your problem to a form that can be reproduced with `mlir-opt` or another program that hooks into MLIR's option parsing, if this is not the case, see section "Isolating test case" below.

- `-mlir-print-stacktrace-on-diagnostic` causes a stacktrace to be  printed when a diagnostic is emitted. This can be useful to quickly get an idea where in a pass an error is happening.

- When dealing with verifier errors, `--verify-each=0` turns off the verifier, allowing one to see the full invalid IR

- `-mlir-print-op-generic` prints ops in their generic form, which is isomorphic with the underlying C++ data structures. This is often useful, since invalid ops frequently will crash while being printed in their "pretty form". Also, even if the "pretty form" can be printed, it can still be misleading for an invalid op, such as by failing to print an unexpected extra operand that got added by a buggy pass.
  - This option also influences the behavior of `op.dump()`.

- When using the dialect conversion / pattern rewriting infrastructure `-debug-only=dialect-conversion` prints an exceedingly useful trace of the decisions that were made and why.

- `-debug-only=mydebugtag` coupled with use of the `LLVM_DEBUG` facility to just get debug info for things you are working on.

- `-mlir-elide-elementsattrs-if-larger` prints large constants in a redacted form, making the IR easier to scan.

- `--mlir-print-ir-after-failure` will print the entire IR when the verifier fails and not just the failing operation.

## Isolating test cases

Isolating your problem to the inspection of manageable set of passes (ideally a single pass) is one of the most important parts of debugging a compiler, but sometimes this can be difficult in larger compilation flow.

### Extracting a `.mlir` file and a pass pipeline.

MLIR's core infrastructure has the ability to [create a "crash reproducer"](../docs/PassManagement.md#crash-and-failure-reproduction) and this functionality should be added to your compilation flows. Additionally, you should ensure that `.mlir` files are dumped during your compilation flow at key points such that even if compilation succeeds (possibly spuriously, such as with a miscompile), then there is still a starting point for dropping into `mlir-opt`.

### Isolating a buggy pass

Once one has a `.mlir` file and a pass pipeline to run (such as that dumped in the crash reproducer file), then one should use `-mlir-print-ir-before-all` option to `mlir-opt` to print the IR before each pass. Additionally, `-mlir-print-ir-module-scope` and `-mlir-disable-threading` can be useful here.

If one is developing an MLIR-based compiler correctly (that is, with an attention to correct program translation, high quality verifiers, and clear diagnostics when correct translation isn't possible), then by far the most common class of bugs is that an error diagnostic is emitted. When this happens, the recommended course of action is to run all passes up to just before the pass that emitted the error diagnostic and save off a new `.mlir` file representing the IR just before the problematic pass was run.

If the problem is more complex than just a diagnostic / verifier error in a single pass, then more analysis of the `-mlir-print-ir-before-all` dumps will be needed, possibly by inserting extra debug printing into various passes to see where things went off the rails.

Either way, at the end of this process one should ideally have a `.mlir` file and a single pass (or manageable set of passes) to run in `mlir-opt` for further analysis.


## Debugging Rewrite Pattern Application

### Detecting Invalid API Usage

`RewritePattern`s are typically applied by a driver such as the greedy pattern rewrite driver or as part of a dialect conversion. These drivers must know which parts of the IR were modified by a pattern, so that further pattern applications on the same piece of IR can be scheduled (in case of a greedy pattern rewrite) or rewrites can be reverted (in case of a dialect conversion).

The greedy pattern rewrite driver can be built with extra checks (`-DMLIR_ENABLE_EXPENSIVE_PATTERN_API_CHECKS=ON`) to detect patterns that do not use the rewriter/pattern API correctly. These checks significantly slow down greedy rewrites, so they are not activated by default. These extra checks detect cases such as:

* Pattern returned "success" but did not modify the IR.
* Pattern returned "failure" but modified the IR.
* Pattern modified IR directly, bypassing the rewriter API.

These checks are best-effort; they are based on comparing operation finger prints, so there could be false positives in theory. Similarly, when the same piece of IR is modified multiple times, some API violations could be missed.

Program execution is terminated when invalid pattern API usage is detected. In that case, it is recommended to re-run the program with `-debug`, to find out which pattern was the last one that was executed. Furthermore, ASAN can help with debugging. As an example, consider a case where a pattern mistakenly uses `Operation::erase` instead of `RewriterBase::eraseOp`. As part of the finger print computation, deallocated memory will be accessed, which will be detected by ASAN with a detailed error message.

### Randomizing Operation Selection

A greedy pattern rewrite should converge to the same IR, regardless of the order in which ops are processed. Rewrites that do not have this property are brittle and could get "stuck". Note, a relative pattern order can be specified with "benefit", but there is no such mechanism for the selection of ops. For debugging purposes, the greedy pattern rewrite driver can be built with worklist randomization (`-DMLIR_GREEDY_REWRITE_RANDOMIZER_SEED=<number>`), which will randomize the selection of ops.

## Miscellaneous tips

- For printf debugging, instead of using `llvm::errs()`, one can emit diagnostics. For example, using `op.emitWarning() << "HERE: " << myVariable;` instead of `llvm::errs() << "HERE: " << myVariable << "\n";`. This prints nicely with colors, shows the op (and its location) for free, and can even give you a stacktrace with `-mlir-print-stacktrace-on-diagnostic`.


TODO: testcase reduction, debugging miscompiles, bisection tools, general philosophical discussion of when and how to use bisection
