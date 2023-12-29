import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface globalSlice {
  isLogin: boolean;
  user: string | undefined;
  email: string;
  address: string;
  level: string;
  deviceGroup: object;
  treeSelect: any[];
  deviceSelect: any[];
}

const initialState: globalSlice = {
  isLogin: localStorage.getItem("User.name") ? true : false,
  user: localStorage.getItem("User.name") || undefined,
  email: localStorage.getItem("User.email") || "",
  address: localStorage.getItem("User.address") || "",
  level: localStorage.getItem("User.level") || "user",
  deviceGroup: JSON.parse(localStorage.getItem("DeviceGroup") || "{}"),
  treeSelect: JSON.parse(localStorage.getItem("TreeSelect") || "[]"),
  deviceSelect: JSON.parse(localStorage.getItem("DeviceSelect") || "[]"),
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action: PayloadAction<string | undefined>) => {
      state.user = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAdderss: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setLevel: (state, action: PayloadAction<string>) => {
      if (action.payload === "super_super") {
        state.level = "supersuper";
      } else {
        state.level = "user";
      }
      localStorage.setItem("User.level", state.level);
    },
    setDeviceGroup: (state, action: PayloadAction<object>) => {
      state.deviceGroup = action.payload;
    },
    setTreeSelect: (state, action: PayloadAction<any[]>) => {
      state.treeSelect = action.payload;
    },
    setDeviceSelect: (state, action: PayloadAction<any[]>) => {
      state.deviceSelect = action.payload;
    },
  },
});
export const {
  setIsLogin,
  setUser,
  setEmail,
  setAdderss,
  setLevel,
  setDeviceGroup,
  setTreeSelect,
  setDeviceSelect,
} = globalSlice.actions;

export default globalSlice.reducer;
