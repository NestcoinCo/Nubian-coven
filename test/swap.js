const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nbn Wizard", async function () {
  const [signer] = await ethers.getSigners();
  const wizard = await ethers.getContractAt("NbnWizard", "", signer);
  // connectors
  const basic = await ethers.utils.Interface();
  const pancake = await ethers.utils.Interface();

  it("should swap assets", async function () {
    
  });
});
