"use client";
import { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "Zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Button from "../components/Button";
import SocialLogin from "../components/SocialLogin";
import { useRegisterUser } from "@/app/features/mutations";

//  TODO:
//  - add loading spinner while mutate

const registerSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });
export type RegisterUserType = z.infer<typeof registerSchema>;

const Signup: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserType>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser } = useRegisterUser();

  const onSubmit: SubmitHandler<RegisterUserType> = (data) => {
    registerUser(data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={175}
        height={175}
        priority={true}
        className="w-[175px] h-[175px]"
      />
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-2xl font-extrabold text-center px-4">
          Create new Messenger Account
        </p>
        <div className="flex flex-col justify-center items-center w-full px-4 gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3 justify-center items-center"
          >
            <div className="flex flex-col w-full justify-center items-center gap-1">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                error={errors.email}
                {...register("email")}
              />

              <Input
                id="password"
                type="password"
                placeholder="Password"
                error={errors.password}
                {...register("password")}
              />

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                error={errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </div>
            <div className="flex self-start gap-2">
              <Input
                id="terms"
                type="checkbox"
                placeholder="Accept Terms and Conditions"
                error={errors.terms}
                {...register("terms")}
              />
            </div>

            <Button type="normal" placeholder="Register" />
          </form>
          <Link
            href="/account/login"
            className="w-full bg-[#303030] text-white text-center p-3 font-semibold rounded-2xl "
          >
            Login with existing account
          </Link>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Signup;
