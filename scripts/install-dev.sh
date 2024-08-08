#!/bin/bash

echo "Installing required brew packages from the Brewfile..."
brew bundle

echo "Installing required version of node..."
n auto

echo "Installing bun dependencies..."
bun install

echo "Installing frontend..."
bun frontend:install

echo "Installing CA Authority..."
mkcert -install

echo "Installing certs..."
mkcert -cert-file ./certs/local-cert.pem -key-file ./certs/local-key.pem \
"docker.localhost" \
"*.docker.localhost" \
"api.yt-to-quiz.localhost" \
"yt-to-quiz.localhost" \
"localhost" \
"127.0.0.1" \
"::1"