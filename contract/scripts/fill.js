// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Map = await hre.ethers.getContractFactory("Map");
  const map = Map.attach("0xDf0A76716934802181eA808812Fc54BFA11c6DBa");

  const inputs = [
    2845383, 4142161, 2830003, 4105397, 2939042, 4075713, 2953599, 4117192,
  ];

  await map.addLocation("0x00", [
    ...inputs.map((x) => ethers.utils.hexZeroPad(ethers.utils.hexlify(x), 32)),
  ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
