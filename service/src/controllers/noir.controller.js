const noirService = require("../services/noir.service");
const path = require("path");

const { Noir } = require("@noir-lang/noir_js");
const { BarretenbergBackend } = require("@noir-lang/backend_barretenberg");
const { compile } = require("@noir-lang/noir_wasm");
const { time } = require("console");

const { ethers } = require("ethers");
const { fromHex, hashMessage, toHex, recoverPublicKey } = require("viem");

const getCircuit = async (name) => {
  const compiled = compile(path.resolve(`../noir/${name}`, "src", `main.nr`));
  return compiled;
};

const jsonToArray = (json) => {
  return Object.keys(json).map((key) => json[key]);
};

async function getInfos(latitude, longitude, timestamp) {
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

const setup = async () => {
  const circuits = {
    proof_of_location: (await getCircuit("proof_of_location")).program,
    proof_of_inside: (await getCircuit("proof_of_inside")).program,
  };

  const backends = {
    proof_of_location: new BarretenbergBackend(circuits.proof_of_location, {
      threads: 40,
    }),
    proof_of_inside: new BarretenbergBackend(circuits.proof_of_inside, {
      threads: 40,
    }),
  };

  const noirs = {
    proof_of_location: new Noir(
      circuits.proof_of_location,
      backends.proof_of_location
    ),
    proof_of_inside: new Noir(
      circuits.proof_of_inside,
      backends.proof_of_inside
    ),
  };

  return {
    circuits: circuits,
    backends: backends,
    noirs: noirs,
  };
};

async function proveLocation(req, res) {
  const { lat, long, timestamp } = req.body;

  const infos = await getInfos(lat, long, timestamp);
  console.log(infos);

  const inputMap = {
    trusted_x: infos.pub_key_x,
    trusted_y: infos.pub_key_y,
    signature: infos.signature,
    message: infos.message,
  };

  const { noirs, backends } = await setup();
  const { witness, returnValue } = await noirs.proof_of_location.execute(
    inputMap
  );

  const { proof, publicInputs } =
    await backends.proof_of_location.generateIntermediateProof(witness);

  res.json({
    proof: proof,
    publicInputs: publicInputs,
  });
}

async function proveInside(req, res) {
  const { publicInputs, proof, location, borders } = req.body;
  const { circuits, backends, noirs } = await setup();
  const numPublicInputs = 64;

  const proofData = {
    publicInputs: publicInputs.map((x) => jsonToArray(x)),
    proof: jsonToArray(proof),
  };

  console.log(proofData);

  const { proofAsFields, vkAsFields, vkHash } =
    await backends.proof_of_location.generateIntermediateProofArtifacts(
      proofData,
      numPublicInputs
    );

  const aggregationObject = Array(16).fill(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );

  recursiveInputs = {
    verification_key: vkAsFields,
    proof: proofAsFields,
    public_inputs: publicInputs.map((x) => toHex(jsonToArray(x))),
    key_hash: vkHash,
    input_aggregation_object: aggregationObject,
    location: location,
    borders: borders.map((border) =>
      JSON.parse(
        `{
          "latitude": ${border.latitude},
          "longitude": ${border.longitude}
       }`
      )
    ),
  };

  recursiveProof = await noirs.proof_of_inside.generateFinalProof(
    recursiveInputs
  );

  res.json({
    proof: toHex(jsonToArray(recursiveProof.proof)),
    publicInputs: recursiveProof.publicInputs.map((i) => toHex(jsonToArray(i))),
  });
}

module.exports = {
  proveLocation,
  proveInside,
};
