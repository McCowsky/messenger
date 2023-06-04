"use client";
import { FunctionComponent } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
interface AvatarProps {
  currentUser: User | null;
}

const Avatar: FunctionComponent<AvatarProps> = ({ currentUser }) => {
  return (
    <div className="relative h-9 w-9">
      <Image src={currentUser?.image || "/placeholderuser.jpg"} alt="your picture" fill />
    </div>
  );
};

export default Avatar;
