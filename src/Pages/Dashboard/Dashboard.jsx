import React from 'react'
import "./Dashboard.css"
import { AiFillHome } from "react-icons/ai"
import { GiTeamIdea } from "react-icons/gi"
import { GoSignOut } from "react-icons/go"
import { BsGraphUp } from "react-icons/bs"
import { FaMoneyBill } from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import NavPages from '../../NavPages'
import { Container } from 'react-bootstrap'
const Dashboard = () => {
    return (
        <>
            <h1 id="CopiedMsg">Copied!</h1>
            <div style={{ height: "100vh", overflowY: "scroll" }}>
                <section id="bottomNavbarSection">
                    <Container id="bottomNavbarContainer">
                        <NavLink to="/dashboard" end activeclassname="activeNav">
                            <div>
                                <i><AiFillHome /></i>
                                <p>Dashboard</p>
                            </div></NavLink>
                        <NavLink to="/dashboard/partners" activeclassname="activeNav">
                            <div>
                                <i><GiTeamIdea /></i>
                                <p>Partners</p>
                            </div></NavLink>
                        <NavLink to="/dashboard/statics" activeclassname="activeNav">
                            <div>
                                <i><BsGraphUp /></i>
                                <p>Statics</p>
                            </div></NavLink>
                        <NavLink to="/dashboard/withdrawal" activeclassname="activeNav">
                            <div>
                                <i><FaMoneyBill /></i>
                                <p>Withdrawal</p>
                            </div></NavLink>
                        <div>
                            <i><GoSignOut /></i>
                            <p>Sign out</p>
                        </div>
                    </Container>
                </section>
                <NavPages /></div>
        </>
    )
}

export default Dashboard