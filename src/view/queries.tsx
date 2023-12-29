import axios from "axios";
import { useQuery } from "react-query";

export interface Device {
  deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
  description: string;
  updatetime: string;
  status: Status[];
}

export interface Status {
  id: number;
  Device_Location: string;
  Device_ID: string;
  Health: string;
  Signal: string;
  Model: string;
  statusNum: number;
  latitude: string;
  longitude: string;
}

async function fetchDevice() {
  try {
    const response = await axios.get("http://localhost:3010/deviceInfo");
    return response.data;
  } catch (error) {
    throw new Error("讀取API失敗");
  }
}

const DeviceAPI = () => {
  const { data, isLoading, isFetched, error, status } = useQuery(
    "Device",
    fetchDevice,
    {
      refetchOnWindowFocus: false,
      // staleTime: Infinity,
      // cacheTime: Infinity,
    }
  );
  return { data, isLoading, isFetched, error, status };
};
export default DeviceAPI;
