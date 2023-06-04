"use client";
import { FunctionComponent } from "react";
import { signOut } from "next-auth/react";

// interface LogoutProps {}

const Logout: FunctionComponent = () => {
  return <button onClick={() => signOut()}>logout</button>;
};

export default Logout;
