#!/bin/bash

mkcert -install

mkdir -p .cert
mkcert -key-file ./.cert/localhost.key -cert-file ./.cert/localhost.crt 'localhost'
