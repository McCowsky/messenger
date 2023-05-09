import { FunctionComponent, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ButtonProps {
  placeholder: string;
}

const Button: FunctionComponent<ButtonProps> = ({ placeholder }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clicked, setClicked] = useState<string>("");

  return (
    <button
      className={`w-fit bg-white hover:bg-[#5386FC] text-black border-[1px] border-black min-w-[125px]
       cursor-pointer hover:text-white p-3 font-semibold rounded-2xl  transition flex justify-center items-center gap-2`}
      disabled={isLoading ? true : false}
      value={placeholder}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (setIsLoading) setIsLoading(true);
        setClicked((event.target as HTMLButtonElement).value);

        signIn(placeholder.toLowerCase(), { redirect: false })
          .then((callback) => {
            if (callback?.error) {
              toast.error(callback.error);
            }
            if (callback?.ok && !callback.error) {
              toast.success("logged in");

              //router.refresh();
              setTimeout(() => {
                router.push("/account/dashboard");
              }, 400);
            }
          })
          .finally(() => {
            if (setIsLoading) setIsLoading(false);
          });
      }}
    >
      {placeholder === "Google" && <AiOutlineGoogle />}
      {placeholder === "Github" && <AiFillGithub />}

      {!isLoading && placeholder}
      {isLoading && clicked === placeholder && <ImSpinner2 className="animate-spin" />}
    </button>
  );
};

export default Button;
