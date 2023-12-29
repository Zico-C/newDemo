import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "super_super",
    "/user",
    <UserOutlined style={{ fontSize: "24px" }} />
  ),
];

function MainMenuSider() {
  const currentRoute = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>("");
  const navigateTo = useNavigate();

  // navbar 選單判斷
  useEffect(() => {
    if (currentRoute.pathname !== "/user") {
      setSelectedKey("");
    } else {
      setSelectedKey(currentRoute.pathname);
    }
  }, [currentRoute, selectedKey]);
  const menuClick = (e: { key: string }) => {
    navigateTo(e.key);
    console.log(e.key);
  };

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[selectedKey]}
        onClick={menuClick}
        items={items}
        // selectable={false}
        style={{
          position: "absolute",
          width: "100%",
          bottom: "48px",
          textAlign: "center",
          borderTop: "1px solid gray",
          borderBottom: "2px solid gray",
          backgroundColor: "#202124",
          color: "#fff",
        }}
      />
    </>
  );
}

export default MainMenuSider;
