#!/bin/bash -exu

input_path=$1
output_path=$2

find $input_path -type d | while read dir ; do
    mkdir -p ${output_path}/`realpath --relative-to=$input_path $dir`
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
