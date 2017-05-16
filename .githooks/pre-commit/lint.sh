#!/usr/bin/env bash

ng lint && pushd server && npm run lint && popd
