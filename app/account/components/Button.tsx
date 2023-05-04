import { FunctionComponent } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps {
  type: "normal" | "social";
  placeholder: string;
  isLoading?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ type, placeholder, isLoading }) => {
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

      {!isLoading && placeholder}
      {isLoading && <ImSpinner2 className="animate-spin" />}
    </button>
  );
};

export default Button;
