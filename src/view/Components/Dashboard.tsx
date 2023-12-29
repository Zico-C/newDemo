import sss from "./CSS/main.module.scss";
import deviceAPI, { Status } from "../queries";
import { useAppSelector } from "@/store/hook";
import { RootState } from "../../store/index";
import React, { useEffect, useState } from "react";
function Dashboard() {
  const { data, status } = deviceAPI();
  // console.log(data);
  const { treeSelect } = useAppSelector((state: RootState) => state.global);
  const filtered = data?.status?.filter((item: Status) =>
    treeSelect.includes(item.Device_Location)
  );
  const [filteredData, setFilteredData] = useState(filtered);

  useEffect(() => {
    setFilteredData(filtered);
  }, [data]);
  useEffect(() => {
    setFilteredData(filtered);
    console.log(treeSelect);
  }, [treeSelect]);
  console.log(treeSelect);
  return (
    <>
      <div className={sss.main}>
        <h1>Dashboard</h1>
        {status === "success" &&
          filteredData?.map((items: Status, index: number) => (
            <React.Fragment key={index}>
              <div
                style={{
                  fontSize: "2rem",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <span>{items.id + 1}</span>
                <span>{items.Device_Location}</span>
                <span>{items.Device_ID}</span>
                <span>{items.Health}</span>
                <span>{items.Model}</span>
                <span>{items.Signal}</span>
              </div>
            </React.Fragment>
          ))}
      </div>
    </>
  );
}

export default Dashboard;
