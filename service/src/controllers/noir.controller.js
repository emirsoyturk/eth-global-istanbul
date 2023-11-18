const noirService = require("../services/noir.service");
const path = require("path");
const { toHex, fromHex, hashMessage, recoverPublicKey } = require("viem");

const { Noir } = require("@noir-lang/noir_js");
const { BarretenbergBackend } = require("@noir-lang/backend_barretenberg");
const { compile } = require("@noir-lang/noir_wasm");
const { time } = require("console");

const getCircuit = async (name) => {
  const compiled = compile(path.resolve(`../noir/${name}`, "src", `main.nr`));
  return compiled;
};

const jsonToArray = (json) => {
  return Object.keys(json).map((key) => json[key]);
};

const mainInput = {
  message: [
    1, 5, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  signature: [
    69, 38, 142, 41, 186, 79, 110, 187, 245, 133, 124, 6, 123, 184, 140, 178,
    179, 110, 132, 56, 239, 201, 11, 175, 168, 225, 101, 247, 118, 158, 58, 14,
    40, 172, 196, 33, 196, 203, 66, 5, 74, 26, 130, 178, 12, 153, 69, 234, 97,
    74, 84, 141, 80, 4, 182, 2, 43, 187, 190, 3, 152, 67, 142, 228,
  ],
};

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

async function main() {
  const { circuits, backends, noirs } = await setup();
  const { witness, returnValue } = await noirs.proof_of_location.execute(
    mainInput
  );

  const { proof, publicInputs } =
    await backends.proof_of_location.generateIntermediateProof(witness);

  const numPublicInputs = 64;
  const { proofAsFields, vkAsFields, vkHash } =
    await backends.proof_of_location.generateIntermediateProofArtifacts(
      { publicInputs, proof },
      numPublicInputs
    );

  const aggregationObject = Array(16).fill(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );

  recursiveInputs = {
    verification_key: vkAsFields,
    proof: proofAsFields,
    public_inputs: mainInput.signature,
    key_hash: vkHash,
    input_aggregation_object: aggregationObject,
    location: {
      latitude: { integer: 99, fraction: 0 },
      longitude: { integer: 62, fraction: 0 },
    },
    borders: [
      {
        latitude: { integer: 82, fraction: 0 },
        longitude: { integer: 66, fraction: 0 },
      },
      {
        latitude: { integer: 79, fraction: 0 },
        longitude: { integer: 61, fraction: 0 },
      },
      {
        latitude: { integer: 99, fraction: 0 },
        longitude: { integer: 58, fraction: 0 },
      },
      {
        latitude: { integer: 122, fraction: 0 },
        longitude: { integer: 71, fraction: 0 },
      },
    ],
  };

  recursiveProof = await noirs.proof_of_inside.generateFinalProof(
    recursiveInputs
  );
}

main();

async function proveLocation(req, res) {
  const { signature, lat, long, timestamp } = req.body;

  console.log(signature);

  message = new Uint8Array(32);
  message[0] = lat;
  message[1] = long;
  message[2] = timestamp;

  const inputMap = {
    signature: signature,
    message: [...message],
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

main();

async function proveInside(req, res) {
  const { publicInputs, proof, location, borders } = req.body;
  const { circuits, backends, noirs } = await setup();
  const numPublicInputs = 64;

  console.log(jsonToArray(publicInputs).length);
  console.log(jsonToArray(proof).length);

  const { proofAsFields, vkAsFields, vkHash } =
    await backends.proof_of_location.generateIntermediateProofArtifacts(
      {
        publicInputs: jsonToArray(publicInputs),
        proof: jsonToArray(proof),
      },
      numPublicInputs
    );

  // const aggregationObject = Array(16).fill(
  //   "0x0000000000000000000000000000000000000000000000000000000000000000"
  // );

  // recursiveInputs = {
  //   verification_key: vkAsFields,
  //   proof: proofAsFields,
  //   public_inputs: publicInputs,
  //   key_hash: vkHash,
  //   input_aggregation_object: aggregationObject,
  //   location: {
  //     latitude: { integer: location.latitude.x, fraction: 0 },
  //     longitude: { integer: location.longitude.x, fraction: 0 },
  //   },
  //   borders: borders.map((border) =>
  //     JSON.parse(
  //       `{latitude:{integer: ${border.latitude.x},fraction:0},longitude:{integer:${border.longitude.x},fraction:0}}`
  //     )
  //   ),
  // };

  // console.log(recursiveInputs);

  // recursiveProof = await noirs.proof_of_inside.generateFinalProof(
  //   recursiveInputs
  // );

  res.json({
    proof: "a",
  });
}

module.exports = {
  proveLocation,
  proveInside,
};
