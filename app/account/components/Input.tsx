"use client";
import { FunctionComponent, forwardRef } from "react";
import { FieldError } from "react-hook-form";
interface InputProps {
  id: string;
  type: string;
  placeholder?: string;
  error: FieldError | undefined;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          {...props}
          className={`p-3 border-2 ${type === "checkbox" ? "w-fit" : "w-full"}`}
        />
        {type === "checkbox" && (
          <label htmlFor={id} className="pl-2">
            {placeholder}
          </label>
        )}
        {error && <p>{error.message}</p>}
      </div>
    );
  }
);

// const Input1: FunctionComponent<InputProps> = ({
//   id,
//   type,
//   placeholder,
//   error,
//   ...props
// }) => {
//   return (
//     <div>
//       <input
//         type={type}
//         id={id}
//         placeholder={placeholder}
//         {...props}
//         className="p-3 border-2 w-full"
//       />
//       {error && <p>{error.message}</p>}
//     </div>
//   );
// };

export default Input;
