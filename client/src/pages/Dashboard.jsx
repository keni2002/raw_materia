import ContentDash from "../components/ContentDash";
import SidebarDash from "../components/SiderBarDash";
import HeaderDash from "../components/HeaderDash";
import { useState } from "react";
const Dashboard = () => {
  const [menuVisible, setMenuVisible] = useState(true)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const closeMenu = () => {
    setMenuVisible(false);
  }


  return (
    
    <div className="text-gray-800 font-inter">
      
      <SidebarDash closeMenu={closeMenu} menuVisible={menuVisible}/>
    
      <main className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main ${menuVisible ? '':'active'}`}>
          <HeaderDash toggleMenu={toggleMenu} menuVisible={menuVisible} />
          <ContentDash/>
      </main>
    </div>
  );
};

export default Dashboard;
