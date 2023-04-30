import axios from "axios";
import { RegisterUserType } from "../account/signup/page";

export interface GenericResponse {
  status: string;
  message: string;
}

const BASE_URL = "http://localhost:3000/api/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user: RegisterUserType) => {
  const response = await authApi.post<GenericResponse>("register", user);

  return response.data;
};
