import { useMutation } from "@tanstack/react-query";
import { signUpUserFn, verifyEmailFn } from "./services";
import { RegisterUserType } from "../account/signup/page";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { VerifyType } from "../account/verifyemail/page";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (formData: RegisterUserType) => signUpUserFn(formData),
    onMutate: () => {
      //     // store.setRequestLoading(true);
    },
    onSuccess: () => {
      //     //  store.setRequestLoading(false);

      toast.success("User registered succesfully");
    },
    onError: (error: AxiosError) => {
      //     // store.setRequestLoading(false);

      toast.error(error.message);
    },
  });
};

export const useVerifyEmail = () => {
  console.log("jeden");

  return useMutation({
    mutationFn: (data: VerifyType) => verifyEmailFn(data),
    onMutate: () => {
      //     // store.setRequestLoading(true);
    },
    onSuccess: () => {
      //     //  store.setRequestLoading(false);
    },
    onError: (error: AxiosError) => {
      //     // store.setRequestLoading(false);
      toast.error(error.message);
    },
  });
};
