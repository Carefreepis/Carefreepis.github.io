import { FileOutlined, PieChartOutlined, UserOutlined ,DesktopOutlined,TeamOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png"


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/">主页</Link>, '1', <PieChartOutlined />),
  getItem(<Link to="/deploy">链上发币 ICO</Link>, '2', <DesktopOutlined />),
  getItem(<Link to="/liquiditymining">创建流动性挖矿计划</Link>, '9', <FileOutlined />),
  getItem('科学家工具', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />,[
    getItem('Team 1', '6'), 
    getItem('Team 2', '8')
  ]),

];
const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </Layout>
  );
};
export default Navbar;