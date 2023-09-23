import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import Sidebar from "./common/Sider";
const { Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout hasSider>
      <Sidebar />
      <Layout className="h-screen overflow-auto">
        <Header />
        <Content>
          <div className="min-h-[calc(100vh-64px)]">
            <Outlet />
          </div>
          <Footer className="bg-white text-center">@CJ</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;