import appRoutes from "@/routes/appRoutes";
import { Drawer, Layout, MenuProps } from 'antd';
import { Menu } from 'antd';
import { RouteType } from "@/routes/config";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png'
import './SiderHidden.css'
import { setOpenSibar } from "@/stores/features/appStateSlice";
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

const SiderHidden = () => {
    const { appState, openSibar } = useSelector((state: RootState) => (state.appState));
    const [open, setOpen] = useState<string[]>()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <div>
            <Drawer
                className="m-0 p-0"
                placement={'left'}
                closable={false}
                onClose={() => dispatch(setOpenSibar(false))}
                open={openSibar}
                width={200}
            >
                {/* <Sider collapsible> */}
                <Sider className='bg-[#001529] h-screen'>
                    <div className="h-[60px] p-4 flex justify-center">
                        <img src={logo} className="h-full aspect-square rounded-[50px] cursor-pointer" onClick={() => navigate('/')}></img>
                    </div>
                    <Menu
                        selectedKeys={[appState]}
                        openKeys={open ? open : appState.split('.')}
                        mode="inline"
                        theme="dark"
                        items={getItem(appRoutes)}
                        onOpenChange={(e) => setOpen(e)}
                        onClick={({ key }) => navigate(key.replace(".", "/"))}
                    />
                </Sider>
                {/* </Sider> */}
            </Drawer>
        </div>
    );
};

export default SiderHidden;