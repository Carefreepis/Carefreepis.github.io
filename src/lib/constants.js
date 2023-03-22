import abi from './Transactions.json'
import bytecode from './erc20TokenDeployBytecode.json'
import bytecodeLM from './LM1.json'

// 导出常量文件
// 导出同文件夹下的Transactions.json中的合约ABI
export const contractABI = abi.abi
export const contractAddress = '0x5508EF55a1574E770aD5C0747bc51B643C121823'

export const erc20DeployCode = bytecode.erc20Bytecode
export const LM1DeployCode = bytecodeLM.LM1ByteCode

export const SHIBAddr = "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D"
export const USDTAddr =  "0x55d398326f99059fF775485246999027B3197955"
export const ETHAddr  =  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
export const DOGEAddr =  "0xbA2aE424d960c26247Dd6c32edC70B295c744C43"
export const BUSDAddr =  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
export const CAKEAddr =  "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
