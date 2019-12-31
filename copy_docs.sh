#!/bin/bash -exu

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
    title=$(grep -m 1  "^# "  $input_path/$file | sed 's/^# //') &&
    (echo "---" &&
     echo "title: \"$title\"" &&
     echo "date: 1970-01-01T00:00:00Z" &&
     echo "draft: false" &&
     echo "---" &&
     grep -v "^# " $input_path/$file |
     # TODO(jpienaar): Remove this, this is temporary measure to avoid all the
     # broken links but not robust at all.
     sed -e 's|\](\([^h][^)#]*.md#[^)]*\))|]({{< relref "\1" >}})|g' -e 's|\](\([^h][^)]*.md\))|]({{< relref "\1" >}})|g' |
     # TODO(jpienaar): This is probably worse than the above, but currently we
     # have cross repo markdown links.
     sed -e "s|../../Glossary.md|../../../getting_started/Glossary.md|") > $output_path/$file &&
    echo "Processed $file"
done
