#!/usr/bin/env bash
pelican content
yes | cp -R output/ ../pythonicninja.github.io/.
cd ../pythonicninja.github.io/ && git add . && git commit -m "new post" && git push origin master
