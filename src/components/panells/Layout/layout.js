import React from 'react'
import Header from '../../../common/Panel/Header/Header';
import SideBar from '../../../common/Panel/Sidebar/SideBar';
import Footer from '../../../common/Panel/Footer/Footer';
import './stryle.scss';

function Panellayout({ children }) {
    return (
        <div id="panelLayout">
            <div className="row">
                <div className="col-lg-2">
                    <SideBar />
                </div>
                <div className="col-lg-10" id="route-container" >
                    <Header />
                    <div id="content">
                        {children}
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Panellayout;
