/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { AnyAction } from "@reduxjs/toolkit";
// import { StateType } from './types/state';
// import { ADD_TO_FAVORITES, DEL_FROM_FAVORITES } from './type.redux';

const initialState = {
  feedbacks: [],
};

const FeedbackReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "ALL_FEEDBACKS":
        return { ...state, feedbacks: payload };
    case "APPROVE_FEEDBACK":
      // eslint-disable-next-line no-case-declarations
      const idStatus = state.feedbacks.findIndex((el) => el.id === payload.id);
      console.log('========================', payload);
      return {
        ...state,
        feedbacks: state.feedbacks.map((el, i) => {
          if (idStatus === i) {
            console.log(el)
            return { ...el, approved: payload.curApproved };
          }
          return el;
        }),
      };

    case "DELETE_FEEDBACK":
      return { ...state, feedbacks: state.feedbacks.filter((e) => e.id !== payload) };
    default:
      return state;
  }
};

export default FeedbackReducer;