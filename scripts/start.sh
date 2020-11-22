#!/bin/bash
su - << EOF
cd /home/centos/deploy/ThreeGoodThings-API
nohup yarn production &
EOF
