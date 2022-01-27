
const Reward = artifacts.require('Reward')
const StableCoin = artifacts.require('StableCoin')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function(deployer, network, accounts) {
  
  // Deploy Stable Coin Token
  await deployer.deploy(StableCoin)
  const stablecoin = await StableCoin.deployed()

  // Deploy Reward Token
  await deployer.deploy(Reward)
  const reward = await Reward.deployed()

  // Deploy DecentralBank
  await deployer.deploy(DecentralBank, reward.address, stablecoin.address)
  const decentralBank = await DecentralBank.deployed()

  // Transfer all tokens to DecentralBank (1 million)
  await reward.transfer(decentralBank.address, '1000000000000000000000000')

  // Transfer 100 Stable Coin tokens to investor
  await stablecoin.transfer(accounts[1], '100000000000000000000')
}

