import axios, { AxiosInstance } from "axios";
import { RegisterUserType } from "../account/signup/page";

export interface GenericResponse {
  status: string;
  message: string;
}

export const authApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user: RegisterUserType) => {
  const response = await authApi.post<GenericResponse>("register", user);

  return response.data;
};
