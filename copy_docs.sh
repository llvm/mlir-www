#!/bin/bash -eu

input_path=$1
output_path=$2

find $input_path -type d | grep -v includes/img | while read dir ; do
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

find $input_path -name "*.md" | while read file ; do
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
    sed -i -e "$line {r $output_path$include" -e 'd' -e '}' $file
done

# Make sure the included files are removed after processing.
for val in $included_files; do
    rm "$output_path/$(echo $val | sed -E 's/^.*\:[0-9]+\:(.*)$/\1/g')" || true
done
