import React, { useEffect, useState } from 'react'
import "./DashboardPage.css"
import { Col, Container, Row } from 'react-bootstrap'
import bg1 from "./../../Images/bg1.png"
import bg2 from "./../../Images/bg2.png"
import bg3 from "./../../Images/bg3.png"
import bgg1 from "./../../Images/bgg4.png"
import bgg2 from "./../../Images/bgg1.png"
import bgg3 from "./../../Images/bgg3.png"
import bgg4 from "./../../Images/bgg5.png"
import bgg5 from "./../../Images/bgg2.png"
import bgg6 from "./../../Images/bgg6.png"
import bg4 from "./../../Images/bg4.png"
import bg5 from "./../../Images/bg5.png"
import bg6 from "./../../Images/bg6.png"
import bg7 from "./../../Images/bg7.png"
import bgborder from "./../../Images/bgborder.png"
import bgrotate from "./../../Images/bgrotate.png"
import TopNav from '../../Components/TopNav';
import { BigNumber, ethers } from 'ethers';
import { useSelector, useDispatch } from 'react-redux'
import Change from '../../Common/StringToSub'
import CopyToClipboard from '../../Common/CopyToClipboard'
import { IoCopyOutline } from 'react-icons/io5'
import UserInfo from '../../Common/UserInfo'
import GetBalance from '../../Common/GetBalance'
import Loader from '../../Components/Loader'
import GenTeam from '../../Common/GenTeam'
import CompanyInvest from '../../Common/CompanyInvest'
import { Link, useNavigate } from 'react-router-dom'

const DashboardPage = () => {

    const navigate = useNavigate();
    function GlobalComm(num) {
        localStorage.setItem('globalId', num);
        navigate("global_community");
    }
    const [loading, setLoading] = useState(true);
    const pkgs = ['20e18', '50e18', '100e18', '200e18', '500e18', '1000e18', '2000e18', '5000e18'];
    const [msg, setMsg] = useState("");
    const [acc, setAccount] = useState(localStorage.getItem("viewId"));
    const [total_users, setTotalUsers] = useState("");
    const [userId, setuserId] = useState("");
    const [totalMatic, setTotalMatic] = useState("");
    const [pkgId, setPkgId] = useState("");
    const [ttl, setTtl] = useState(0);
    const [rankStatus, setRankStatus] = useState([]);
    const [levelTeam, setLevelTeam] = useState([]);
    const [globalTeam, setGlobalTeam] = useState([]);
    const [company_invest, setCompany] = useState([]);
    var cntr = 0;
    const [userArray, setUserArray] = useState({
        id: '',
        sponsor: '',
        directs: '',
        pkg_id: '',
        maxDeposit: '',
        teamNum: '',
        balance: '',
        dolphin: '',
        shark: '',
        whale: '',
        hamback: '',
        matic: '',
        maticPool: '',
    });
    const [oldIncomeArray, setOldIncomeArray] = useState({
        global: '',
        direct: '',
        generation: '',
        dolphin: '',
        shark: '',
        whale: '',
        hamback: '',
        maticPool: '',
    });
    const [pendingIncomeArray, setPendingIncomeArray] = useState({
        global: '',
        direct: '',
        generation: '',
        dolphin: '',
        shark: '',
        whale: '',
        hamback: '',
        maticPool: '',
    });

    const notreg = "Not Registered";
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const BUSD = useSelector((state) => state.contract.value.BUSD);
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    const BUSD_ABI = useSelector((state) => state.contract.value.BUSD_ABI);
    useEffect(() => {
        fatch_Details();
        // checkWalletIsConnected();
        // connectWalletHandler();


    }, [])


    async function update(pkgidd) {
        setLoading(true);
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const busdInstance = new ethers.Contract(BUSD, BUSD_ABI, signer);
                console.log("Instance : " + busdInstance);

                let inc = await busdInstance.increaseAllowance(contract, parseInt(pkgs[pkgidd]), { value: ethers.utils.parseEther('0') });

                await inc.wait();
                register(pkgidd);
                console.log("Tr Hash : " + inc.hash);
            }
        } catch (error) {
            setMsg("something went wrong");
            setMsg("something went wrong");
            //setLoading(false);
        }
    }
    async function register(pkgidd) {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractinstance = new ethers.Contract(contract, contractABI, signer);
                console.log("Instance : " + contractinstance);
                //let inc = await contractinstance.upgrade(pkgidd, { value: ethers.utils.parseEther('0') });
                let inc = await contractinstance.upgrade(pkgidd, { value: ethers.utils.parseEther('0') });
                await inc.wait();
                console.log("Tr Hash : " + inc.hash);

                const userInfo = await UserInfo(acc, contract, contractABI);
                setPkgId(String(userInfo.userInfo.pkg_id));

                setMsg("Upgrade Success.");
                //navigate("/dashboard");
                setLoading(false);
            }
        } catch (error) {

            setMsg("Error : " + error);
            setLoading(false);
        }
    }

    async function withdraw() {
        setLoading(true);
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractinstance = new ethers.Contract(contract, contractABI, signer);
                console.log("Instance : " + contractinstance);
                //let inc = await contractinstance.upgrade(pkgidd, { value: ethers.utils.parseEther('0') });
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                let inc = await contractinstance.withdraw({ from: accounts[0], value: ethers.utils.parseEther('0') });
                await inc.wait();
                setMsg("Withdrawal Success.");
                //navigate("/dashboard");
                setLoading(false);
            }
        } catch (error) {

            setMsg("Error : " + error);
            setLoading(false);
        }
    }
    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    async function fatch_Details() {
        if (cntr == 0) {
            cntr++

            // alert(acc);
            try {
                const { ethereum } = window;
                if (ethereum) {

                    const userInfo = await UserInfo(acc, contract, contractABI);
                    const PendingIncome = userInfo.incomeInfo;
                    setPendingIncomeArray(PendingIncome);
                    const inc = userInfo.total_users;
                    setTotalUsers(String(inc));
                    setuserId(String(userInfo.userInfo.id));
                    setPkgId(String(userInfo.userInfo.pkg_id));
                    setUserArray(userInfo.userInfo);
                    const oldIncomes = userInfo.EarningInfo;
                    setOldIncomeArray(oldIncomes);
                    const bl = await GetBalance(acc);
                    //console.log(bl);
                    setTotalMatic(String(bl / 1e18));
                    //console.log(pkgId);

                    let ttlin = 0;
                    ttlin += parseFloat(oldIncomes.invester / 1e18);
                    ttlin += parseFloat(oldIncomes.global / 1e18);
                    ttlin += parseFloat(oldIncomes.direct / 1e18);
                    ttlin += parseFloat(oldIncomes.generation / 1e18);
                    ttlin += parseFloat(oldIncomes.dolphin / 1e18);
                    ttlin += parseFloat(oldIncomes.shark / 1e18);
                    ttlin += parseFloat(oldIncomes.whale / 1e18);
                    ttlin += parseFloat(oldIncomes.hamback / 1e18);
                    ttlin += parseFloat(oldIncomes.maticPool / 1e18);

                    setTtl(ttlin);

                    const invester_p = await CompanyInvest(contract, contractABI);
                    console.log(invester_p);
                    setCompany(invester_p);
                    const rnk = [userInfo.userInfo.invester, userInfo.userInfo.dolphin, userInfo.userInfo.shark, userInfo.userInfo.whale, userInfo.userInfo.hamback, userInfo.userInfo.maticPool];
                    setRankStatus(rnk);
                    setLoading(false);
                    const grntm = await GenTeam(acc, contract, contractABI);
                    localStorage.setItem('myteam', JSON.stringify(grntm));
                    //console.log(grntm);
                    setLevelTeam(grntm.level_team_count);
                    setGlobalTeam(grntm.global_team_count);


                }
            } catch (error) {
                setMsg("Error : " + error);
            }
        }
    }

    const pkgImgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];
    const rewardImgs = [bgg1, bgg2, bgg3, bgg4, bgg5, bgg6];



    return (
        <>
            {
                loading === true ? <Loader /> : ''
            }

            <h1 id="SuccessMsg">Success</h1>
            <div className='dashboardDiv'>
                <TopNav />
                <Container>
                    <Row className='align-items-center'>
                        <Col lg="12">
                            <div id='aboutNameValue'>
                                <div>
                                    <h5>User id:</h5>
                                    <p> {userId != 0 ? String(userArray?.id) : notreg}</p>
                                </div>
                                {/* <div>
                                    <h5>Total user:</h5>
                                    <p>{total_users}</p>
                                </div> */}
                                <div>
                                    <h5>Reff link:</h5>
                                    <p className="d-none" id="refLink">{userId != 0 ? window.location.origin + '?ref=' + acc : notreg}</p>
                                    <p>{userId != 0 ? Change(window.location.origin + '?ref=' + acc) : notreg} <i className="copyTextIcon" onClick={() => CopyToClipboard("refLink")} s ><IoCopyOutline /></i></p>
                                </div><div>
                                    <h5>Upline id :</h5>
                                    <p className="d-none" id="uplineId">{userArray?.sponsor}</p>
                                    <p>{userId != 0 ? Change(userArray?.sponsor) : notreg}<i className="copyTextIcon" onClick={() => CopyToClipboard("uplineId")} s ><IoCopyOutline /></i></p>
                                </div>
                                <div>
                                    <h5>Total Matic :</h5>
                                    <p>{totalMatic}</p>
                                </div>
                                <div>
                                    <h5>Wallet:</h5>
                                    <p>{userId != 0 ? String(userArray?.balance / 1e18) : notreg}</p>
                                </div>

                            </div>
                        </Col>
                        <Col lg="12">
                            <Row className='imgDiv'>
                                <h1>AFFABLE PACKAGES</h1>
                                {pkgImgs.map((item, ind) => {
                                    return (
                                        <Col lg="3" xs="3">

                                            <img src={item} alt="logo.png"></img>
                                            {
                                                pkgId >= ind ?
                                                    <button className="btnBuy btnBgGreen" >Active</button> :
                                                    (parseInt(pkgId) + 1) == (ind) ?
                                                        <button className="btnBuy" onClick={() => update(ind)}>Buy</button>
                                                        :
                                                        <button className="btnBuy btnBgRed">Buy</button>
                                            }
                                        </Col>
                                    )
                                })
                                }
                                <Col lg="3" xs="3" >
                                    <div id="imgRotateDiv">
                                        <img id="bgborder" src={bgborder} alt="logo.png" />
                                        <img id="bgrotate" src={bgrotate} alt="logo.png" />
                                    </div>
                                    {
                                        pkgId >= 7 ? <button className="btnBuy btnBgGreen">Active</button> :
                                            <button className="btnBuy" onClick={() => update(7)}>Buy</button>
                                    }

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <section className='maticStatus'>
                        <Row className='align-items-center' style={{ padding: "7    0px 0" }}>
                            <Col lg="6"><section className="affablePool">
                                <Row>
                                    <h1 className='heading'>AFFABLE POOL</h1>
                                    {rewardImgs.map((item, ind) => {
                                        return (
                                            <Col xs="4">
                                                <img src={item} alt="" />
                                                {/* <p className='qualifiedDate'>{rankStatus[ind] ? 'Active' : 'Inactive'}<br />{company_invest[ind]}/{company_invest[ind + 6]}</p> */}
                                                <p className='qualifiedDate'>{rankStatus[ind] ? 'Active' : 'Inactive'}</p>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </section></Col>
                            <Col lg="6" className='px-2'>
                                <div id="maticStatusTableCol">
                                    <table className='maticStatusTable'>
                                        <tr>
                                            <th>DAI Status</th>
                                            <th>Earned</th>
                                            <th>Pending</th>
                                        </tr>
                                        <tr>
                                            <td>Direct Sponser</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.direct / 1e18) : 0}</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.direct / 1e18) : 0}</td>
                                        </tr>
                                        <tr>
                                            <td>Duel Line Global</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.global / 1e18) : 0}</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.global / 1e18) : 0}</td>

                                        </tr>
                                        <tr>
                                            <td>Partner Level</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.generation / 1e18) : 0}</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.generation / 1e18) : 0}</td>

                                        </tr>
                                        <tr>
                                            <td>Investor Pool</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.invester / 1e18) : 0}</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.invester / 1e18) : 0}</td>

                                        </tr>
                                        <tr>
                                            <td>Affable Dolphin</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.dolphin / 1e18) : 0}</td>

                                            <td>{userId != 0 ? String(pendingIncomeArray?.dolphin / 1e18) : 0}</td>

                                        </tr>
                                        <tr>
                                            <td>Affable Shark</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.shark / 1e18) : 0}	</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.shark / 1e18) : 0}	</td>

                                        </tr>
                                        <tr>
                                            <td>Affable Whale</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.whale / 1e18) : 0}	</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.whale / 1e18) : 0}	</td>

                                        </tr>
                                        <tr>
                                            <td>Affable Humpback</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.hamback / 1e18) : 0}</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.hamback / 1e18) : 0}</td>

                                        </tr>
                                        <tr>
                                            <td>Affable DAI</td>
                                            <td>{userId != 0 ? String(oldIncomeArray?.maticPool / 1e18) : 0}</td>
                                            <td>{userId != 0 ? String(pendingIncomeArray?.maticPool / 1e18) : 0}</td>

                                        </tr>
                                        <tr className='maticStatusTableTotal'>
                                            <td>Total</td>
                                            <td>0</td>
                                            <td>{userId != 0 ? String(userArray?.balance / 1e18) : 0}</td>
                                        </tr>
                                        <tr>
                                            <div id="">

                                            </div></tr>
                                        {/* <tr>
                                            <td>Action</td>
                                            <td>
                                                {ttl}
                                            </td>
                                            <td><button className="btnBuy" onClick={withdraw}>Withdraw</button></td>
                                        </tr> */}

                                    </table>
                                    <div id="poolTableTextAndButton">
                                        <p>Note: On each amount 50% will be in distribution and 50% to user walllet you can withdraw minimum 10 DAI</p>
                                        <button className="btnBuy" onClick={withdraw}>Withdraw</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </section>
                    <section className="communityLevelSection">
                        <Link to="global_community_table"><h1 className="heading headingWithButton">DUEL LINE GLOBAL COMMUNITY <button>View</button></h1></Link>
                    </section>
                    <section className="partnerLevelSection">
                        <h1 className="heading">PARTNER LEVEL STATUS</h1>
                        <div className='globalCommunityTable'>
                            <table>
                                <tr>
                                    <th>Level</th>
                                    <th>%</th>
                                    <th>Partner</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>8%</td>
                                    <td>{levelTeam[0]}</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>5%</td>
                                    <td>{levelTeam[1]}</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>3%</td>
                                    <td>{levelTeam[2]}</td>

                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>3%</td>
                                    <td>{levelTeam[3]}</td>

                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>5%</td>
                                    <td>{levelTeam[4]}</td>

                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>2%</td>
                                    <td>{levelTeam[5]}</td>

                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>2%</td>
                                    <td>{levelTeam[6]}</td>

                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>2%</td>
                                    <td>{levelTeam[7]}</td>

                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>2%</td>
                                    <td>{levelTeam[8]}</td>

                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>3%</td>
                                    <td>{levelTeam[8]}</td>

                                </tr>
                            </table></div>


                    </section>
                </Container>

            </div>
        </>
    )
}

export default DashboardPage