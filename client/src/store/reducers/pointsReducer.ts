import { AnyAction } from "@reduxjs/toolkit";

import { pointTypes } from "../actionTypes";

interface IInitialState {
    points: number;
}

const initialState: IInitialState = {
  points: 0,
};

export const pointsReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case pointTypes.ADD_POINT:
      return { ...state, points: payload };
      case pointTypes.RESET_POINTS:
      return { ...state, points: 0 };
    default:
      return state;
  }
}