"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SocialLogin from "../components/SocialLogin";
import { z } from "zod";
import { ImSpinner2 } from "react-icons/im";

const loginSchema = z.object({
  loginEmail: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  loginPassword: z.string().min(1, { message: "Password is required" }),
  //save: z.boolean(),
});
export type loginType = z.infer<typeof loginSchema>;

const Login: FunctionComponent = () => {
  const session = useSession();
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

  useEffect(() => {
    if (session.status === "authenticated") {
      setTimeout(() => {
        router.push("/account/dashboard");
      }, 400);
    }
  }, [session.status, router]);

  const onSubmit: SubmitHandler<loginType> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }
        if (callback?.ok && !callback.error) {
          toast.success("logged in");
          //router.refresh();
          setTimeout(() => {
            router.push("/account/dashboard");
          }, 400);
        }
      })
      .finally(() => {
        setIsLoading(false);
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
            <button className="w-full bg-[#5386FC] hover:bg-[#1c60ff] text-white border-[0px] hover:text-white p-3 font-semibold rounded-2xl  transition flex justify-center items-center gap-2">
              {isLoading ? <ImSpinner2 className="animate-spin" /> : "Login"}
            </button>
          </form>
          <Link
            href={!isLoading ? `/account/signup` : {}}
            className={`w-full bg-[#303030] text-white text-center p-3 font-semibold rounded-2xl ${
              isLoading ? "cursor-none" : "cursor-pointer"
            }`}
            onClick={(event) => (isLoading ? event.preventDefault() : null)}
          >
            Create New Account
          </Link>
          <Link
            href={!isLoading ? `` : {}}
            className={`text-[#5386FC] ${isLoading ? "cursor-none" : "cursor-pointer"}`}
            onClick={(event) => (isLoading ? event.preventDefault() : null)}
          >
            Forgot your password?
          </Link>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
