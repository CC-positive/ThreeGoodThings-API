#!/bin/bash
pid=`lsof -i:8080 | grep -v PID | sed 's/[\t ]\+/\t/g' | cut -f2`
if [ -n "$pid" ]; then
    kill -9 $pid
fi
