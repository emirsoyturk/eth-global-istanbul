const { ethers } = require("ethers");
const { fromHex, hashMessage, recoverPublicKey } = require("viem");

let messageToHash =
  "0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e";

async function getInfos() {
  const sender = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  );

  const hashedMessage = hashMessage(messageToHash, "hex"); // keccak of "signthis"

  const signature = await sender.signMessage(hashedMessage); // get the signature of the message, this will be 130 bytes (concatenated r, s, and v)

  const pubKey = await recoverPublicKey({ hash: hashedMessage, signature });

  return {
    pub_key: [...fromHex(pubKey, "bytes").slice(1)],
    signature: [...fromHex(signature, "bytes").slice(0, 64)],
    hashed_message: [...fromHex(hashedMessage, "bytes")],
  };
}

async function main() {
  const res = await getInfos();
  console.log(res["pub_key"].slice(0, 32));
  console.log(res["pub_key"].slice(32));
  console.log(res["signature"]);
  console.log(res["hashed_message"]);
}

main();
