import { userTypes, pointTypes } from "./actionTypes";

export const initUserAC = (data) => ({
  type: userTypes.SET_USER,
  payload: data,
});

export const addPointsAC = (point) => ({
  type: pointTypes.ADD_POINT,
  payload: point,
});

export const resetPointsAC = () => ({
  type: pointTypes.RESET_POINTS,
});
