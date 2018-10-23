#!/bin/sh

if [ $# -eq 0 ]; then
  echo 'Build script for cordova-vue project'
  echo '  usage: build [prepare|dev|build|debug|release|version|clean|picture]'
  echo ' '
  echo '  For destkop: build [dev|build] [theme]'
  echo '  For mobile: build [prepare|debug|release] [platform [theme]]'
  exit 1
fi

if [ "$1" = "prepare" ]; then
  yarn
  if [ $? -eq 0 ]; then
    npm run init $2
  fi
fi

if [ "$1" = "debug" ]; then
  npm run debug $2 $3
  echo 'if dev server not running, using build dev to start it.'
fi

if [ "$1" = "release" ]; then
  npm run build $2 $3
fi

if [ "$1" = "publish" ]; then
  npm run publish $2 $3
fi

if [ "$1" = "version" ] || [ "$1" = "dev" ] || [ "$1" = "build" ] || [ "$1" = "clean" ]; then
  npm run $1 $2
fi

