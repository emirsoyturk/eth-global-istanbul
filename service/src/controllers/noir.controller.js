const noirService = require("../services/noir.service");
const path = require("path");
const { fromHex, hashMessage, recoverPublicKey } = require("viem");

const { Noir } = require("@noir-lang/noir_js");
const { BarretenbergBackend } = require("@noir-lang/backend_barretenberg");
const { compile } = require("@noir-lang/noir_wasm");

const getCircuit = async (name) => {
  const compiled = compile(path.resolve(`../noir/${name}`, "src", `main.nr`));
  return compiled;
};

const mainInput = {
  message: [
    3, 57, 199, 96, 145, 58, 183, 241, 206, 140, 36, 34, 165, 163, 17, 210, 97,
    254, 154, 79, 91, 223, 149, 18, 3, 210, 111, 56, 246, 219, 19, 104,
  ],
  signature: [
    80, 175, 247, 73, 49, 117, 182, 241, 44, 14, 8, 232, 200, 151, 29, 144, 235,
    114, 111, 204, 224, 132, 126, 169, 28, 65, 195, 240, 99, 32, 116, 109, 126,
    8, 224, 102, 48, 32, 76, 155, 235, 81, 176, 240, 165, 46, 94, 174, 241, 244,
    104, 108, 107, 11, 178, 44, 52, 243, 150, 63, 170, 89, 114, 88,
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

  console.log("proof successful");

  const numPublicInputs = 64;
  const { proofAsFields, vkAsFields, vkHash } =
    await backends.proof_of_location.generateIntermediateProofArtifacts(
      { publicInputs, proof },
      numPublicInputs
    );

  const aggregationObject = Array(16).fill(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );

  console.log(proof.length);
  console.log(proofAsFields.length);
  console.log(publicInputs.length);
  console.log(vkAsFields.length);
  console.log(vkHash);

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

async function artifacts(req, res) {
  getCircuit();
}

module.exports = {
  artifacts,
};
