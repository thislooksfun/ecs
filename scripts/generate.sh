#!/bin/sh

find . -name ".generate.js" -print0 | xargs -0 node
