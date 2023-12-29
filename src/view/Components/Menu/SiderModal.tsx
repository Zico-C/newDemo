import { useEffect, useState } from "react";
import { Button, Modal, Tooltip, Form, TreeSelect, Input, Tabs } from "antd";
import type { TabsProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import DeviceAPI from "@/view/queries";
import { Status } from "../../queries";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setDeviceGroup,
  setDeviceSelect,
  setTreeSelect,
} from "@/store/globalStatus/globalSlice";
import { RootState } from "@/store";

function SiderModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState<any>([]);
  const [treeData, setTreeData] = useState([]);
  const { deviceGroup, treeSelect, deviceSelect } = useAppSelector(
    (state: RootState) => state.global
  );

  const [formdata, setFormdata] = useState<any>(deviceGroup);
  // 取得deviceGroup 群組名稱 CreateGroup
  const [groupName, setGroupName] = useState("");
  // 取得deviceGroup 設備選擇 DeviceSelect
  const [deviceSelectData, setDeviceSelectdata] = useState<any>();

  useEffect(() => {
    setGroupName(Object(deviceGroup).title);
    setDeviceSelectdata(deviceSelect);
  }, []);

  // Form initialValues屬性
  const initialValues = {
    // 對應 name:value
    createGroup: groupName,
    DeviceSelect: deviceSelectData,
  };
  const [form] = Form.useForm();
  const { SHOW_PARENT } = TreeSelect;

  const { data, status } = DeviceAPI();
  const disp = useAppDispatch();

  // Modal 開啟
  const showModal = () => {
    setIsModalOpen(true);
  };
  // Modal 關閉
  const handleCancel = () => {
    console.log("關閉 Modal");
    setIsModalOpen(false);
  };

  // 當 Modal 送出資料時 異部加載 兩秒後 送出 form 表單 執行 handleFormSubiit
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmLoading(false);
      form.submit();
    }, 2000);
  };

  const onChangeTabs = (key: string) => {
    console.log(key);
  };

  // 引入API 並將資料重新整理包入 TreeData 內，依賴項為 data
  useEffect(() => {
    if (status === "success") {
      const formattedData = data?.status?.map((items: Status) => ({
        title: items.Device_Location,
        value: items.Device_Location,
        key: items.Device_Location,
      }));
      setTreeData(formattedData);
    }
  }, [data]);

  const onChange = (newValue: string[]) => {
    console.log("onChange", newValue);
    setValue(newValue);
  };
  // 樹選擇架構
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please Select",
    style: {
      width: "100%",
    },
  };

  // Form 表單送出 Function
  const handleFormSubiit = () => {
    form
      .validateFields()
      .then((values) => {
        const childrenArray = values.DeviceSelect.map((device: any) => ({
          title: device,
          key: device,
        }));

        const formSelectData = {
          title: values.createGroup,
          key: values.createGroup,
          children: childrenArray,
        };

        const SeleteData = formSelectData.children.map((item: any) => item.key);

        console.log("SeleteData", SeleteData);
        console.log("treeSelect", treeSelect);
        const filterSelectedData = treeSelect.filter((item: any) =>
          SeleteData.includes(item)
        );

        try {
          localStorage.setItem(
            "TreeSelect",
            JSON.stringify(filterSelectedData)
          );
          console.log("Data stored successfully");
        } catch (error) {
          console.error("Error storing data in localStorage:", error);
        }
        disp(setTreeSelect(filterSelectedData));
        localStorage.setItem("DeviceGroup", JSON.stringify(formSelectData));
        disp(setDeviceSelect(value));
        localStorage.setItem("DeviceSelect", JSON.stringify(value));

        console.log(value);
        disp(setDeviceGroup(formSelectData));
        // disp(setTreeSelect());
        setFormdata(formSelectData);
      })
      .catch((error) => {
        console.log("Form validation failed:", error);
      });
  };

  // 標籤頁(Tabs)
  const itemsTabs: TabsProps["items"] = [
    {
      key: "1",
      label: "新增群組",
      children: (
        <>
          <Form
            onFinish={handleFormSubiit}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ border: "1px solid #201424" }}
            initialValues={initialValues}
          >
            <h1 style={{ textAlign: "center" }}>設備群組管理</h1>
            <Form.Item
              label="CreateGroup"
              name="createGroup"
              required
              style={{ marginTop: "20px" }}
            >
              <Input placeholder="Group_Name" />
            </Form.Item>
            <Form.Item label="DeviceSelect" name="DeviceSelect" required>
              <TreeSelect {...tProps} />
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      key: "2",
      label: "群組管理",
      children: (
        <>
          {Object.keys(formdata).length !== 0 ? (
            <div>
              <p>群組名稱：{formdata.title}</p>
              <div>
                {formdata.children?.map((item: any, index: number) => (
                  <div key={item.key}>
                    <p>
                      {index + 1}、{item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>目前尚未新增群組</p>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Tooltip title="群組管理" placement="right">
        <Button
          onClick={showModal}
          style={{
            backgroundColor: "#202124",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SettingOutlined style={{ color: "#fff", fontSize: "18px" }} />
        </Button>
      </Tooltip>

      <Modal
        title="群組管理"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Tabs defaultActiveKey="1" items={itemsTabs} onChange={onChangeTabs} />
      </Modal>
    </>
  );
}

export default SiderModal;
