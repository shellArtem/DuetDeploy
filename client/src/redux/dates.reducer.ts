import { AnyAction } from "@reduxjs/toolkit";
// import { StateType } from './types/state';
// import { ADD_TO_FAVORITES, DEL_FROM_FAVORITES } from './type.redux';

const initialState = {
  dates: [],
};

const DatesReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "ALL_DATES":
        return { ...state, dates: payload };
    default:
      return state;
  }
};

export default DatesReducer;