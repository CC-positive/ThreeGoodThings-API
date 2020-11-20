#!/bin/sh
psql -f ./enable_uuid.sql -U $2 -d $3 -h $4