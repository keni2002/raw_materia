import SidebarDash from "../components/SiderBarDash";
import HeaderDash from "../components/HeaderDash";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const closeMenu = () => {
    setMenuVisible(false);
  }
  return (

    <div className="">
      <SidebarDash closeMenu={closeMenu} menuVisible={menuVisible} />
      <main className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main ${menuVisible ? '' : 'active'}`}>
        <HeaderDash toggleMenu={toggleMenu} menuVisible={menuVisible} />
        <div className="flex flex-col items-center">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
