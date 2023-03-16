import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from "./../Images/logo.png"
const TopNav = () => {
    return (
        <div className="topNav">
            <Container> <div id="logoDiv">
                <NavLink to="/dashboard" activeclassname="activeNav"><img src={Logo} alt="logo.png" /></NavLink>
                <div className="topNavLinks">
                    <NavLink to="/dashboard" end activeclassname="activeNav"><p>Dashboard</p></NavLink>
                    <NavLink to="/dashboard/partners" activeclassname="activeNav"><p>Partners</p></NavLink>
                    <NavLink to="/dashboard/statics" activeclassname="activeNav"><p>Statics</p></NavLink>
                    <NavLink to="/dashboard/withdrawal" activeclassname="activeNav"><p>Withdrawal</p></NavLink>
                    <NavLink to="/"><button>Disconnect</button></NavLink>
                </div>
            </div></Container>
        </div>
    )
}

export default TopNav