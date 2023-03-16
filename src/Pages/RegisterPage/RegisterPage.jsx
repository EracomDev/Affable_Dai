import React, { useEffect, useState } from 'react'
import "./RegisterPage.css"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom';
import Logo from "./../../Images/logo.png"
import ConnectButton from '../../Components/ConnectButton';
import { useNavigate } from "react-router-dom"
import { ethers } from 'ethers';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../Components/Loader';
const RegisterPage = () => {
    const navigate = useNavigate();
    const [spons, setSponsor] = useState("");
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const BUSD = useSelector((state) => state.contract.value.BUSD);
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const BUSD_ABI = useSelector((state) => state.contract.value.BUSD_ABI);
    const [loading, setLoading] = useState(false);


    async function increaseAllowance() {
        setLoading(true);
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const busdInstance = new ethers.Contract(BUSD, BUSD_ABI, signer);
                console.log("Instance : " + busdInstance);

                let inc = await busdInstance.increaseAllowance(contract, '100000000000000000000', { value: ethers.utils.parseEther('0') });

                await inc.wait();

                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                localStorage.setItem("viewId", accounts[0]);
                localStorage.setItem("loginBy", 'automatic');

                register();
                console.log("Tr Hash : " + inc.hash);
            }
        } catch (error) {
            setMsg("Error : " + error);
        }
    }


    async function register() {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractinstance = new ethers.Contract(contract, contractABI, signer);
                console.log("Instance : " + contractinstance);
                let inc = await contractinstance.register(spons, { value: ethers.utils.parseEther('0') });

                await inc.wait();
                console.log("Tr Hash : " + inc.hash);

                setMsg("Register Success.");
                navigate("/dashboard");
                setLoading(true);
            }
        } catch (error) {
            setMsg("something went wrong");
        }

    }

    const [msg, setMsg] = useState("");


    return (
        <>
            {
                loading === true ? <Loader /> : ''
            }
            <div className="connectRegisterLeft">
                <input type="text" placeholder="Enter Sponsor ID." onChange={(e) => setSponsor(e.target.value)} id="sponsor" />
                <div className="registerButtons">
                    <button className="viewing bgOrange" onClick={increaseAllowance}>Register</button>
                </div>
            </div>
        </>
    )
}

export default RegisterPage