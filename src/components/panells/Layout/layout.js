import React from 'react'
import Header from '../../../common/Panel/Header/Header';
import SideBar from '../../../common/Panel/Sidebar/SideBar';
import Footer from '../../../common/Panel/Footer';
import './stryle.scss';

function Panellayout({ children }) {
    return (
        <div>
            <div className="row">
                <div className="col-lg-2" style={{paddingLeft: "0"}}>

                <SideBar />
            </div>
            <div className="col-lg-10">
                <Header />
                <div>
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
