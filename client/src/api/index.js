const { ethers } = require("ethers");
const { fromHex, hashMessage, toHex, recoverPublicKey } = require("viem");

async function getInfos(latitude, longitude) {
  let location =
    "0x" +
    toHex(latitude).slice(2).padStart(16, "0") +
    toHex(longitude).slice(2).padStart(16, "0");

  const sender = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  );

  const signature = await sender.signMessage(location);

  const pubKey = await recoverPublicKey({ hash: location, signature });

  return {
    pub_key: [...fromHex(pubKey, "bytes").slice(1)],
    signature: [...fromHex(signature, "bytes").slice(0, 64)],
    message: [...fromHex(location, "bytes")],
  };
}
