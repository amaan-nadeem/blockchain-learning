pragma solidity 0.8.12;

contract HelloWorldPermanent {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }
}
