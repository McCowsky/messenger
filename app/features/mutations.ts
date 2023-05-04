import { useMutation } from "@tanstack/react-query";
import { signUpUserFn } from "./services";
import { RegisterUserType } from "../account/signup/page";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (formData: RegisterUserType) => signUpUserFn(formData),
    onMutate: () => {
      //
    },
    onSuccess: () => {
      toast.success("User registered succesfully, verification email has been sent");
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });
};
