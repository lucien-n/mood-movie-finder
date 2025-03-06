#!/bin/bash
npm install
cd common
npm install
cd ..
npm run build:common
npm run pack -w common --pack-destination=front/
cd front
npm install common-1.0.0.tgz
npm run build