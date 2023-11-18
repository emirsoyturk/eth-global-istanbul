const { ethers } = require("ethers");
const { fromHex, hashMessage, toHex, recoverPublicKey } = require("viem");

export async function getInfos(latitude, longitude, timestamp) {
  let message =
    "0x" +
    toHex(`${latitude}${longitude}${timestamp}`).slice(2).padEnd(64, "0");

  console.log(message);

  const sender = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  );

  const signature = await sender.signMessage(message);

  const pubKey = await recoverPublicKey({ hash: message, signature });

  return {
    pub_key_x: [...fromHex(pubKey, "bytes").slice(1).slice(0, 32)],
    pub_key_y: [...fromHex(pubKey, "bytes").slice(1).slice(32)],
    signature: [...fromHex(signature, "bytes").slice(0, 64)],
    message: [...fromHex(message, "bytes")],
  };
}
