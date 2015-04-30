#!/bin/bash

cp ./prod_package.json csv2json/package.json

cd ./csv2json

mv ./node_modules ../.node_modules

npm install

zip app.nw -r ./*

rm -rf ./node_modules
mv ../.node_modules node_modules

cd ../

cp csv2json/app.nw build/Windows/32bit/
#cp csv2json/app.nw build/Windows/64bit/
mv csv2json/app.nw build/MacOS/csv2json.app/Contents/Resources/app.nw

cp ./dev_package.json csv2json/package.json
