#/bin/bash

sed s/"'vigiliae'"/"'vesperae_j':'',\n    'vesperae_j_commemoratio':'',\n    'martyrologium':'',\n    'vigiliae'"/g $1 > $1.1
#sed s/"'vesperae_post'"/"'vesperae_commemoratio': '',\n    'vesperae_post'"/g $1.1 > $1 
mv $1.1 $1 
cat $1
#rm $1.1

