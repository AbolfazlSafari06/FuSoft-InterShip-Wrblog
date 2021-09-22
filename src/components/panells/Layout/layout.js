import React from 'react'
import Header from '../../../common/Panel/Header/Header';
import SideBar from '../../../common/Panel/Sidebar/SideBar';
import Footer from '../../../common/Panel/Footer/Footer';
import './stryle.scss';
import { useState } from 'react'

function Panellayout({ children }) {

    const [isSidebarOpen, setisSidebarOpen] = useState(false);
    const onToggelSidebar = (value = null) => {
        if (value === null) {
            setisSidebarOpen(!isSidebarOpen);
        } else {
            setisSidebarOpen(value); 
        }

    }
    return (
        <div id="panelLayout" className="d-flex flex-row flex-nowrap">
            <SideBar onToggelSidebars={onToggelSidebar} open={isSidebarOpen} />
            <div className="flex-grow-1" id="route-container" >
                <Header onToggelSidebars={onToggelSidebar} />
                <div id="content" className="container-fluid py-3">
                    {children}
                </div>
                <Footer />
            </div>
        </div >
    )
}

export default Panellayout;
