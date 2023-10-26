#!/usr/bin/env bash

set -e

print_help() {
  echo "Helper script for mlir-www"
  echo ""
  echo "Usage: mlir-www-helper [ARGUMENTS]"
  echo ""
  echo "Arguments:"
  echo "  --help"
  echo "  --copy-docs-dir <INPUT_PATH> <OUTPUT_PATH>"
  echo "  --process-included-docs <OUTPUT_PATH>"
  echo "  --solve-name-conflict"
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
  echo "Hack around file/directory name conflict"
  rm -Rf website/content/docs/Interfaces
  mkdir -p website/content/includes/
  cp -rv llvm_src/mlir/docs/includes/img website/content/includes/
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
  solve_name_conflict
else
  echo "ERROR: Unknown argument(s) '$1'"
  exit 1
fi
