#/bin/bash

sed s/"'laudes_post'"/"'laudes_commemoratio':'',\n    'laudes_post'"/g $1 > $1.1
sed s/"'vesperae_post'"/"'vesperae_commemoratio': '',\n    'vesperae_post'"/g $1.1 > $1 
cat $1
rm $1.1

