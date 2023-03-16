import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { RiSearchLine } from 'react-icons/ri'
import TopNav from '../../Components/TopNav'
import "./Partners.css"
import bgg1 from "./../../Images/bgg4.png"
import bgg2 from "./../../Images/bgg1.png"
import bgg3 from "./../../Images/bgg3.png"
import bgg4 from "./../../Images/bgg5.png"
import bgg5 from "./../../Images/bgg2.png"
import bgg6 from "./../../Images/bgg6.png"
import bgborder from "./../../Images/bgborder.png"
import bgrotate from "./../../Images/bgrotate.png"
import bg1 from "./../../Images/bg1.png"
import bg2 from "./../../Images/bg2.png"
import bg3 from "./../../Images/bg3.png"
import bg4 from "./../../Images/bg4.png"
import bg5 from "./../../Images/bg5.png"
import bg6 from "./../../Images/bg6.png"
import bg7 from "./../../Images/bg7.png"
import bg8 from "./../../Images/bg8.png"
import Loader from '../../Components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import GenTeam from '../../Common/GenTeam'
import PoolTeam from '../../Common/PoolTeam'
import UserInfo from '../../Common/UserInfo'
import Web3 from 'web3'


const Partners = () => {
    const [loading, setLoading] = useState('false');
    const [acc, setAccount] = useState(localStorage.getItem("viewId"));

    const [msg, setMsg] = useState("");
    const [poolTeam, setPoolTeam] = useState({
        invester: 0,
        global: 0,
        direct: 0,
        generation: 0,
        dolphin: 0,
        shark: 0,
        whale: 0,
        hamback: 0,
        maticPool: 0,
    });
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const [lvlTeam, setLvlTeam] = useState([]);
    const [earning, setEarning] = useState([]);
    var grntm;
    var myVal = 1;
    useEffect(() => {
        grntm = JSON.parse(localStorage.getItem('myteam'));
        console.log(grntm);
        setLvlTeam([]);
        fatch_Details();
        // EarningInfo();
        // checkWalletIsConnected();
        // connectWalletHandler();
    }, [])
    async function fatch_Details() {
        if (myVal === 1) {

            myVal += 1;
            // alert(acc);
            try {
                setLoading(true)
                const { ethereum } = window;
                if (ethereum) {
                    // const grntm = await GenTeam(acc, contract, contractABI);
                    // const grntm = localStorage.getItem('myteam')
                    //setLevelTeam(grntm.total_team);
                    //const plteam = await PoolTeam(acc, contract, contractABI);
                    var info;
                    let tmcount = grntm.total_team_count;
                    for (let i = 0; i < tmcount; i++) {
                        if (grntm.level_team[i][0]) {
                            info = await UserInfo(grntm.level_team[i][0], contract, contractABI);
                            // console.log("info", info.userInfo.pkg_id);
                            setLvlTeam((old) => [
                                ...old,
                                info.userInfo
                            ]
                            )
                            setLoading(false)
                            //const earning = await UserInfo(grntm.level_team[i][0], contract, contractABI);
                            CalculateEarning(info.EarningInfo);
                        }
                    }
                    //setPoolTeam(plteam);
                }
            } catch (error) {
                setLoading(false)
                setMsg("something went wrong");
            }

        }
    }
    const CalculateEarning = (earning) => {
        //console.log("data", earning);
        var sum = 0;
        sum += parseFloat(earning[0]);
        sum += parseFloat(earning[1]);
        sum += parseFloat(earning[2]);
        sum += parseFloat(earning[3]);
        sum += parseFloat(earning[4]);
        sum += parseFloat(earning[5]);
        sum += parseFloat(earning[6]);
        sum += parseFloat(earning[7]);
        sum += parseFloat(earning[8]);
        //console.log("sum", sum)
        setEarning((old) => [
            ...old,
            sum
        ])
    }
    const pkgImgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];
    return (
        <>  {
            loading === true ? <Loader /> : ''
        }
            <div className='dashboardDiv'>
                <TopNav />
                <Container>
                    <div id="staticSearchDiv">
                        <h1 className="heading">PARTNERS</h1>
                        {/* <div>
                            <input type="text" placeholder='Write here' />
                            <i><RiSearchLine /></i>
                        </div> */}
                    </div>
                    <Row id="partnersImgs" className='align-items-center'>

                        <Col lg="12" id="partnersPackageImgs">
                            <Row>
                                <Col lg="2" xs="4">
                                    <img src={bgg1} alt="img.png" />
                                    <p>{PoolTeam?.invester ? PoolTeam?.invester : 0}</p>
                                </Col>
                                <Col lg="2" xs="4">
                                    <img src={bgg2} alt="img.png" />
                                    <p>{PoolTeam?.dolphin ? PoolTeam?.dolphin : 0}</p>
                                </Col>
                                <Col lg="2" xs="4">
                                    <img src={bgg3} alt="img.png" />
                                    <p>{PoolTeam?.shark ? PoolTeam?.shark : 0}</p>
                                </Col>
                                <Col lg="2" xs="4">
                                    <img src={bgg4} alt="img.png" />
                                    <p>{PoolTeam?.whale ? PoolTeam?.whale : 0}</p>
                                </Col>
                                <Col lg="2" xs="4">
                                    <img src={bgg5} alt="img.png" />
                                    <p>{PoolTeam?.hamback ? PoolTeam?.hamback : 0}</p>
                                </Col>
                                <Col lg="2" xs="4">
                                    <img src={bgg6} alt="img.png" />
                                    <p>{PoolTeam?.maticPool ? PoolTeam?.maticPool : 0}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="staticTable">
                        <table>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Active Package</th>
                                <th>Dai</th>
                            </tr>

                            {
                                lvlTeam.map((item, ind) => {
                                    return (
                                        <tr>
                                            <td>{parseInt(ind) + 1}</td>
                                            <td>{String(item[0])}</td>
                                            <td id="tdImg">
                                                <img src={pkgImgs[String(item.pkg_id)]} alt="" />
                                            </td>
                                            <td>{earning[ind] / 1e18}</td>
                                        </tr>
                                    )
                                })
                            }

                        </table>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Partners