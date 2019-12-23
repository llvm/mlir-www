#!/bin/bash -exu

input_path=$1
output_path=$2

find $input_path -type d | while read dir ; do
    dir=`realpath --relative-to=$input_path "$dir"`
    mkdir -p "${output_path}/$dir"
    cat > "${output_path}/$dir/_index.md"  <<EOF
---
 title: "$dir"
 date: 2019-11-29T15:26:15Z
 draft: false
---
EOF
done

find $input_path -name "*.md" | while read file ; do
    file=$(realpath --relative-to=$input_path $file)
    title=$(grep -m 1  "^# "  $input_path/$file | sed 's/^# //') &&
    (echo "---" &&
     echo "title: \"$title\"" &&
     echo "date: 1970-01-01T00:00:00Z" &&
     echo "draft: false" &&
     echo "---" &&
     grep -v "^# " $input_path/$file ) > $output_path/$file &&
    echo "Processed $file"
done
