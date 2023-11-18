pragma solidity ^0.8.0;

import "./plonk_vk.sol";


contract Map {

    struct Point {
        uint latitude;
        uint longitude;
    }

    struct Location {
        bytes32[] _publicInputs;        
    }

    UltraVerifier public baseUltraVerifier;

    constructor(address verifier) {
        baseUltraVerifier = UltraVerifier(verifier);
    }

    mapping(address => bytes32[]) public locationHistory;


    event LocationAdded(Point[] borders, uint timestamp);

       function addLocation(bytes calldata _proof, bytes32[] calldata _publicInputs) public {
            require(baseUltraVerifier.verify(_proof, _publicInputs), "Wrong proof");
            locationHistory[msg.sender] = _publicInputs;
        }
    }
