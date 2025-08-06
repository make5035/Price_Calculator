#!/bin/bash
sudo apt-get install git-all -y
sudo apt install curl -y
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash -
sudo apt-get install -y nodejs npm
git clone https://github.com/make5035/Price_Calculator.git
cd Price_Calculator
npm install
node backend/server.js
