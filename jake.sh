#!/bin/sh

echo Building npm modules:
npm rebuild

node_modules/.bin/jake $*