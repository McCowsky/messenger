import { FunctionComponent } from "react";
import Button from "./Button";

const SocialLogin: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center items-center w-full gap-3">
        <div className="border-t-[1px] border-black w-full "></div>
        <p className="whitespace-nowrap">or use socials</p>
        <div className="border-t-[1px] border-black w-full "></div>
      </div>
      <div className="flex gap-5">
        <Button placeholder="Google" />
        <Button placeholder="Github" />
      </div>
    </div>
  );
};

export default SocialLogin;
