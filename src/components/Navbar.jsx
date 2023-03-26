import React, { useContext , useState} from "react";
import { shortenAddress } from "../utils/shortenAddress";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


const items = [
  {
    label: (<Link to="/">主页</Link>),
      
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: '社区成员功能',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: '科学家工具',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (<Link to="/">文档</Link>),
      
    key: 'doucument',
    icon: <MailOutlined />,
  },
  {
    label: (
      <a href="https://twitter.com/MerlinKbb" target="_blank" rel="noopener noreferrer">
        点击联系管理员
      </a>
    ),
    key: 'alipay',
  },
];


const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { currentAccount,connectWallet } = useContext(TransactionContext);
  const [selectedNav, setSelectedNav] = React.useState('home')
  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };


  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">

      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="rounded-full mx-8"/>
    


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
