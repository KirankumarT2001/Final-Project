require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    // sepolia: {
    //   url: "https://sepolia.infura.io/v3/<key>",
    //   accounts: ["privateKey1, privateKey2, ..."]
    // },
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x45245d7488fdfd6f40a91fd5a1f5eea9ebdb7884afdb5a5526bd683f08d4c3d2",
      ],
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
