import React from 'react'
import './style.scss'

function Layout({ children }) {
    return (
        <div id="authlayout">
            {children}
        </div>
    )
}

export default Layout
