"use client";
import { signOut } from "next-auth/react";
import { FunctionComponent } from "react";
import { useSession } from "next-auth/react";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const session = useSession();

  return (
    <div>
      <h1>{session.data?.user?.email}</h1>
      <button onClick={() => signOut()}>logout</button>
    </div>
  );
};

export default Dashboard;
