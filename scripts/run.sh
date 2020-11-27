#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-API
env
yarn production > server.log
EOF
