#!/bin/bash

# sudo apt install libboost-all-dev

cd /usr/local
wget https://dl.bintray.com/boostorg/release/1.72.0/source/boost_1_72_0.tar.bz2
sudo tar --bzip2 -xf boost_1_72_0.tar.bz2
sudo rm boost_1_72_0.tar.bz2
cd ./boost_1_72_0
sudo ./bootstrap.sh
sudo ./b2

# The following directory should be added to compiler include paths:
#     /usr/local/boost_1_72_0
# The following directory should be added to linker library paths:
#     /usr/local/boost_1_72_0/stage/lib