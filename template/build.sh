#!/bin/sh

if [ $# -eq 0 ]; then
  echo 'Build script for cordova-vue project'
  echo ' '
  echo 'Destkop: build [dev|build] [theme]'
  echo 'Mobile:  build [prepare|remote|debug|release|publish] [ios|android [theme]]'
  echo 'Clean:   build clean [all]'
  echo 'Version: build version [major|minor|patch]'
  exit 1
fi

if [ "$1" = "prepare" ]; then
  yarn
  if [ $? -eq 0 ]; then
    npm run init $2
  fi
fi

if [ "$1" = "remote" ] || [ "$1" = "debug" ] || [ "$1" = "release" ] || [ "$1" = "publish" ]; then
  npm run $1 $2 $3
  if  [ "$1" = "remote" ]; then
    echo 'if dev server not running, using build dev to start it.'
  fi  
fi

if [ "$1" = "version" ] || [ "$1" = "dev" ] || [ "$1" = "build" ] || [ "$1" = "clean" ]; then
  npm run $1 $2
fi

