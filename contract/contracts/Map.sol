pragma solidity ^0.8.0;

import "./plonk_vk.sol";

contract Map {
    struct Location {
        uint[] latitudes;
        uint[] longitudes;
        uint timestamp;
    }

    mapping(address => Location[]) locationHistory;

    UltraVerifier verifier;

    constructor(address _verifier) {
        verifier = UltraVerifier(_verifier);
    }

    event LocationAdded(Location location);

    function addLocation(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) public {
        require(verifier.verify(_proof, _publicInputs), "Wrong proof");

        uint locationCount = 4;

        Location memory newLocation = Location(
            new uint[](locationCount),
            new uint[](locationCount),
            block.timestamp
        );

        for (uint i = 0; i < locationCount; i += 1) {
            // Parse the latitude and longitude
            uint latitude = uint256(_publicInputs[i * 2]); // Convert hex to uint
            uint longitude = uint256(_publicInputs[i * 2 + 1]); // Convert hex to uint

            // Add the latitude and longitude to their respective arrays
            newLocation.latitudes[i] = latitude;
            newLocation.longitudes[i] = longitude;
        }

        // Add the new location to the sender's location history
        locationHistory[msg.sender].push(newLocation);
        emit LocationAdded(newLocation);
    }

    function addressLocationCount() public view returns (uint) {
        return locationHistory[msg.sender].length;
    }

    function addressLocation(uint index) public view returns (Location memory) {
        return locationHistory[msg.sender][index];
    }
}
