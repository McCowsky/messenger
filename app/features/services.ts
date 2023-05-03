import axios, { AxiosInstance } from "axios";
import { RegisterUserType } from "../account/signup/page";
import { VerifyType } from "../account/verifyemail/page";

export interface GenericResponse {
  status: string;
  message: string;
}

const BASE_URL = "http://localhost:3000/api/";

export const authApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user: RegisterUserType) => {
  const response = await authApi.post<GenericResponse>("register", user);

  return response.data;
};

export const verifyEmailFn = async (data: VerifyType) => {
  console.log("dwa");

  const response = await authApi.patch<GenericResponse>("verify", data);

  return response.data;
};
