import appRoutes from "@/routes/appRoutes";
import { Layout, MenuProps } from 'antd';
import { Menu } from 'antd';
import { RouteType } from "@/routes/config";
import { useState } from "react";
import logo from '@/assets/logo.png'
import {  useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const getItem = (items: RouteType[]): MenuItem[] => {
  return items.map((route: RouteType) => {
    if (route.sidebarProps) {
      if (route.child) {
        return ({
          key: route.state,
          icon: route.sidebarProps.icon,
          children: getItem(route.child),
          label: route.sidebarProps.displayText,
          type: null,
        } as MenuItem)
      }
      else return ({
        key: route.state,
        icon: route.sidebarProps.icon,
        children: null,
        label: route.sidebarProps.displayText,
        type: null,
      } as MenuItem)
    }
  }) as MenuItem[]
}

const Sidebar = () => {
  const { appState } = useSelector((state: RootState) => state.appState);
  const [open, setOpen] = useState<string[]>()
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Sider collapsible collapsed={collapsed} style={{height: '100vh'}} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 40, margin: 16,display: 'flex', justifyContent: 'center'}}>
        <img src={logo} style={{height: '100%', aspectRatio: '1/1',borderRadius: 50,cursor: 'pointer'}} onClick={()=>navigate('/')}></img>
      </div>
      <Menu
        selectedKeys={[appState]}
        openKeys={open?open:appState.split('.')}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={getItem(appRoutes)}
        onOpenChange={(e)=>setOpen(e)}
        onClick={({key})=>navigate(key.replace(".","/"))}
      />
    </Sider>
  );
};

export default Sidebar;