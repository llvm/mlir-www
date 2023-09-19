---
title: "How to Contribute"
date: 2019-11-29T15:26:15Z
draft: false
weight: 15
---

Everyone is welcome to contribute to MLIR. There are several ways of getting
involved and contributing including reporting bugs, improving documentation and
tutorials.

## Community Guidelines

Please be mindful of the [LLVM Code of Conduct](https://llvm.org/docs/CodeOfConduct.html),
which pledges to foster an open and welcoming environment.

### Contributing code

Please send [pull-request](https://llvm.org/docs/GitHub.html#github-reviews) on
GitHub. If you don't have write access to the repo, just leave a comment asking
the reviewer to hit the merge button it for you.

#### Commit messages

Follow the git conventions for writing a commit message, in particular the
first line is the short title of the commit. The title should be followed by an
empty line and a longer description. Prefer describing *why* the change is
implemented rather than what it does. The latter can be inferred from the code.
This [post](https://chris.beams.io/posts/git-commit/) give examples and more
details.

### Issue tracking

To report a bug, use the [MLIR product on the LLVM bug
tracker](https://github.com/llvm/llvm-project/issues/new), try to pick a
suitable component for the bug, or leave it in the default.

If you want to contribute, start working through the MLIR codebase, navigate to
[the "good first issue" issues](https://github.com/llvm/llvm-project/issues)
and start looking through interesting issues. If you decide to start on an
issue, leave a comment so that other people know that
you're working on it. If you want to help out, but not alone, use the issue
comment thread to coordinate.

### Contribution guidelines and standards

*   Read the [developer guide](DeveloperGuide.md "here").
*   Ensure that you use the correct license. Examples are provided below.
*   Include tests when you contribute new features, as they help to a)
    prove that your code works correctly, and b) guard against future breaking
    changes to lower the maintenance cost.
*   Bug fixes also generally require tests, because the presence of bugs
    usually indicates insufficient test coverage.

#### License

Include a license at the top of new files.

* [C/C++ license example](https://github.com/llvm/llvm-project/blob/main/mlir/examples/toy/Ch1/toyc.cpp)
