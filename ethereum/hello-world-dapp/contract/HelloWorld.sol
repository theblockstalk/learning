// https://kauri.io/create-a-hello-world-fullstack-dapp/68fca74301814d09bfcc35e07ff30fbc/a

pragma solidity ^0.5.10;

contract HelloWorld {
    string public message;

    constructor(string memory initMessage) public {
        message = initMessage;
    }

    function update(string memory newMessage) public {
        message = newMessage;
    }
}
