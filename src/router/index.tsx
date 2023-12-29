import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Home from "../view/Home";

const Dashboard = lazy(() => import("../view/Components/Dashboard"));
const Device = lazy(() => import("../view/Components/Device"));
const Iot = lazy(() => import("../view/Components/Iot"));
const Management = lazy(() => import("../view/Components/Management"));
const User = lazy(() => import("../view/Components/User"));
// 這個函數，它接受一個 JSX 元素作為參數，並返回一個包裹在 React.Suspense 中的 JSX 元素
const WithLoadingComponent = (comp: JSX.Element) => (
  // React.Suspense 允許在動態加載組件時提供一個備用內容（fallback）。
  // 在這裡，如果動態加載的組件尚未載入完成，將顯示 "Loading..." 字樣。
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const Router = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/dashboard",
        element: WithLoadingComponent(<Dashboard />),
      },
      {
        path: "/device",
        element: WithLoadingComponent(<Device />),
      },
      {
        path: "/iot",
        element: WithLoadingComponent(<Iot />),
      },
      {
        path: "/management",
        element: WithLoadingComponent(<Management />),
      },
      {
        path: "/user",
        element: WithLoadingComponent(<User />),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
];
export default Router;
