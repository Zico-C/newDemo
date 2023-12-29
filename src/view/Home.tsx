import { Button, Layout, Popover, theme, Tooltip, Tree } from "antd";
import SiderMenu from "./Components/Menu/MainMenuSider";
import MainMenuHeader from "./Components/Menu/MainMenuHeader";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SiderModal from "./Components/Menu/SiderModal";
import { DataNode } from "antd/es/tree";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { setTreeSelect } from "@/store/globalStatus/globalSlice";
import { SelectOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

function Home() {
  const disp = useAppDispatch();
  const [siderOpen, setSiderOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigateTo = useNavigate();
  const { deviceGroup, treeSelect } = useAppSelector(
    (state: RootState) => state.global
  );
  const [treeSelectData, setTreeSelectData] = useState(treeSelect);
  useEffect(() => {
    setTreeSelectData(treeSelect);
  }, [treeSelect]);
  useEffect(() => {
    setFormdata(deviceGroup);
  }, [deviceGroup]);
  const [formdata, setFormdata] = useState<any>(deviceGroup);
  const treeData: DataNode[] = [formdata];
  // const newArray = (deviceGroup as DeviceGroup).children.map(
  //   (item) => item.key
  // );
  console.log("treeSelectData", treeSelectData);
  // console.log("newArray", newArray);
  const TreeChange = (key: any) => {
    setTreeSelectData(key);
    disp(setTreeSelect(key));
    console.log("key", key);
  };
  // console.log("treeSelectData", treeSelectData);
  useEffect(() => {
    localStorage.setItem("TreeSelect", JSON.stringify(treeSelectData));
    // disp(setTreeSelect(treeSelectData));
  }, [treeSelect]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={siderOpen}
          onCollapse={(value) => setSiderOpen(value)}
          // onCollapse={(value) => setSiderOpen(value)}
          style={{ backgroundColor: "#202124" }}
        >
          <div
            style={
              siderOpen
                ? { height: "45px", margin: "16px" }
                : { height: "145px", margin: "16px" }
            }
          >
            <img
              src="public\OsmartNavLogo.4b9e927a.png"
              alt=""
              width="100%"
              onClick={() => navigateTo("/dashboard")}
              style={{ cursor: "pointer" }}
            />
            <div
              style={{
                marginTop: siderOpen ? "40px" : "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                whiteSpace: "nowrap",
                paddingBottom: siderOpen ? "25px" : "",
                borderBottom: "2px solid gray",
              }}
            >
              <h1 style={siderOpen ? { display: "none" } : { color: "#FFF" }}>
                群組管理
              </h1>
              <SiderModal />
            </div>
            <div style={{ marginTop: "25px" }}>
              {siderOpen ? (
                <>
                  <Popover
                    // open={isPopover}
                    trigger="click"
                    title="設備選取"
                    placement="right"
                    content={
                      <Tree
                        checkable
                        onCheck={TreeChange}
                        treeData={treeData}
                        selectable={false}
                        defaultExpandAll={true}
                        checkedKeys={treeSelectData}
                        showLine={true}
                      />
                    }
                  >
                    <Tooltip title="設備選取" placement="right">
                      <Button
                        style={{
                          backgroundColor: "#202124",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <SelectOutlined
                          style={{ color: "#fff", fontSize: "18px" }}
                        />
                      </Button>
                    </Tooltip>
                  </Popover>
                </>
              ) : (
                <Tree
                  checkable
                  onCheck={TreeChange}
                  treeData={treeData}
                  selectable={false}
                  defaultExpandAll={true}
                  checkedKeys={treeSelectData}
                  showLine={true}
                  style={{ backgroundColor: "#202124", color: "#fff" }}
                />
              )}
            </div>
          </div>
          <div>
            <SiderMenu></SiderMenu>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              color: "#141414",
              height: "64",
              lineHeight: "64px",
              fontSize: "1.6rem",
              fontWeight: "700",
              padding: "0px",
              backgroundColor: colorBgContainer,
              margin: "0",
            }}
          >
            <MainMenuHeader></MainMenuHeader>
          </Header>
          {/* <div
            style={{
              margin: "4px 8px 0px 8px",
              padding: "0",
              display: "flex",
              fontSize: "1rem",
              justifyContent: "cenrte",
            }}
          >
            麵包屑
            <Breadcrumb items={items} />
          </div> */}
          <Content
            style={{
              backgroundColor: colorBgContainer,
              margin: "8px 8px 4px 8px",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
