import { AnyAction } from "@reduxjs/toolkit";
// import { StateType } from './types/state';
// import { ADD_TO_FAVORITES, DEL_FROM_FAVORITES } from './type.redux';

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
      return { ...state, name: payload.name, auth: true, img: payload.photo };
      case "SAVE_USER":
      return { ...state, name: payload.name, img: payload.img, phone: payload.phone, auth: true };
      case "CHANGE_IMG":
        return { ...state, img: payload.photo};
        // case "CHANGE_IMG2":
        //   return { ...state, img2: payload.photo2};
    default:
      return state;
  }
};

export default UserReducer;