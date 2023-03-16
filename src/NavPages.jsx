import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Partners from './Pages/Partners/Partners';
import Statics from './Pages/Statics/Statics';
import Withdrawal from './Pages/Withdrawal/Withdrawal';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import GlobalCommunity from './Pages/GlobalCommunity/GlobalCommunity';
import GlobalCommunityMain from './Pages/GlobalCommunityMain/GlobalCommunityMain';
const NavPages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<DashboardPage />}></Route>
                <Route path="/partners" element={<Partners />}></Route>
                <Route path="/statics" element={<Statics />}></Route>
                <Route path="/withdrawal" element={<Withdrawal />}></Route>
                <Route path="/global_community" element={<GlobalCommunity />}></Route>
                <Route path="/global_community_table" element={<GlobalCommunityMain />}></Route>
            </Routes>
        </>
    )
}

export default NavPages