import React, { useContext,useState,useRef } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

import { USDTAddr } from '../lib/constants'

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
  transferPropContainerInner: `my-auto rounded-2xl p-1 text-base border border-[#20242A] flex justify-between blue-glassmorphism`,
  currencySelectorTitle: `my-2 rounded-full p-1  text-white flex w-2/5 align-items:center justify-center`,
  bigContainer:`p-5 xl sm:w-96 w-full flex flex-col blue-glassmorphism align-items:center justify-center hover:border-pink-900`,

  transferPropContainerfee: `w-1/2 blue-glassmorphism my-3 rounded-2xl p-1 text-base border border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-1 w-full text-1xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `font-semibold w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,  
  currencySelectorTitlefee: `my-2 rounded-full p-1  text-white flex w-1/5 align-items:center justify-center`,

  profunctionlabel: `flex items-center w-44 mx-2`,
    
}

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendLiquidityMining, formLiquidityMining, isDeploying } = useContext(TransactionContext);

  // const [quickName, setquickName] = useState("");
  // const [quicksymbol, setquicksymbol] = useState("");
  // const [quicktotalsupply, setquicktotalsupply] = useState("");
  // const [quickrewardAddr, setquickrewardAddr] = useState("");

  // const [quickmarketingWalletAddr, setquickmarketingWalletAddr] = useState("");
  // const [quicktokenBalanceForReward, setquicktokenBalanceForReward] = useState("");

  // const [quickbuyFeeSetting_1, setquickbuyFeeSetting_1] = useState("");
  // const [quickbuyFeeSetting_2, setquickbuyFeeSetting_2] = useState("");
  // const [quickbuyFeeSetting_3, setquickbuyFeeSetting_3] = useState("");
  // const [quickbuyFeeSetting_4, setquickbuyFeeSetting_4] = useState("");

  // const [quicksellFeeSetting_1, setquicksellFeeSetting_1] = useState("");
  // const [quicksellFeeSetting_2, setquicksellFeeSetting_2] = useState("");
  // const [quicksellFeeSetting_3, setquicksellFeeSetting_3] = useState("");
  // const [quicksellFeeSetting_4, setquicksellFeeSetting_4] = useState("");


  const handleLiquidityMining = (e) => {
    console.log("Handle handleLiquidityMining")
    const {name, symbol, totalsupply, rewardAddr, marketingWalletAddr, tokenBalanceForReward,
          buyFeeSetting_1, buyFeeSetting_2, buyFeeSetting_3, buyFeeSetting_4,
          sellFeeSetting_1, sellFeeSetting_2, sellFeeSetting_3, sellFeeSetting_4 } = formLiquidityMining;

    e.preventDefault();
    console.log("name:",name)
    console.log("symbol:",symbol)
    console.log("rewardAddr:",rewardAddr)
    console.log("addressTo:",rewardAddr)
    console.log("totalsupply:",marketingWalletAddr)
    if (!totalsupply || !name || !symbol || 
        !rewardAddr || !marketingWalletAddr || !tokenBalanceForReward || 
          !buyFeeSetting_1 || !buyFeeSetting_2 || !buyFeeSetting_3 || !buyFeeSetting_4 || 
          !sellFeeSetting_1 || !sellFeeSetting_2 || !sellFeeSetting_3 || !sellFeeSetting_4 ) return

    sendLiquidityMining();
  };


  const quickLiquidityMining = (e) => {
      console.log("改！")
      setquickName("xfusion")
      setquicksymbol("XFV")
      setquicktotalsupply("100000000")
      if(currentAccount){
        setquickmarketingWalletAddr(currentAccount)
      }else{
        setquickmarketingWalletAddr("0x4cFb958a43323BC0068472fb1EBB4799124bc845")
      }

      setquickrewardAddr(USDTAddr)
      setquicktokenBalanceForReward("100000")

      setquickbuyFeeSetting_1("4")
      setquickbuyFeeSetting_2("3")
      setquickbuyFeeSetting_3("2")
      setquickbuyFeeSetting_4("1")

      setquicksellFeeSetting_1("5")
      setquicksellFeeSetting_2("4")
      setquicksellFeeSetting_3("3")
      setquicksellFeeSetting_4("2")
  }


  return (
 
          <div className="flex w-full justify-center items-center">
          <div className={style.bigContainer}>
            <div className="text-white px-2 flex items-center justify-between font-semibold text-xl">发布流动性挖矿计划</div>
            {/* <body>
              <p>
                <button
                  type="button"
                  onClick={quickLiquidityMining}
                  className="text-white w-full mt-2 my-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] hover:bg-green-400 rounded-full cursor-pointer"
                >
                  点此一键生成计划模板
                </button>     
              </p>  
            </body>   */}
            
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>代币名:</div>  
            <InputDep placeholder="如 : xEthereum" name="name" type="text" id ="name" handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>简称:</div>  
            <InputDep placeholder='如: xBTC / xETH  / xBNB' name="symbol" type="text"  handleChange={handleChange} />
            </div>
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>发币总量:</div>  
            <InputDep placeholder='如 : 100' name="totalsupply" pattern='^[0-9]*[.,]?[0-9]*$' type="number" handleChange={handleChange} />
            </div>
 
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>分红币地址:</div>  
            <InputDep placeholder="0x ..." name="rewardAddr" type="text"  handleChange={handleChange} />
            </div>       
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>营销钱包:</div>  
            <InputDep placeholder="0x ..." name="marketingWalletAddr" type="text"  handleChange={handleChange} />
            </div>                 
            <div className={style.transferPropContainer}>
            <div className={style.currencySelectorTitle}>最少分红仓位:</div>  
            <InputDep placeholder='如 : 10000' name="tokenBalanceForReward" pattern='^[0-9]*[.,]?[0-9]*$' type="number"  handleChange={handleChange} />
            </div>           

           
            <div className={style.currencySelectorTitle}>买入手续费</div>
            <div>
              <div className={style.transferPropContainer}>
                <div className={style.transferPropContainerInner}>
                  <div className={style.currencySelectorTitle}>分红:</div>  
                    <InputDep placeholder="0~100" name="buyFeeSetting_1" type="text" handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>  
                  <div className={style.currencySelectorTitle}>流动:</div>  
                    <InputDep placeholder="0~100" name="buyFeeSetting_2" type="text" handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>         
              </div>
              </div>

              <div className={style.transferPropContainer}>
                <div className={style.transferPropContainerInner}>
                  <div className={style.currencySelectorTitle}>营销:</div>  
                    <InputDep placeholder="0~100" name="buyFeeSetting_3" type="text"handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>  
                  <div className={style.currencySelectorTitle}>燃烧:</div>  
                    <InputDep placeholder="0~100" name="buyFeeSetting_4" type="text"  handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>         
              </div>
              </div>
            </div> 


            <div className={style.currencySelectorTitle}>卖出手续费</div>
            <div>
              <div className={style.transferPropContainer}>
                <div className={style.transferPropContainerInner}>
                  <div className={style.currencySelectorTitle}>分红:</div>  
                    <InputDep placeholder="0~100" name="sellFeeSetting_1" type="text" handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>  
                  <div className={style.currencySelectorTitle}>流动:</div>  
                    <InputDep placeholder="0~100" name="sellFeeSetting_2" type="text"  handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>         
              </div>
              </div>

              <div className={style.transferPropContainer}>
                <div className={style.transferPropContainerInner}>
                  <div className={style.currencySelectorTitle}>营销:</div>  
                    <InputDep placeholder="0~100" name="sellFeeSetting_3" type="text"  handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>  
                  <div className={style.currencySelectorTitle}>燃烧:</div>  
                    <InputDep placeholder="0~100" name="sellFeeSetting_4" type="text"  handleChange={handleChange} />
                  <div className={style.currencySelectorTitlefee}>%</div>         
              </div>
              </div>
            </div>           


            <div className={style.currencySelectorTitle}>高级功能（选填）</div>
            <div >
              <div className={style.transferPropContainer}>
                <div className="flex items-center justify-between">
                  <div className={style.profunctionlabel}>
                    <input
                      id="kill-robot"
                      name="kill-robot"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="kill-robot" className="ml-2 block text-sm text-white">
                      防机器人抢跑
                    </label>
                  </div>
                  <div className={style.profunctionlabel}>
                    <input
                      id="anti-whale"
                      name="anti-whale"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="anti-whale" className="ml-2 block text-sm text-white">
                      防巨鲸买卖
                    </label>
                  </div>      
              </div>
            </div>
          </div>

          <div>
              <div className={style.transferPropContainer}>
                <div className="flex items-center justify-between">
                  <div className={style.profunctionlabel}>
                    <input
                      id="dynamic-fee"
                      name="dynamic-fee"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="dynamic-fee" className="ml-2 block text-sm text-white">
                     修改动态税费
                    </label>
                  </div>
                  <div className={style.profunctionlabel}>
                    <input
                      id="Mammon-mode"
                      name="Mammon-mode"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="Mammon-mode" className="ml-2 block text-sm text-white">
                    Mammon模式
                    </label>
                  </div>      
              </div>
            </div>
          </div>          


          <div>
              <div className={style.transferPropContainer}>
                <div className="flex items-center justify-between">
                  <div className={style.profunctionlabel}>
                    <input
                      id="fake-giveup"
                      name="fake-giveup"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="fake-giveup" className="ml-2 block text-sm text-white">
                     伪装弃权
                    </label>
                  </div>
                  <div className={style.profunctionlabel}>
                    <input
                      id="incresed-coin"
                      name="incresed-coin"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="incresed-coin" className="ml-2 block text-sm text-white">
                    后期增发
                    </label>
                  </div>      
              </div>
            </div>
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
                  onClick={handleLiquidityMining}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] hover:scale-105 hover:bg-red-400 rounded-full cursor-pointer"
                >
                  点 击 上 链
                </button>
              )}
          </div>

          
          {/* <div className={style.bigContainer}>
            <div className="text-white px-2 flex items-center justify-between font-semibold text-xl">流动性挖矿 (专业版)</div>
            
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
          </div> */}
          
          </div>
    
  );
};

export default Welcome;
