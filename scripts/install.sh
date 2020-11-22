#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-API
yarn --frozen-lockfile
EOF