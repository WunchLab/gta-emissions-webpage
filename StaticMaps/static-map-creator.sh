#! /bin/bash


if [ $# -lt 1 ]; then
 echo "Usage static-map-creator.sh new_directory_name"
 echo "Example:"
 echo "static-map-creator.sh 2017-07-31"
 exit 0
fi


#this script should be run at the end of the day. It creates a new static map using current datasource file
#and updates all menus to include new map
# it also clears the current data source file in the Live Maps section
#get current date in YYYY-MM-DD format 
now_directory_name=$1
now_link_name=$(date -d "$1" "+%B %d, %Y")" "
now_file_name="data_record_"$now_directory_name".txt"

#create directory with current date
#TODO allow for custom directory names
#rm -r $now_directory_name
#TODO instead of deleting existing directory, ask user if it should be removed.
if [ -d "$1""$2" ]; then
  echo "Directory $1$2 already exists. Please delete that directory or provide a different directory name."
  exit 0
else
  mkdir $now_directory_name
fi

#copy code template to new directory
cp -r code-template/* $now_directory_name/

# copy current datasource file to new directory
cp ../LiveMaps/datasource.txt $now_directory_name

#change datasource name to data_record_YYYY-MM-dd.txt 
#and change references to datasource to new file name
cd $now_directory_name
mv datasource.txt $now_file_name
egrep -lRZ "datasource\.txt" . |xargs -0 sed -i -e "s/datasource\.txt/$now_file_name/g"

cd ../..
find . -type f -name "navbar.html" -print0| while read -r -d '' file
do n=($(awk '/function\ available/{print NR}' $file))
   n_write=$(expr $n - 3)
   n_above=$(expr $n - 4)
   sed -i "${n_write}i \                             \"$now_directory_name\"" $file
   sed -i "${n_above}s/$/\,/" $file

done

