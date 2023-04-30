import { FunctionComponent } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

interface ButtonProps {
  type: "normal" | "social";
  placeholder: string;
}

const Button: FunctionComponent<ButtonProps> = ({ type, placeholder }) => {
  return (
    <button
      className={` ${type === "normal" ? "w-full" : "w-fit"} ${
        type === "normal" ? "bg-[#5386FC]" : "bg-white"
      } ${type === "normal" ? "hover:bg-[#1c60ff]" : "hover:bg-[#5386FC]"} ${
        type === "normal" ? "text-white" : "text-black"
      } ${
        type === "normal" ? "border-[0px]" : "border-[1px] border-black min-w-[125px]"
      } hover:text-white p-3 font-semibold rounded-2xl  transition flex justify-center items-center gap-2`}
    >
      {placeholder === "Google" && <AiOutlineGoogle />}
      {placeholder === "Facebook" && <FaFacebookF />}

      {placeholder}
    </button>
  );
};

export default Button;
