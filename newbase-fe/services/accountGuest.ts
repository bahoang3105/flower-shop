import { API_URL } from "constants/routes";
import { api } from "./api";

export const postAccountGuests = (
  params: any,
  callBackSuccess?: any,
  callBackError?: any
) => {
  return api.post(
    API_URL.ACCOUNT_GUEST,
    params,
    callBackSuccess,
    callBackError
  );
};

export const getAccountGuests = (params: any) => {
  return api.get(API_URL.ACCOUNT_GUEST, params);
};

export const deleteAccountGuests = (params: any) => {
  return api.delete(API_URL.DELETE_ACCOUNT_GUEST, params);
};
