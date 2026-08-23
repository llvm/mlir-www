# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'MLIR Python bindings'
copyright = '2025, MLIR authors'
author = 'MLIR authors'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'autoapi.extension'
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'furo'
html_static_path = ['_static']

# -- Options and custom logic for autoapi extension --------------------------
# https://sphinx-autoapi.readthedocs.io/en/latest/reference/config.html

import os
from pathlib import Path
import shutil

import mlir


def stage_autoapi_input(package_paths):
    """Create a docs-only regular-package view of the MLIR namespace.

    AutoAPI discovers modules inside implicit namespaces, but it does not
    create objects for namespace package directories. Astroid can also lose
    the leading ``mlir`` component while resolving imports such as
    ``from ._mlir_libs...`` from the namespace root. Mirror only the Python
    inputs and add package markers in the build directory so both tools see a
    complete hierarchy without changing the real MLIR package.
    """
    stage_root = Path(__file__).resolve().parent / "_build" / "autoapi-input"
    if stage_root.exists():
        shutil.rmtree(stage_root)

    staged_mlir = stage_root / "mlir"
    package_dirs = {staged_mlir}
    for package_path in package_paths:
        source_root = Path(package_path)
        for source_path in sorted(source_root.rglob("*")):
            if (
                source_path.suffix not in {".py", ".pyi"}
                or not source_path.is_file()
            ):
                continue

            destination = staged_mlir / source_path.relative_to(source_root)
            destination.parent.mkdir(parents=True, exist_ok=True)
            if not destination.exists():
                shutil.copy2(source_path, destination)

            parent = destination.parent
            while True:
                package_dirs.add(parent)
                if parent == staged_mlir:
                    break
                parent = parent.parent

    for package_dir in package_dirs:
        if not (package_dir / "__init__.py").exists() and not (
            package_dir / "__init__.pyi"
        ).exists():
            (package_dir / "__init__.py").touch()

    return staged_mlir


autoapi_dirs = [str(stage_autoapi_input(mlir.__path__))]
autoapi_python_use_implicit_namespaces = False

# index.rst already links directly to autoapi/mlir/index. Avoid generating an
# unused autoapi/index page as well.
autoapi_add_toctree_entry = False

import autoapi._parser as _autoapi_parser
import autoapi._mapper as _autoapi_mapper
import commonmark
from sphinx.ext.napoleon.docstring import GoogleDocstring

# Check if the docstring is google-style.
# NOTE: It is pretty minimal but enough to cover current cases in MLIR Python.
def is_google_docstring(doc):
    return any(x in doc for x in ["Args:\n", "Returns:\n", "Raises:\n"])

# Hook the _prepare_docstring function in sphinx-autoapi,
# so that we can convert markdown to rst.
_prepare_docstring = _autoapi_parser._prepare_docstring
def prepare_docstring(doc):
    docstring = _prepare_docstring(doc)
    if is_google_docstring(docstring):
        # convert google-style docstring to rst
        docstring = str(GoogleDocstring(docstring))
    else:
        # convert markdown to rst
        ast = commonmark.Parser().parse(docstring)
        docstring = commonmark.ReStructuredTextRenderer().render(ast)
    return docstring
_autoapi_parser._prepare_docstring = prepare_docstring

# Hook Mapper._hide_yo_kids to make imported members available
# This function comes from https://github.com/readthedocs/sphinx-autoapi/blob/v3.6.1/autoapi/_mapper.py#L516
# and it is modified to remove the `hide` field for imported members
def _hide_yo_kids(self):
    for module in self.paths.values():
        if module["all"] is not None:
            all_names = set(module["all"])
            for child in module["children"]:
                if child["qual_name"] not in all_names:
                    child["hide"] = True
        elif module["type"] == "module":
            for child in module["children"]:
                if "original_path" in child and child["name"].startswith("_"):
                    child["hide"] = True

_autoapi_mapper.Mapper._hide_yo_kids = _hide_yo_kids

html_static_path = ['_static']
html_css_files = [
  'ignore_highlight_err.css',
]

if llvm_path := os.environ.get("SPHINX_LLVM_SRC_PATH"):
    import sphinx.highlighting as _hl
    import importlib

    # load the lexer module
    lexer_path = llvm_path + "/mlir/utils/pygments/mlir_lexer.py"
    lexer_spec = importlib.util.spec_from_file_location("mlir_lexer", lexer_path)
    lexer_module = importlib.util.module_from_spec(lexer_spec)
    lexer_spec.loader.exec_module(lexer_module)

    _hl.lexers["mlir"] = lexer_module.MlirLexer()
