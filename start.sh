#!/bin/bash

today=$(date +"%y-%m-%d")
filename="_log/$today.log"

nohup node $1 >> $filename 2>> $filename &
