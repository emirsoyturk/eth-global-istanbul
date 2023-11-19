require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 50000,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mantle_testnet: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.PRIVATE_KEY_2],
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        `0x360edc242ccf13da2a852f5f675d92801db7f4e64fe17ca18cb486b4dbff6a35`,
      ],
    },
    sepolia: {
      url: `https://rpc.notadegen.com/eth/sepolia`,
      accounts: [process.env.PRIVATE_KEY_2],
    },
    arbitrum_sepolia: {
      url: `https://sepolia-rollup.arbitrum.io/rpc`,
      chainId: 421614,
      accounts: [process.env.PRIVATE_KEY_2],
    },
    linea_goerli: {
      url: `https://rpc.goerli.linea.build`,
      chainId: 59140,
      accounts: [process.env.PRIVATE_KEY_2],
    },
    scroll_testnet: {
      url: "https://scroll-sepolia.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY_2],
    },
  },
  etherscan: {
    apiKey: process.env.SCAN_API_KEY,
    customChains: [
      {
        network: "scroll_testnet",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.dev/",
        },
      },
      {
        network: "linea_goerli",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
          browserURL: "https://goerli.lineascan.build/",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
