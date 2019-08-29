import React from 'react'

import logo from './F7C290B3-1025-4C8B-800E-00AB38F1E81E-8882-000008727D89CBAA.PNG'
import './logo.less'


export default function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className='logo-img'/>
        </div>
    )
}
