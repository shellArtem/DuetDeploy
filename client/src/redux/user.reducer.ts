import { AnyAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  img: "",
  img2: "",
  phone: "",
  auth: false,
};

const UserReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "REG_USER":
      return { ...state, name: payload.name, phone: payload.phone, auth: true };
    case "LOGOUT_USER":
      return { ...state, name: payload, auth: false, img: '' };
    case "LOG_USER":
      return { ...state, name: payload.name, auth: true, img: payload.photo, phone: payload.phone};
      case "SAVE_USER":
      return { ...state, name: payload.name, img: payload.img, phone: payload.phone, auth: true };
      case "CHANGE_IMG":
        return { ...state, img: payload.photo};
    default:
      return state;
  }
};

export default UserReducer;