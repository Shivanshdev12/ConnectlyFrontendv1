import React, { useState } from "react";
import SideNavbar from "../../components/SideNavbar";
import Navbar from "../../components/Navbar";

const Main = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    const handleMenuOpen=()=>{setMenuOpen(true)}
    const handleMenuClose=()=>{setMenuOpen(false)}
    return <React.Fragment>
        <Navbar menuOpen={menuOpen} 
            handleMenu={handleMenu} 
            handleMenuOpen={handleMenuOpen} 
            handleMenuClose={handleMenuClose} />
        <div className="grid grid-cols-1 md:grid-cols-[auto_0.8fr_0.2fr] h-[92vh] overflow-y-auto">
            {<SideNavbar />}
            <div className="border-r border-[#989898] p-6">
                <div className="px-2 flex flex-col gap-4 rs-posts">
                    {/* <Post avatar="" postImg="" title="Test" desc="testing" />
                    <Post avatar="" postImg="" title="Test" desc="testing" />
                    <Post avatar="" postImg="" title="Test" desc="testing" /> */}
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Main;