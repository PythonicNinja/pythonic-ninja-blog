#!/usr/bin/env bash

echo "building content"

pelican content

echo "copying assets to github repo"

yes | cp -R ./output/ ../pythonicninja.github.io/.

echo "commiting changes"

cd ../pythonicninja.github.io/ && git add . && git commit -m "new post" && git push origin master

cd ../pythonic-ninja-blog

echo "finished"
