#/bin/bash

sed s/"'missa'"/"'laudes_post':'',\n    'missa'"/g $1 > $1.1
sed s/"'vesperae'"/"'missa_post': '',\n    'vesperae'"/g $1.1 > $1.2 
sed s/"'body'"/"'vesperae_post': '',\n    'body'"/g $1.2 > $1
cat $1
rm $1.1 $1.2

