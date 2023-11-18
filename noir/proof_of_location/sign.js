const { ethers } = require("ethers");
const { fromHex, hashMessage, toHex, recoverPublicKey } = require("viem");

// let message = "0x0".padEnd(66, "0");
let location =
  "0x" +
  toHex(2897843).slice(2).padStart(16, "0") +
  toHex(4112022).slice(2).padStart(16, "0");

console.log(location);
async function getInfos() {
  const message = location;
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
