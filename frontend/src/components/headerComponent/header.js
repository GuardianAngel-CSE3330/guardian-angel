import React, { Component } from 'react';
import ghostLogo from '../images/ghostLogo.png';

class Header extends Component {
    render(){
        return (
        <header>
            <div className = "logo">
                <img src = {ghostLogo} alt = "webLogo" className = "websiteLogo"/>
            </div>
            <nav>
                <ul>
                    <li className = "first">
                        <a href = "#">Home</a>
                    </li>
                    <li>
                        <a href = "#">Profile</a>
                    </li>
                    <li className = "last">
                        <a href = "#">Sightings</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
    }
}

export default Header;
 