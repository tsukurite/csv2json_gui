#!/bin/bash

cd ./csv2json

zip app.nw -r ./*

cd ../

cp csv2json/app.nw build/Windows/32bit/_resource/
cp csv2json/app.nw build/Windows/64bit/_resource/
mv csv2json/app.nw build/MacOS/csv2json.app/Contents/Resources/app.nw
