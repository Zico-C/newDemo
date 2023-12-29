import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  DeploymentUnitOutlined,
  DashboardOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hook";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  level?: string[],
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    level,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Dashboard",
    "/dashboard",
    <DashboardOutlined style={{ fontSize: "24px" }} />,
    ["supersuper", "admin", "user"]
  ),
  getItem(
    "Device",
    "/device",
    <DeploymentUnitOutlined style={{ fontSize: "24px" }} />,
    ["supersuper", "admin", "user"]
  ),
  getItem("IOT", "/iot", <ApartmentOutlined style={{ fontSize: "24px" }} />, [
    "supersuper",
  ]),
  getItem(
    "Management",
    "/management",
    <UsergroupAddOutlined style={{ fontSize: "24px" }} />,
    ["supersuper"]
  ),
];

const rootSubmenuKeys = ["Dashboard", "Device", "IOT", "Management"];

function MainMenuHeader() {
  const currentRoute = useLocation();
  const [openKeys, setOpenKeys] = useState(["Dashboard"]);
  const [selectedKey, setSelectedKey] = useState<string>("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (currentRoute.pathname === "/user") {
      setSelectedKey("");
    } else {
      setSelectedKey(currentRoute.pathname);
    }
  }, [currentRoute, selectedKey]);

  const menuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    navigateTo(e.key);
    // console.log(e.key);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <Menu
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        theme="dark"
        onClick={menuClick}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
        style={{
          height: "100%",
          backgroundColor: "#202124",
          color: "#fff",
          paddingLeft: "8px",
        }}
      />
    </>
  );
}

export default MainMenuHeader;
