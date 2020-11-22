#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-API
yarn production
EOF