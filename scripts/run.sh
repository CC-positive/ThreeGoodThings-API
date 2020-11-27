#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-API
source ./scripts/env.sh
yarn production > server.log
EOF
