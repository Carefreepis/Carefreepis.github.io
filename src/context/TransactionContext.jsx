import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { erc20DeployCode } from '../lib/constants'
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [formDataDeploy, setformDataDeploy] = useState({name:"", symbol:"", initialsupply:"", addressTo:"", totalsupply:""});
  const [formDataDeploy2, setformDataDeploy2] = useState({name:"", symbol:"", initialsupply:"", addressTo:"", totalsupply:""});
  const [formLiquidityMining, setformLiquidityMining] = useState({name:"", symbol:"", totalsupply:"", rewardAddr:"", marketingWalletAddr:"", tokenBalanceForReward:"",
                                                                  buyFeeSetting_1:"", buyFeeSetting_2:"", buyFeeSetting_3:"", buyFeeSetting_4:"",
                                                                  sellFeeSetting_1:"", sellFeeSetting_2:"", sellFeeSetting_3:"", sellFeeSetting_4:"" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    setformDataDeploy((prevState) => ({ ...prevState, [name]: e.target.value }));
    setformDataDeploy2((prevState) => ({ ...prevState, [name]: e.target.value }));
    setformLiquidityMining((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendETHTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const parsedAmount = ethers.utils.parseEther(amount);
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        console.log("准备发送" );
        var tx = await signer.sendTransaction(
            { 
              to: addressTo,
              value: parsedAmount._hex,
            }
          );
        console.log("tx.hash: " + tx.hash);
        setIsLoading(true);
        var receipt = await tx.wait();  
        setIsLoading(false);
        console.log("receipt: " + JSON.stringify(receipt));
        console.log("contractAddress: " + receipt.contractAddress);
              
        //window.location.reload(); // 刷新页面
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendERCDeploy = async () => {
    try {
      if (ethereum) {
        console.log("metamask已连接账户")
        //console.log("metamask网络类型:"+metamask.networkVersion)
        
        // 执行交易发送
        // 获取表达数据
        const {name, symbol, initialsupply, addressTo, totalsupply} = formDataDeploy
        const paddaddressTo = ethers.utils.zeroPad(addressTo, 32)
        const namePosition = ethers.utils.zeroPad(0xa0, 32)
        const symbolPosition = ethers.utils.zeroPad(0xe0, 32)         
        const nameBytelength = ethers.utils.zeroPad(name.length, 32)
        const paddname = ethers.utils.formatBytes32String(name) 
        const symbolBytelength = ethers.utils.zeroPad(symbol.length, 32)
        const paddsymbol = ethers.utils.formatBytes32String(symbol)
        const parsedTotalsupply = ethers.utils.zeroPad(ethers.utils.parseEther(totalsupply),32)
        const parsedInitialsupply = ethers.utils.zeroPad(ethers.utils.parseEther(initialsupply),32)    
        const constructorBytecode = (ethers.utils.solidityPack(
          ["address",
          "address",
          "address",
          "address",
          "address",
          "address",
          "bytes",
          "address",
          "bytes"],
          [paddaddressTo,
            namePosition,
            symbolPosition,
            parsedTotalsupply,
            parsedInitialsupply, 
            nameBytelength, 
            paddname,
            symbolBytelength,
            paddsymbol]))
  
        const runtimeBytecode = ethers.utils.solidityPack(["address","address"],[erc20DeployCode,constructorBytecode])
          
        // 使用ethers signer部署合约
        // 正确方法！
        setIsDeploying(true);  // 等待交易结束
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        var tx = await signer.sendTransaction({data: runtimeBytecode});
        console.log("tx.hash: " + tx.hash);
        var receipt = await tx.wait();  
        console.log("receipt: " + JSON.stringify(receipt));
        console.log("contractAddress: " + receipt.contractAddress);
        setIsDeploying(false); // 确认交易结束
              
        //window.location.reload(); // 刷新页面
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendERCDeploy2 = async () => {
    try {
      if (ethereum) {
        console.log("metamask已连接账户")
        //console.log("metamask网络类型:"+metamask.networkVersion)
        
        // 执行交易发送
        // 获取表达数据
        const {name, symbol, initialsupply, addressTo, totalsupply} = formDataDeploy2
        const paddaddressTo = ethers.utils.zeroPad(addressTo, 32)
        const namePosition = ethers.utils.zeroPad(0xa0, 32)
        const symbolPosition = ethers.utils.zeroPad(0xe0, 32)         
        const nameBytelength = ethers.utils.zeroPad(name.length, 32)
        const paddname = ethers.utils.formatBytes32String(name) 
        const symbolBytelength = ethers.utils.zeroPad(symbol.length, 32)
        const paddsymbol = ethers.utils.formatBytes32String(symbol)
        const parsedTotalsupply = ethers.utils.zeroPad(ethers.utils.parseEther(totalsupply),32)
        const parsedInitialsupply = ethers.utils.zeroPad(ethers.utils.parseEther(initialsupply),32)    
        const constructorBytecode = (ethers.utils.solidityPack(
          ["address",
          "address",
          "address",
          "address",
          "address",
          "address",
          "bytes",
          "address",
          "bytes"],
          [paddaddressTo,
            namePosition,
            symbolPosition,
            parsedTotalsupply,
            parsedInitialsupply, 
            nameBytelength, 
            paddname,
            symbolBytelength,
            paddsymbol]))
  
        const runtimeBytecode = ethers.utils.solidityPack(["address","address"],[erc20DeployCode,constructorBytecode])
          
        // 使用ethers signer部署合约
        // 正确方法！
        setIsDeploying(true);  // 等待交易结束
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        var tx = await signer.sendTransaction({data: runtimeBytecode});
        console.log("tx.hash: " + tx.hash);
        var receipt = await tx.wait();  
        console.log("receipt: " + JSON.stringify(receipt));
        console.log("contractAddress: " + receipt.contractAddress);
        setIsDeploying(false); // 确认交易结束
              
        //window.location.reload(); // 刷新页面
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };


  const sendLiquidityMining = async () => {
    try {
      if (ethereum) {
        console.log("metamask已连接账户")
        //console.log("metamask网络类型:"+metamask.networkVersion)
  
        // 执行交易发送
        // 获取表达数据
        const {
          name, symbol, totalsupply, rewardAddr, 
          marketingWalletAddr, tokenBalanceForReward,
          buyFeeSetting_1, buyFeeSetting_2, buyFeeSetting_3, buyFeeSetting_4,
          sellFeeSetting_1, sellFeeSetting_2, sellFeeSetting_3, sellFeeSetting_4 } = formData

          console.log("marketingWalletAddr:"+ marketingWalletAddr)
          console.log("name:"+ name)
          console.log("symbol:"+ symbol)
          console.log("totalsupply:"+ totalsupply)
          console.log("rewardAddr:"+ rewardAddr)
          console.log("tokenBalanceForReward:"+ tokenBalanceForReward)

          console.log("buyFeeSetting_1:"+ buyFeeSetting_1)
          console.log("buyFeeSetting_2:"+ buyFeeSetting_2)
          console.log("buyFeeSetting_3:"+ buyFeeSetting_3)
          console.log("buyFeeSetting_4:"+ buyFeeSetting_4)

          console.log("sellFeeSetting_1:"+ sellFeeSetting_1)
          console.log("sellFeeSetting_2:"+ sellFeeSetting_2)
          console.log("sellFeeSetting_3:"+ sellFeeSetting_3)
          console.log("sellFeeSetting_4:"+ sellFeeSetting_4)


          const paddmarketingWalletAddr = ethers.utils.zeroPad(marketingWalletAddr, 32)
          const namePosition = ethers.utils.zeroPad(0x1c0, 32)
          const symbolPosition = ethers.utils.zeroPad(0x200, 32)   
          const parsedTotalsupply = ethers.utils.zeroPad(ethers.utils.parseEther(totalsupply),32)
          const paddrewardAddr = ethers.utils.zeroPad(rewardAddr, 32)
          const paddbuyFeeSetting_1 = ethers.utils.zeroPad(buyFeeSetting_1, 32)
          const paddbuyFeeSetting_2 = ethers.utils.zeroPad(buyFeeSetting_2, 32)
          const paddbuyFeeSetting_3 = ethers.utils.zeroPad(buyFeeSetting_3, 32)
          const paddbuyFeeSetting_4 = ethers.utils.zeroPad(buyFeeSetting_4, 32)
          const paddsellFeeSetting_1 = ethers.utils.zeroPad(sellFeeSetting_1, 32)
          const paddsellFeeSetting_2 = ethers.utils.zeroPad(sellFeeSetting_2, 32)
          const paddsellFeeSetting_3 = ethers.utils.zeroPad(sellFeeSetting_3, 32)
          const paddsellFeeSetting_4 = ethers.utils.zeroPad(sellFeeSetting_4, 32)
          const parsedtokenBalanceForReward = ethers.utils.zeroPad(ethers.utils.parseEther(tokenBalanceForReward),32)
          const nameBytelength = ethers.utils.zeroPad(name.length, 32)
          const paddname = ethers.utils.formatBytes32String(name) 
          const symbolBytelength = ethers.utils.zeroPad(symbol.length, 32)
          const paddsymbol = ethers.utils.formatBytes32String(symbol)

          console.log("marketingWalletAddr:"+ paddmarketingWalletAddr)
          console.log("name:"+ namePosition)
          console.log("symbol:"+ symbolPosition)
          console.log("totalsupply:"+ parsedTotalsupply)
          console.log("rewardAddr:"+ paddrewardAddr)


          console.log("buyFeeSetting_1:"+ paddbuyFeeSetting_1)
          console.log("buyFeeSetting_2:"+ paddbuyFeeSetting_2)
          console.log("buyFeeSetting_3:"+ paddbuyFeeSetting_3)
          console.log("buyFeeSetting_4:"+ paddbuyFeeSetting_4)

          console.log("sellFeeSetting_1:"+ paddsellFeeSetting_1)
          console.log("sellFeeSetting_2:"+ paddsellFeeSetting_2)
          console.log("sellFeeSetting_3:"+ paddsellFeeSetting_3)
          console.log("sellFeeSetting_4:"+ paddsellFeeSetting_4)
          console.log("tokenBalanceForReward:"+ parsedtokenBalanceForReward)

          console.log("nameBytelength:"+ nameBytelength)
          console.log("paddname:"+ paddname)
          console.log("symbolBytelength:"+ symbolBytelength)
          console.log("paddsymbol:"+ paddsymbol)          




        return
        // const paddaddressTo = ethers.utils.zeroPad(addressTo, 32)
        // const namePosition = ethers.utils.zeroPad(0xa0, 32)
        // const symbolPosition = ethers.utils.zeroPad(0xe0, 32)         
        // const nameBytelength = ethers.utils.zeroPad(name.length, 32)
        // const paddname = ethers.utils.formatBytes32String(name) 
        // const symbolBytelength = ethers.utils.zeroPad(symbol.length, 32)
        // const paddsymbol = ethers.utils.formatBytes32String(symbol)
        // const parsedTotalsupply = ethers.utils.zeroPad(ethers.utils.parseEther(totalsupply),32)
        // const parsedInitialsupply = ethers.utils.zeroPad(ethers.utils.parseEther(initialsupply),32)    
        // const constructorBytecode = (ethers.utils.solidityPack(
        //   ["address",
        //   "address",
        //   "address",
        //   "address",
        //   "address",
        //   "address",
        //   "bytes",
        //   "address",
        //   "bytes"],
        //   [paddaddressTo,
        //     namePosition,
        //     symbolPosition,
        //     parsedTotalsupply,
        //     parsedInitialsupply, 
        //     nameBytelength, 
        //     paddname,
        //     symbolBytelength,
        //     paddsymbol]))
  
        // const runtimeBytecode = ethers.utils.solidityPack(["address","address"],[erc20DeployCode,constructorBytecode])
          
        // // 使用ethers signer部署合约
        // // 正确方法！
        // setIsDeploying(true);  // 等待交易结束
        // const provider = new ethers.providers.Web3Provider(ethereum)
        // const signer = provider.getSigner()
        // var tx = await signer.sendTransaction({data: runtimeBytecode});
        // console.log("tx.hash: " + tx.hash);
        // var receipt = await tx.wait();  
        // console.log("receipt: " + JSON.stringify(receipt));
        // console.log("contractAddress: " + receipt.contractAddress);
        // setIsDeploying(false); // 确认交易结束
              



        //window.location.reload(); // 刷新页面
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };



  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);
        console.log("metamask ready");

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        isDeploying,
        sendTransaction,
        sendETHTransaction,
        sendLiquidityMining,
        sendERCDeploy,
        sendERCDeploy2,
        handleChange,
        formData,
        formDataDeploy,
        formDataDeploy2,
        formLiquidityMining,        
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
