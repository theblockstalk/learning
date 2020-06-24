

Chaincode SDK https://hyperledger.github.io/fabric-chaincode-node/release-2.1/api

sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y

# https://hyperledger-fabric.readthedocs.io/en/release-2.1/prereqs.html


# https://hyperledger-fabric.readthedocs.io/en/release-2.1/install.html
cd ~/Documents/Git/Hyperledger
git clone git@github.com:hyperledger/fabric.git #not necessary
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s./bootstrap.sh
export PATH=~/Documents/Git/Hyperledger/fabric-samples/bin:$PATH

