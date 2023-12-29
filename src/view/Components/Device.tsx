import React from "react";
import deviceAPI, { Status } from "../queries";

function Device() {
  const { data, status } = deviceAPI();
  // console.log(data?.status?.map((item: any) => item.Device_ID));
  // console.log(data?.status);

  // console.log(status);
  return (
    <div style={{ backgroundColor: "#202124", height: "100%" }}>
      <h1
        style={{
          fontSize: "3rem",
          margin: 0,
          color: "#fff",
          textAlign: "center",
        }}
      >
        Device
      </h1>
      <div style={{ fontSize: "1.5rem", color: "#fff" }}>
        <h1>目前設備</h1>
        {status === "success" &&
          data?.status?.map((item: Status) => (
            <React.Fragment key={item.id}>
              <div>
                <span style={{ margin: "25px" }}>{item.id + 1}</span>
                <span style={{ margin: "25px" }}>{item.Device_Location}</span>
                <span style={{ margin: "25px" }}>{item.Device_ID}</span>
                <span style={{ margin: "25px" }}>{item.Health}</span>
                <span style={{ margin: "25px" }}>{item.Signal}</span>
                <span style={{ margin: "25px" }}>{item.Model}</span>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Device;
