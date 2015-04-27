#!/bin/bash

cd ./csv2json

zip app.nw -r ./*

cd ../

cp csv2json/app.nw build/Windows/
mv csv2json/app.nw build/MacOS/csv2json.app/Contents/Resources/app.nw
