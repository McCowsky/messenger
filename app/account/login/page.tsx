"use client";

import { FunctionComponent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "Zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import SocialLogin from "../components/SocialLogin";

const loginSchema = z.object({
  loginEmail: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  loginPassword: z.string().min(1, { message: "Password is required" }),
  //save: z.boolean(),
});
export type loginType = z.infer<typeof loginSchema>;

const Login: FunctionComponent = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginType> = (data) => {
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("logged in");
        //router.refresh();
        setTimeout(() => {
          router.push("/account/dashboard");
        }, 400);
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={175}
        height={175}
        priority={true}
        className="w-[175px] h-[175px]"
      />
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="font-extrabold  text-2xl text-center px-4">
          Login with your Email or social account
        </p>
        <div className="flex flex-col justify-center items-center px-4 gap-4 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3 justify-center items-center"
          >
            <div className="flex flex-col gap-1 items-center justify-center w-full">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                error={errors.loginEmail}
                {...register("loginEmail")}
              />
              <Input
                id="loginPassword"
                type="password"
                placeholder="Password"
                error={errors.loginPassword}
                {...register("loginPassword")}
              />
            </div>
            <Button type="normal" placeholder="Login" />
          </form>
          <Link
            href="/account/signup"
            className="w-full bg-[#303030] text-white text-center p-3 font-semibold rounded-2xl "
          >
            Create New Account
          </Link>
          <Link href={{}} className="text-[#5386FC]">
            Forgot your password?
          </Link>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
