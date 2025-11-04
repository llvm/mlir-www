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
import commonmark


# hook the _prepare_docstring function in sphinx-autoapi,
# so that we can convert markdown to rst.
_prepare_docstring = _autoapi_parser._prepare_docstring
def prepare_docstring(doc):
    md = _prepare_docstring(doc)
    ast = commonmark.Parser().parse(md)
    rst = commonmark.ReStructuredTextRenderer().render(ast)
    return rst
_autoapi_parser._prepare_docstring = prepare_docstring


# generate an index page for the mlir namespace
def ensure_mlir_index(_):
    mlir_dir = os.path.join(os.path.dirname(__file__), "autoapi/mlir")
    os.makedirs(mlir_dir, exist_ok=True)
    mlir_index = os.path.join(mlir_dir, "index.rst")
    with open(mlir_index, "w", encoding="utf-8") as f:
        f.write("mlir namespace\n===============\n\n.. toctree::\n   :maxdepth: 2\n   :glob:\n\n   **\n")


def setup(app):
    app.connect("builder-inited", ensure_mlir_index)
