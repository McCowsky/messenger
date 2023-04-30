import { FunctionComponent } from "react";
import Button from "./Button";

const SocialLogin: FunctionComponent = () => {
  return (
    <div className="flex gap-5">
      <Button type="social" placeholder="Google" />
      <Button type="social" placeholder="Facebook" />
    </div>
  );
};

export default SocialLogin;
