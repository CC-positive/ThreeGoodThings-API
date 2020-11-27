#!/bin/bash
export DB_DATABASE=`aws ssm get-parameter --name DB_DATABASE --query "Parameter.Value" --output text`
export DB_HOST=`aws ssm get-parameter --name DB_HOST --query "Parameter.Value" --output text`
export DB_PASS=`aws ssm get-parameter --name DB_PASS --query "Parameter.Value" --with-decryption --output text`
export DB_USERNAME=`aws ssm get-parameter --name DB_USERNAME --query "Parameter.Value" --output text`
