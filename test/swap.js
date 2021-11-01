const { expect } = require("chai");
const { ethers } = require("hardhat");
const basicABI = require("../abis/basic.json");
const pancakeABI = require("../abis/pancake.json"); 


describe("Nbn Wizard", async function () {
  let IBasic, IPancake, busd;

  before( async () => {
    console.log("me");

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x2EFb0e053321967b27147bf26CCeAAaB56022Da9"],
    });
    console.log("me")

    const signer = await ethers.getSigner("0x2EFb0e053321967b27147bf26CCeAAaB56022Da9");
    const wizard = await ethers.getContractAt("NbnWizard", process.env.WIZARD_ADDRESS, signer);
    // connectors
    IBasic = await new  ethers.utils.Interface(basicABI);
    IPancake = await new ethers.utils.Interface(pancakeABI);
    const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
    const USDT = "0x55d398326f99059ff775485246999027b3197955";
    // approve BUSD
    busd = await ethers.getContractAt("IERC20", BUSD, signer);
    await busd.approve(wizard.address, ethers.constants.MaxUint256);

    const usdt = await ethers.getContractAt("IERC20", USDT, signer);
    console.log("me");
  }

  )

  it("should swap assets", async function () {
    const deposit = IBasic.encodeFunctionData("deposit", [
      BUSD,
      ethers.utils.parseEther("1"),
      0,
      0,
    ])
    const withdraw = IBasic.encodeFunctionData("deposit", [
      USDT,
      ethers.constants.MaxUint256,
      0,
      0
    ])
    const sell = IPancake.encodeFunctionData("sell", [
      USDT,
      BUSD,
      ethers.utils.parseEther("1"),
      "2",
      0,
      0
    ])

    await expect(
      () => wizard.cast(["Basic", "PancakeV2", "Basic"], [deposit, sell, withdraw], signer.getAddress())
    ).to.changeTokenBalance(busd, signer,  ethers.utils.parseEther("1"));
  });
});
