import { AnyAction } from "@reduxjs/toolkit";
import { userType } from "../../types";
import { userTypes } from "../actionTypes";

interface IInitialState {
  user: userType;
}

const initialState: IInitialState = {
  user: {},
};

export const usersReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case userTypes.SET_USER:
      return { ...state, user: payload };
    case userTypes.DEL_USER:
      return { ...state, user: payload };
    // case userTypes.INIT_USER:
    //     return { ...state, user: payload };
    default:
      return state;
  }
};