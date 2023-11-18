const {Web3} = require('web3')
const fetch = require('node-fetch'); // Ensure you have 'node-fetch' installed
require("dotenv").config();

var provider = 'https://rpc.sepolia.org';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

async function main() {
    async function getContractABI(contractAddress, apikey) {
        const url = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apikey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === '1') {
            const abi = JSON.parse(data.result);
            // console.log('ABI:', abi);
            return abi;
        } else {
            throw new Error('Failed to fetch ABI');
        }
    }

    // Example usage
    const apikey = process.env.SCAN_API_KEY; 

    const contractAddress = '0xd82453e58148e713690AF8f6af59bdbBD86A478d'; 
    const contractABI = await getContractABI(contractAddress, apikey).catch(console.error);

    // Create Contract Instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Account details (use your own account and private key)
    const account = `0xa8003509743746EeeAc2f978253a502edC535D44`;
    const privateKey = process.env.PRIVATE_KEY_2; 

    // Function to generate mock location data
    function generateMockLocationData(count) {
        const locations = [];
        for (let i = 0; i < count; i++) {
            const latitude = Math.floor(Math.random() * 90);
            const longitude = Math.floor(Math.random() * 180);
            // locations.push(`0x${latitude.toString(16)}`);
            // locations.push(`0x${longitude.toString(16)}`);

            locations.push("0x666f6f0000000000000000000000000000000000000000000000000000000000");
            locations.push("0x666f6f0000000000000000000000000000000000000000000000000000000000");
        }
        return locations;
    }

    // Function to add location data
    async function addLocation(proof, publicInputs) {
        const tx = contract.methods.addLocation(proof, publicInputs);

        const gas = await tx.estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(account);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contract.options.address,
                data,
                gas,
                gasPrice,
                nonce,
                chainId: await web3.eth.getChainId()
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
    }

    // Example usage
    const mockData = generateMockLocationData(4); // Generate 4 pairs of lat/long
    addLocation(
        '0x666f6f0000000000000000000000000000000000000000000000000000000000', // Replace with your proof
        mockData
    ).catch(console.error);
}

main().catch(console.error);