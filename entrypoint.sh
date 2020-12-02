#!/bin/bash

su -c 'mkdir /data'\
'&& mkdir /data/db'\
'&& chmod 0755 /data/db'\
'&& chown -R $USER /data/db'\
'&& chmod -R go+w /data/db'

mongod --fork --logpath /var/log/mongod.log

mongo admin --eval 'db.createUser({user: "root", pwd: "password", roles: [ "root" ]});'

node run dev > /dev/null 2>&1