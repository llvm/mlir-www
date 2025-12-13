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
import mlir

autoapi_dirs = list(mlir.__path__)
autoapi_python_use_implicit_namespaces = True

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
                if "original_path" in child:
                    pass # child["hide"] = True

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

# generate an index page for the mlir namespace
def ensure_mlir_index(_):
    mlir_dir = os.path.join(os.path.dirname(__file__), "autoapi/mlir")
    os.makedirs(mlir_dir, exist_ok=True)
    mlir_index = os.path.join(mlir_dir, "index.rst")
    with open(mlir_index, "w", encoding="utf-8") as f:
        f.write("mlir namespace\n===============\n\n.. toctree::\n   :maxdepth: 2\n   :glob:\n\n   **\n")


def setup(app):
    app.connect("builder-inited", ensure_mlir_index)
