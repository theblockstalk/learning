

Chaincode SDK https://hyperledger.github.io/fabric-chaincode-node/release-2.1/api

sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y

## https://hyperledger-fabric.readthedocs.io/en/release-2.1/prereqs.html


## https://hyperledger-fabric.readthedocs.io/en/release-2.1/install.html
# Not necessary but can be useful to have code
git clone git@github.com:hyperledger/fabric.git

# Install fabric
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s./bootstrap.sh
sudo ln ./fabric-samples/test-network/bin/* /bin

# Logsprout launcher
# https://hyperledger-fabric.readthedocs.io/en/release-2.1/deploy_chaincode.html#setup-logspout-optional
sudo ln ./fabric-samples/commercial-paper/organization/digibank/configuration/cli/monitordocker.sh /bin

cd ./fabric-samples/test-network
export FABRIC_CFG_PATH=$PWD/../config/

# Name terminal (useful for tracking peers)
export PS1="MagnetoCorp (Org1)$ "

./network.sh down
sudo rm organizations/fabric-ca/ordererOrg/msp/ -rf
sudo rm organizations/fabric-ca/org1/msp/ -rf
sudo rm organizations/fabric-ca/org2/msp/ -rf
docker rm $(docker ps -a) -f
./network.sh down
