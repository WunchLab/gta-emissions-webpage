#! /bin/bash


if [ $# -lt 1 ]; then
 echo "Usage static-map-creator.sh new_directory_name letter(optional)"
 echo "Example:"
 echo "static-map-creator.sh 2017-07-31 A"
 exit 0
fi


#this script should be run at the end of the day. It creates a new static map using current datasource file
#and updates all menus to include new map
# it also clears the current data source file in the Live Maps section
#get current date in YYYY-MM-DD format 
now_directory_name=$1$2
now_link_name=$(date -d "$1" "+%B %d, %Y")" "$2
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




#insert new link into menus on new Static Maps and set as active
#new map
#TODO allow for dynamic recreation of menus
IFS=$'\n'
find . -type f -name "index.html" -print0 | while read -r -d '' file
do
    n=($(awk "/<\!-- Collect the nav links, forms, and other content for toggling -->/","/<\/ul>/{print NR}" $file))
    n_1=`expr ${n[-1]} - 1`
    sed -i "${n_1}i \ \ \ \ \ \ \ \ \ \ \ \ <li class=\"active\"><a href=\"\.\.\/\.\.\/$now_directory_name\/Methane\">$now_link_name</a></li>" $file
done

#insert new link into menus on other Static Maps and set as inactive
#new map
cd ..
find . -type f -name "index.html" -print0 | while read -r -d '' file
do
   test=${file:0:12}
   if [[ "${test}" != \.\/$now_directory_name ]]
       then 
           n=($(awk "/<\!-- Collect the nav links, forms, and other content for toggling -->/","/<\/ul>/{print NR}" $file))
           n_1=`expr ${n[-1]} - 1`
           sed -i "${n_1}i \ \ \ \ \ \ \ \ \ \ \ \ <li><a href=\"\.\.\/\.\.\/$now_directory_name\/Methane\">$now_link_name</a></li>" $file
    fi
done

#insert link into live maps
cd ../LiveMaps

find . -type f -name "index.html" -print0 | while read -r -d '' file
do
    n=($(awk "/<\!-- Collect the nav links, forms, and other content for toggling -->/","/<\/ul>/{print NR}" $file))
    n_1=`expr ${n[-1]} - 1`    
    sed -i "${n_1}i \ \ \ \ \ \ \ \ \ \ \ \ <li><a href=\"\.\.\/\.\.\/StaticMaps\/$now_directory_name\/Methane\">$now_link_name</a></li>" $file
done

