import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

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
  const { currentAccount, connectWallet, handleChange, sendETHTransaction, sendERCDeploy2,formData, formDataDeploy2,isLoading,isDeploying } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendETHTransaction();
  };

  const handleERCDeploy = (e) => {
    console.log("Handle Deploy")
    const {name, symbol, initialsupply, addressTo, totalsupply} = formDataDeploy2;

    e.preventDefault();
    console.log("name:",name)
    console.log("symbol:",symbol)
    console.log("initialsupply:",initialsupply)
    console.log("addressTo:",addressTo)
    console.log("totalsupply:",totalsupply)
    if (!addressTo || !totalsupply || !name || !symbol || !initialsupply) return

    sendERCDeploy2();
  };


  return (
 
          <div className="flex w-full justify-center items-center">
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

            <div className="text-sm text-white mt-6">
                不会使用？定制高级功能？        
                <a href='https://twitter.com/MerlinKbb' className="font-medium text-indigo-600 hover:text-indigo-500">
                 联系管理员
                </a>
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

          
    
  );
};

export default Welcome;
