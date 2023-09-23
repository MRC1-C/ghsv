import NotFoundPage from "@/pages/404";
import DashboardDefault from "@/pages/Diary/DashboardDefault";
import DashboardIndex from "@/pages/Diary/DashboardIndex";
import DashboardLayout from "@/pages/Diary/DashboardLayout";
import DiaryDetail from "@/pages/Diary/DiaryDetail";
import Home from "@/pages/Home";
import Population from "@/pages/Project/Population";
import ProjectLayout from "@/pages/Project/ProjectLayout";
import Resuscitate from "@/pages/Project/Resuscitate";
import { AlignLeftOutlined, HomeOutlined, ProjectOutlined } from "@ant-design/icons";
import { RouteType } from "./config";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <Home />,
    state: "/",
    sidebarProps: {
      displayText: "Home",
      icon: <HomeOutlined />
    }
  },
  {
    path: "/diary",
    element: <DashboardLayout />,
    state: "diary",
    sidebarProps: {
      displayText: "Diary",
      icon: <AlignLeftOutlined />
    },
    child: [
      {
        path: '/diary/index',
        element: <DashboardIndex />,
        state: "diary.index",
        sidebarProps: {
          displayText: "Index"
        },
      },
      {
        path: "/diary/default",
        element: <DashboardDefault />,
        state: "diary.default",
        sidebarProps: {
          displayText: "Default"
        },
      },
      {
        path: "/diary/:idDiary",
        element: <DiaryDetail />,
        state: 'diary'
      }
    ]
  },
  {
    path: "/project",
    element: <ProjectLayout />,
    state: "project",
    sidebarProps: {
      displayText: "Project",
      icon: <ProjectOutlined />
    },
    child: [
      {
        path: '/project/resuscitate',
        element: <Resuscitate />,
        state: "project.resuscitate",
        sidebarProps: {
          displayText: "Resuscitate"
        },
      },
      {
        path: '/project/population',
        element: <Population />,
        state: "project.population",
        sidebarProps: {
          displayText: "Population"
        },
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
    state: '404'
  },
];

export default appRoutes;