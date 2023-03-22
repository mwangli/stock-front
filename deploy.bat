#!/bin/bash

scp -r Dockerfile root@mwang.online:build
scp -r dist root@mwang.online:build/dist
ssh root@mwang.online build/build.sh found-front
