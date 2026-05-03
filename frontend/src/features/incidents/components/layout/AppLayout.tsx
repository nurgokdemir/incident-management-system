import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#071a3d]">
      <Sidebar />

      <div className="ml-72 min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}