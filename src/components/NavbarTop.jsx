import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

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

const NavbarTop = () => {
  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavbarTop;
