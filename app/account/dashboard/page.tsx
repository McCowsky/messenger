import { signOut } from "next-auth/react";
import { AiOutlineSearch } from "react-icons/ai";
import getCurrentUser from "@/app/features/actions/getCurrentUser";
import TitleBar from "./components/TitleBar";
import Logout from "./components/Logout";

//interface DashboardProps {}

const Dashboard = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <TitleBar currentUser={currentUser} />
      <div className="relative">
        <AiOutlineSearch />
        <input type="text" placeholder="&#x1F50D; " />
      </div>
      <h1>{currentUser?.email}</h1>
      <Logout />
    </div>
  );
};

export default Dashboard;
