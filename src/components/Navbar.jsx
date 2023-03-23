import React, { useContext } from "react";
import { shortenAddress } from "../utils/shortenAddress";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `md:flex hidden w-2/3 justify-center items-center`,
  navItemsContainer: `flex bg-white rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl `,
  activeNavItem: `bg-blue-400 `,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#191B1F] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
}



const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { currentAccount,connectWallet } = useContext(TransactionContext);
  const [selectedNav, setSelectedNav] = React.useState('home')


  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      {/* <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["流动性挖矿","链上发币", "NFT发布", "链上套利"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
      </ul> */}

     <div className={style.nav}>
        <div className={style.navItemsContainer}>

        <Link to="/">             
          <div
            onClick={() => setSelectedNav('home')}
            className={`${style.navItem} ${
              selectedNav === 'home' && style.activeNavItem
            }`}
          >
           主页
          </div>
        </Link>   

        <Link to="/deploy">             
          <div
            onClick={() => setSelectedNav('deploy')}
            className={`${style.navItem} ${
              selectedNav === 'deploy' && style.activeNavItem
            }`}
          >
            ICO
          </div>
        </Link>    

          <Link to="/liquiditymining">             
          <div
            onClick={() => setSelectedNav('LM')}
            className={`${style.navItem} ${
              selectedNav === 'LM' && style.activeNavItem
            }`}
          >
            流动性挖矿计划
          </div>
          </Link>    


          <Link to="/deploy">             
          <div
            onClick={() => setSelectedNav('NFT')}
            className={`${style.navItem} ${
              selectedNav === 'NFT' && style.activeNavItem
            }`}
          >
            NFT 发布
          </div>
          </Link>   

          <Link to="/deploy">             
          <div
            onClick={() => setSelectedNav('MEV')}
            className={`${style.navItem} ${
              selectedNav === 'MEV' && style.activeNavItem
            }`}
          >
            MEV工具箱
          </div>
          </Link>     


      </div>
      </div>
      
      {/* <div className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      <Link to="/">主页</Link>  
      <Link to="/deploy">链上发币</Link>
      <Link to="/deploy">链上发币</Link>
      <Link to="/deploy">链上发币</Link>
      </div> */}

      {/* <TabList defaultActiveKey={1} tabStyle="bar" >
        <Tab tabKey={1} tabName={"流动性挖矿"}></Tab>
        <Tab tabKey={2} tabName={"链上发币"}>
        </Tab>
        <Tab tabKey={3} tabName={"NFT发布"}></Tab>
        <Tab tabKey={4} tabName={"链上套利"}></Tab>
      </TabList> */}


      {currentAccount ? (
        <div className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer  eth-card .white-glassmorphism">
          <AiFillPlayCircle className="text-white mr-2" />
          <p className="text-white font-light text-sm">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      ):(
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

      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
