import { FunctionComponent } from "react";

interface ButtonProps {
  type: "normal" | "social";
  placeholder: string;
}

const Button: FunctionComponent<ButtonProps> = ({ type, placeholder }) => {
  return (
    <button
      className={` ${type === "normal" ? "w-full" : "w-fit"} ${
        type === "normal" ? "bg-[#5386FC]" : "bg-white"
      } ${type === "normal" ? "hover:bg-[#1c60ff]" : "hover:bg-white"} ${
        type === "normal" ? "text-white" : "text-black"
      } p-3 font-semibold rounded-2xl  transition`}
    >
      {placeholder}
    </button>
  );
};

export default Button;
