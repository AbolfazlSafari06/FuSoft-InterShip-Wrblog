import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

import instagram from './instagram.png'
import linkedin from './linkedin.png'
import './style.scss'

function Footer() {
    return (

        <footer style={{ backgroundColor: "rgb(216 216 216)" }} className="footer " >
            <div className="d-flex justify-content-around">
                <div className="text-center ">
                    تمامی حقوق این سایت متعلق به فیوسافت است.
                </div>
                <div className="text-center ">
                    <span>
                        ما را در شبکه های اجتماعی دنبال کنید
                    </span>
                    <span >
                        <a target="_blank" className="mx-2" href="https://www.instagram.com/fusoftco/">
                            <img src={instagram} alert="instagram_logo" className="logo " />
                        </a>
                        <a target="_blank" className="mx-2" href="https://www.linkedin.com/company/fusoft/">
                            <img src={linkedin} alert="instagram_logo" className="logo " /> 
                        </a>
                        {/* <Link className="mx-2" to="https://www.instagram.com/fusoftco/">
                            <img src={instagram} alert="instagram_logo" className="logo " />
                        </Link>
                        <Link className="mx-2" to="https://www.linkedin.com/company/fusoft/">
                            <img src={linkedin} alert="instagram_logo" className="logo " />
                        </Link> */}
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
