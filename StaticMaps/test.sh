#! /bin/bash


if [ $# -lt 1 ]; then
 echo "Usage static-map-creator.sh new_directory_name letter"
 echo "Example:"
 echo "static-map-creator.sh 2017-07-31 A"
 exit 0 
fi

if [ -d "$1""$2" ]; then
  echo "Directory $1 already exists. Please delete that directory or provide a different directory name."
  exit 0
else 
  mkdir $1$2
fi

now_dir=$1$2
now_file="data_record_"$1""$2".txt"
now_nav_bar=$(date -d "$1" "+%B %d, %Y")" "$2
echo $now_dir
echo $now_nav_bar
echo $now_file
