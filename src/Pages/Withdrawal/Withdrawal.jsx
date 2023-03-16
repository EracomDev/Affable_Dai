import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Change from '../../Common/StringToSub'
import Loader from '../../Components/Loader'
import TopNav from '../../Components/TopNav'
import "./Withdrawal.css"

const Withdrawal = () => {

    const [loading, setLoading] = useState(true);
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const tx_url = useSelector((state) => state.baseInfo.value.tx_URL);
    var scount = 1;
    const [msg, setMsg] = useState("");
    const [acc, setAccount] = useState(localStorage.getItem("viewId"));
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        fatch_Details();
    }, [])


    let topic_string_len;

    async function fatch_Details() {
        if (scount === 1) {
            scount++;
            try {
                const { ethereum } = window;
                if (ethereum) {
                    const newaddr = acc.slice(2, 42);
                    const filter_addr = "0x000000000000000000000000" + newaddr;
                    const furl = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=99999999&address=${contract}&topic1=${filter_addr}&topic0=0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65&apikey=GUDHKYKQGXP68DVNEBSQ9MNW3RZBSGZ1JT`;

                    var res = await axios.get(furl);
                    //console.log("furl", res.data.result.length)
                    if (res.data.result.length === 0) {
                        setMsg('No data to show')
                    } else {
                        setMsg('');
                    }
                    for (let s = 0; s < res.data.result.length; s++) {
                        var hashs = res.data.result[s].transactionHash;
                        var amnt = parseFloat(res.data.result[s].topics[2] / 1e18);
                        // if (res.data.result[s].data.length > 66) {
                        //     var amnt = parseFloat(res.data.result[s].data.slice(0, 66) / 1e18);
                        // } else {
                        //     var amnt = parseFloat(res.data.result[s].data);
                        // }
                        //console.log(amnt)
                        const withData = { amount: amnt, tx_hash: hashs }
                        setWithdrawals((old) => [
                            ...old, withData
                        ])

                    }
                }
                setLoading(false);
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

                    <section className="withdrawalSection">
                        <h1 className="heading">
                            Withdrawal
                        </h1>
                    </section>
                    <div className="staticTable">
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Amount</th>
                                <th>Transaction Hash</th>
                            </tr>
                            {withdrawals.map((x, i) =>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{x.amount}</td>
                                    <td><a className="link_color" target="_blank" href={`${tx_url}/tx/${x.tx_hash}`}>{
                                        Change(x.tx_hash)
                                    }</a></td>
                                </tr>
                            )}

                        </table>
                        <p style={{ color: "grey", textAlign: "center", marginTop: "50px" }}>{msg}</p>
                    </div>
                </Container>

            </div>
        </>
    )
}

export default Withdrawal