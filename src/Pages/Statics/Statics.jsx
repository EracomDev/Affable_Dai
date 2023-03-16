import React, { useEffect, useState } from 'react'
import TopNav from '../../Components/TopNav'
import "./Statics.css"
import { RiSearchLine } from "react-icons/ri"
import { Container } from 'react-bootstrap'
import Loader from '../../Components/Loader'
import { useSelector } from 'react-redux'
import { BigNumber, ethers } from 'ethers';
import axios from 'axios'
import UserInfo from '../../Common/UserInfo'
import { Link } from 'react-router-dom'
import Change from '../../Common/StringToSub'
import BaseInfo from '../../Redux/BaseInfo'
//import Web3 from 'web3';


const Statics = () => {


    //const web3 = new Web3(window.ethereum);

    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const tx_url = useSelector((state) => state.baseInfo.value.tx_URL);




    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [statics, setStatics] = useState([]);
    const [acc, setAccount] = useState(localStorage.getItem("viewId"));
    var scount = 1;

    const s_type = {
        "0xdd007bd789f73e08c2714644c55b11c7d202931d717def434e3c9caa12a9f583": "Register",
        "0xb72bd9169e5731cecf365f3aced3ec60a622c3d382d245b60556ef9bd2e43583": 'Global',
        "0x57236a3eed511c3dce74b822cb0d0cf511dc600ee07bf74e5037634c30363641": 'Generation',
        "0xe432c643fb12d35b7dcbe704790e43e0757b2643cf84b6fba668315a87340f88": 'Direct',
        "0x00f2f7c15cbe06c8d94597cd91fd7f3369eae842359235712def5584f8d270cd": 'Upgrade',
        "0x5bf5ae2a123e2a979bf55603b4517e3351770c1676311bf75faa9a287d114f48": 'Withdrawal',
        "0x6a3eb71b686ed84d8e43dd4eaf9a31c226059e18f3dc2bda83209c59f7981ece": 'Direct Joining',
    }
    const s_from_type = {

        'Direct Joining': "0x6a3eb71b686ed84d8e43dd4eaf9a31c226059e18f3dc2bda83209c59f7981ece",
        'Withdrawal': "0x5bf5ae2a123e2a979bf55603b4517e3351770c1676311bf75faa9a287d114f48",
        'Upgrade': "0x00f2f7c15cbe06c8d94597cd91fd7f3369eae842359235712def5584f8d270cd",
        'Register': "0xdd007bd789f73e08c2714644c55b11c7d202931d717def434e3c9caa12a9f583",
        'Global': "0xb72bd9169e5731cecf365f3aced3ec60a622c3d382d245b60556ef9bd2e43583",
        'Generation': "0x57236a3eed511c3dce74b822cb0d0cf511dc600ee07bf74e5037634c30363641",
        'Direct': "0xe432c643fb12d35b7dcbe704790e43e0757b2643cf84b6fba668315a87340f88"
    }

    useEffect(() => {
        fatch_Details();
        // checkWalletIsConnected();
        // connectWalletHandler();

    }, [])

    let topic_string_len;

    async function fatch_Details() {
        setLoading(true);
        if (scount === 1) {

            scount++;
            // alert(acc);
            try {
                const { ethereum } = window;
                if (ethereum) {

                    const newaddr = acc.slice(2, 42);
                    const filter_addr = "0x000000000000000000000000" + newaddr;

                    var fil = search !== '' ? `&topic3=${s_from_type[search]}` : '';
                    setStatics([])


                    const furl = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=99999999&address=${contract}&topic1=${filter_addr}&topic0=0xa6d58610286de28d44349ca4447f146409db164b31670aca857080a02b810290${fil}&apikey=GUDHKYKQGXP68DVNEBSQ9MNW3RZBSGZ1JT`;

                    //const furl = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=99999999&address=${contract}&topic1=${filter_addr}&topic0=0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65&apikey=GUDHKYKQGXP68DVNEBSQ9MNW3RZBSGZ1JT`;

                    var res = await axios.get(furl);
                    console.log('res', res);

                    for (let s = 0; s < res.data.result.length; s++) {

                        var hashs = res.data.result[s].transactionHash;
                        var fromuser = "0x" + (res.data.result[s].topics[2].slice(26, 66));

                        topic_string_len = res.data.result[s].data.length;

                        var level = parseInt(res.data.result[s].data.slice(66, topic_string_len) / 1e18);
                        var amnt = parseFloat(res.data.result[s].data.slice(0, 66) / 1e18);

                        var t_type = s_type[res.data.result[s].topics[3]];

                        var usr = await UserInfo(fromuser, contract, contractABI, 'userinfo');
                        const statdata = { user: usr.userInfo.id, level: level, amount: amnt, tx_hash: hashs, tx_type: t_type }
                        setStatics((old) => [
                            ...old, statdata
                        ])


                    }

                    setLoading(false);
                }
            } catch (error) {
                setMsg("something went wrong");
                setLoading(false);
            }
        }
    }

    return (
        <>

            {
                loading === true ? <Loader /> : ''
            }
            <div className='dashboardDiv'>
                <TopNav />
                <Container>

                    <div id="staticSearchDiv">
                        <h1 className="heading">STATICS</h1>
                        <div>
                            <input type="text" placeholder='Write here' onChange={(e) => setSearch(e.target.value)} value={search} />
                            <i onClick={fatch_Details}><RiSearchLine /></i>
                        </div>
                    </div>
                    <div className="staticTable">
                        <table>

                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Level</th>
                                <th>Program</th>
                                <th>DAI</th>
                                <th>Hash</th>

                            </tr>

                            {statics.map((x, i) =>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{parseInt(x.user)}</td>
                                    <td>{x.level}</td>

                                    <td>{x.tx_type}</td>
                                    <td>{x.amount}</td>
                                    <td><a className="link_color" target="_blank" href={`${tx_url}/tx/${x.tx_hash}`}>{
                                        Change(x.tx_hash)
                                    }</a></td>

                                </tr>
                            )}
                        </table>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Statics