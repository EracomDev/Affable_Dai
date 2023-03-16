import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Logo from "./../../Images/logo.png"
import { useSelector, useDispatch } from 'react-redux'
import ConnectButton from '../../Components/ConnectButton';
import { useNavigate } from "react-router-dom"
import IdToAddress from '../../Common/IdToAddress';
import Loader from '../../Components/Loader';
import UserInfo from '../../Common/UserInfo';
import RegisterPage from '../RegisterPage/RegisterPage';

const Login = () => {
    const navigate = useNavigate();
    const [viweId, setViewId] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);


    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const contractABI = useSelector((state) => state.contract.value.contractABI);

    async function viewLogin() {
        setLoading(true);
        try {
            const { ethereum } = window;
            if (ethereum) {


                const addr = await IdToAddress(viweId, contract, contractABI);
                // console.log(addr);
                if (addr !== '0x0000000000000000000000000000000000000000') {
                    //alert('find');
                    localStorage.setItem("viewId", addr);
                    localStorage.setItem("loginBy", 'view');

                    navigate("/dashboard")
                    setLoading(false);
                } else {

                    setMsg(<span className='text-danger'>Not Exists.</span>);
                    setLoading(false);
                }

                // navigate("/dashboard");
            }
        } catch (error) {
            setMsg("Error : " + error);
            setLoading(false);
        }

    }

    async function automaticLogin() {
        setLoading(true);
        try {
            const { ethereum } = window;
            if (ethereum) {
                try {
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    console.log("Found an account! Address: ", accounts[0]);

                    const userInfo = await UserInfo(accounts[0], contract, contractABI);

                    if (userInfo.userInfo.id > 0) {
                        //alert('find');
                        localStorage.setItem("viewId", accounts[0]);
                        localStorage.setItem("loginBy", 'automatic');
                        navigate("/dashboard")
                        setLoading(false);
                    } else {
                        setMsg(<span className='text-danger'>Not Exists.</span>);
                        setLoading(false);
                    }
                }
                catch (err) {
                    console.log("this is error", err);
                }

                // navigate("/dashboard");
            }
        } catch (error) {
            setMsg("something went wrong");
            setLoading(false);
        }

    }
    return (
        <>
            {
                loading === true ? <Loader /> : ''
            }

            <Container id="logoContainer">
                <img src={Logo} alt="logo.png" />
                <ConnectButton />
            </Container>
            <div className="div">

                <Container className="connectWalletContainer">
                    <Row className="connectWalletRow align-items-center">
                        <center>{msg}</center>
                        <Col md='6' className=" ">
                            <h4 className='heading'>AUTOMATIC REGISTRATION</h4>
                            <RegisterPage />
                            <p className='text-center'>Check the ID of Your inviter. <br></br>You can edit before proceed to payment.</p>
                        </Col>
                        <Col md='6' className="connectRegisterRight connectLoginRight connectRegisterLeft connectLoginLeft" >
                            <h3 className='heading'>Login to your personal account</h3>
                            <input type="text" onChange={(e) => setViewId(e.target.value)} placeholder="Enter User ID." />
                            <div className="registerButtons">
                                <button className="viewing bgOrange" onClick={viewLogin}>View</button>
                            </div>
                            <p>To access all the functions of your personal account use Auto Login:</p>
                            <Link className="loginBtn" onClick={automaticLogin}>Automatic Login</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login