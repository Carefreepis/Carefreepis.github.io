import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const InputDep = ({ placeholder, name, type, value, handleChange}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);



const style = {
  transferPropContainer: `my-auto rounded-2xl p-1 text-base border border-[#20242A] hover:border-[#41444F] flex justify-between blue-glassmorphism`,
  currencySelectorTitle: `my-2 rounded-full p-1  text-white flex w-2/5 align-items:center justify-center`,
}


const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendETHTransaction, sendERCDeploy,formData, formDataDeploy,isLoading,isDeploying } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendETHTransaction();
  };

  const handleERCDeploy = (e) => {
    console.log("Handle Deploy")
    const {name, symbol, initialsupply, addressTo, totalsupply} = formDataDeploy;

    e.preventDefault();
    console.log("name:",name)
    console.log("symbol:",symbol)
    console.log("initialsupply:",initialsupply)
    console.log("addressTo:",addressTo)
    console.log("totalsupply:",totalsupply)
    if (!addressTo || !totalsupply || !name || !symbol || !initialsupply) return

    sendERCDeploy();
  };


  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            一键 <br /> 畅享加密世界！
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            马上点击下方连接你的MetaMask钱包，解锁更多玩法。
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>



          
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              链上转账
            </div>
            <div className={companyCommonStyles}>链上发币</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
             链上挖矿
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              NFT卡牌游戏
            </div>
            <div className={companyCommonStyles}>NFT线上发行</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              监控链上信息
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">


        <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism align-items:center justify-center">
            <div className="px-2 flex items-center justify-between font-semibold text-xl text-white">链上转账 (以太坊兼容加密资产)</div>
            
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>目标地址:</div>  
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>转账金额:</div>  
            <Input placeholder="0.0" name="amount" type="number" handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>传输图片:</div>  
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>附件信息:</div>  
            <Input placeholder="发送自xxx的转账" name="message" type="text" handleChange={handleChange} />
            </div>            

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            <div className="text-sm text-white mt-2">
                不会使用？定制高级功能？        
                <a href='https://twitter.com/MerlinKbb' className="font-medium text-indigo-600 hover:text-indigo-500">
                 联系管理员
                </a>
          </div>

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] hover:scale-105 hover:bg-red-400 rounded-full cursor-pointer"
                >
                  点 击 转 账
                </button>
              )}
          </div>

          <div className="h-[1px] w-full bg-gray-400 my-2" />

          <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism align-items:center justify-center">
            <div className="text-white px-2 flex items-center justify-between font-semibold text-xl">链上发币 (ETH/BSC chain)</div>
            
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>代币名:</div>  
            <InputDep placeholder="如 : xEthereum" name="name" type="text" handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>简称:</div>  
            <InputDep placeholder='如: xBTC / xETH  / xBNB' name="symbol" type="text" handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>发币总量:</div>  
            <InputDep placeholder='如 : 100' name="totalsupply" pattern='^[0-9]*[.,]?[0-9]*$' type="number" handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>初始铸币量:</div>  
            <InputDep placeholder='如 : 100' name="initialsupply" pattern='^[0-9]*[.,]?[0-9]*$' type="number" handleChange={handleChange} />
            </div>      
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>接收地址:</div>  
            <InputDep placeholder="0x ..." name="addressTo" type="text" handleChange={handleChange} />
            </div>                     

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isDeploying
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleERCDeploy}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] hover:scale-105 hover:bg-red-400 rounded-full cursor-pointer"
                >
                  点 击 发 币
                </button>
              )}
          </div>



        </div>
      </div>
    </div>
    
  );
};

export default Welcome;
