#!/usr/bin/env bash

set -e

print_help() {
  echo "Helper functions for mlir-www"
  echo ""
  echo "Usage: mlir-www-helper [ARGUMENTS]"
  echo ""
  echo "Arguments:"
  echo "  --help"
  echo "  --copy-docs-dir <INPUT_PATH> <OUTPUT_PATH>"
  echo "  --process-included-docs <OUTPUT_PATH>"
  echo "  --solve-name-conflict <LLVM_SRC> <WEB_DST>"
  echo "  --install-docs <LLVM_SRC> <WEB_DST>"
}

copy_docs_dir() {
  input_path="$1"
  output_path="$2"

  echo "Copying docs from '$input_path' to '$output_path'"

  if [[ $input_path != *"docs/" ]] || [[ $output_path != *"docs/" ]]; then
    echo "ERROR: Expected input and output path to end in 'docs/'"
    exit 1
  fi

  find "$input_path" -type d | grep -v includes/img | while read dir ; do
      destdir=`realpath --relative-to=$input_path "$dir"`
      mkdir -p "${output_path}/$destdir"
      if  ls $dir/*.md 1> /dev/null 2>&1; then
        cat > "${output_path}/$destdir/_index.md"  <<EOF
---
 title: "${destdir##*/}"
 date: 2019-11-29T15:26:15Z
 draft: false
---
EOF
     fi
  done

  cat > "${output_path}/_index.md" <<EOF
---
 title: "Code Documentation"
 date: 2019-11-29T15:26:15Z
 draft: false
---
EOF

  find "$input_path" -name "*.md" | while read file ; do
    file=$(realpath --relative-to=$input_path $file)
    title=$(grep -m 1  "^# "  $input_path/$file | sed 's/^# //' ) &&
    (echo "---" &&
     echo "title: \"$title\"" &&
     echo "date: 1970-01-01T00:00:00Z" &&
     echo "draft: false" &&
     echo "---" &&
     grep -v "^# $title" $input_path/$file  | sed 's|\[TOC\]|<p/>{{< toc >}}|' ) > $output_path/$file &&
    echo "Processed $file"
  done
}

process_included_docs() {
  output_path="$1"

  echo "Processing included docs in '$output_path'"

  if [[ $output_path != *"docs/" ]]; then
    echo "ERROR: Expected output path to end in 'docs/'"
    exit 1
  fi

  # Collect the locations of included files.
  included_files=$(grep -Ern --include \*.md '^\[include \"(.*)\"\]$' ${PWD}/$output_path \
                | tac \
                | sed -E 's/(.*)\[include \"(.*)\"\]$/\1\2/g')

  # Inline the contents of the included files.
  for val in $included_files; do
      read -r file line include <<< $(echo $val | sed -E 's/^(.*)\:([0-9]+)\:(.*)$/\1 \2 \3/g')

      # Strip the title from any included files.
      if [[ $(head -1 $output_path$include) == '---' ]]; then
          tail -n +6 $output_path$include > "include.tmp" && mv "include.tmp" $output_path$include
      fi
      sed -e "$line {r $output_path$include" -e 'd' -e '}' "$file" > "$file.tmp" && mv -- "$file.tmp" "$file"
  done

  # Make sure the included files are removed after processing.
  for val in $included_files; do
      rm "$output_path/$(echo $val | sed -E 's/^.*\:[0-9]+\:(.*)$/\1/g')" || true
  done
}

solve_name_conflict() {
  LLVM_SRC="$1"
  WEB_DST="$2"

  echo "Hack around file/directory name conflict in '$WEB_DST'"

  rm -Rf "$WEB_DST/content/docs/Interfaces"
  mkdir -p "$WEB_DST/content/includes/"
  cp -rv "$LLVM_SRC/mlir/docs/includes/img" "$WEB_DST/content/includes/"
}

install_docs() {
  LLVM_SRC="$1"
  WEB_DST="$2"

  echo "Installing docs from '$LLVM_SRC' into '$WEB_DST'"

  copy_docs_dir "$LLVM_SRC/build/tools/mlir/docs/" "$WEB_DST/content/docs/"
  copy_docs_dir "$LLVM_SRC/mlir/docs/" "$WEB_DST/content/docs/"
  process_included_docs "$WEB_DST/content/docs/"
  solve_name_conflict "$LLVM_SRC/" "$WEB_DST/"

  echo "Installing doxygen docs"
  cp -r "$LLVM_SRC/build/tools/mlir/docs/doxygen/html" "$WEB_DST/static/doxygen"
}

if [[ "$#" == 0 || "$1" == "--help" ]]; then
  print_help
elif [[ "$1" == "--copy-docs-dir" ]]; then
  if [[ "$#" != 3 ]]; then
    echo "ERROR: --copy-docs-dir requires 2 arguments"
    exit 1
  fi
  copy_docs_dir "$2" "$3"
elif [[ "$1" == "--process-included-docs" ]]; then
  if [[ "$#" != 2 ]]; then
    echo "ERROR: --process-included-docs requires 1 argument"
    exit 1
  fi
  process_included_docs "$2"
elif [[ "$1" == "--solve-name-conflict" ]]; then
  if [[ "$#" != 3 ]]; then
    echo "ERROR: --solve-name-confict requires 2 arguments"
    exit 1
  fi
  solve_name_conflict "$2" "$3"
elif [[ "$1" == "--install-docs" ]]; then
  if [[ "$#" != 3 ]]; then
    echo "ERROR: --install-docs requires 2 arguments"
    exit 1
  fi
  install_docs "$2" "$3"
else
  echo "ERROR: Unknown argument(s) '$1'"
  exit 1
fi
