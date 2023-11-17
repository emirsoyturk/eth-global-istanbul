const { ethers } = require("ethers");
const { fromHex, hashMessage, recoverPublicKey } = require("viem");

let message = "0x0".padEnd(66, "0");

async function getInfos() {
  const sender = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  );

  const signature = await sender.signMessage(message);

  const pubKey = await recoverPublicKey({ hash: message, signature });

  return {
    pub_key: [...fromHex(pubKey, "bytes").slice(1)],
    signature: [...fromHex(signature, "bytes").slice(0, 64)],
    message: [...fromHex(message, "bytes")],
  };
}

async function main() {
  const res = await getInfos();
  console.log(res["pub_key"].slice(0, 32));
  console.log(res["pub_key"].slice(32));
  console.log(res["signature"]);
  console.log(res["message"]);
}

main();
