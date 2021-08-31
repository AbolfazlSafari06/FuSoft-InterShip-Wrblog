import React from 'react'
import Header from '../../../common/Panel/Header/Header';
import SideBar from '../../../common/Panel/Sidebar/SideBar';
import Footer from '../../../common/Panel/Footer/Footer';
import './stryle.scss';

function Panellayout({ children }) {
    return (
        <div id="panelLayout">
            <div className="row">
                <div className="col-3 col-lg-2" style={{paddingLeft:"0px"}}>
                    <SideBar />
                </div>
                <div className="col-9 col-lg-10" id="route-container" >
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
