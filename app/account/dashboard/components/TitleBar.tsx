"use client";
import { FunctionComponent } from "react";
import { User } from "@prisma/client";
import Avatar from "../../components/Avatar";

interface TitleBarProps {
  currentUser: User | null;
}

const TitleBar: FunctionComponent<TitleBarProps> = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <div className="flex gap-3 justify-start items-center w-full pb-4">
      <Avatar currentUser={currentUser} />
      <h1 className="text-3xl font-bold">Chats</h1>
    </div>
  );
};

export default TitleBar;
