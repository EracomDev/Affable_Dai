import { id } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import GenTeam from '../../Common/GenTeam';
import IdToAddress from '../../Common/IdToAddress';
import UserInfo from '../../Common/UserInfo';
import Loader from '../../Components/Loader';
import TopNav from '../../Components/TopNav'

const GlobalCommunity = () => {
    var myVal = 1;
    const [acc, setAccount] = useState(localStorage.getItem("viewId"));
    const [GlobalId, SetGlobalId] = useState(localStorage.getItem("globalId"));
    const contract = useSelector((state) => state.contract.value.contract);//"0xe41C82120c8363a118A700718858A406aca63598";
    const contractABI = useSelector((state) => state.contract.value.contractABI);
    // const GlobalId = useSelector((state) => state.globalId.value);
    const [earning, setEarning] = useState([]);
    const [glbTeam, setGlbTeam] = useState([]);
    const [loading, setLoading] = useState('false');
    // var grntm;
    useEffect(() => {
        // grntm = JSON.parse(localStorage.getItem('myteam'));
        fatch_Details();
        console.log("GlobalId", GlobalId)
    }, [])



    async function fatch_Details() {
        if (myVal === 1) {
            myVal += 1;
            setLoading(true)
            try {
                // setLoading(true)
                const { ethereum } = window;
                if (ethereum) {
                    const grntm = await GenTeam(acc, contract, contractABI);
                    // const grntm = localStorage.getItem('myteam');
                    // console.log("data here", grntm)
                    console.log("data here new", localStorage.getItem('globalId'));
                    // console.log("data here", grntm.global_team[GlobalId]);

                    var info;
                    var id;
                    for (let i = 0; i < grntm.global_team[GlobalId].length; i++) {
                        if (grntm.global_team[GlobalId]) {
                            id = String(grntm.global_team[GlobalId][i]);
                            console.log("fefjfjpos", id);
                            var add = await IdToAddress(id, contract, contractABI);
                            console.log("add", add);
                            info = await UserInfo(add, contract, contractABI);
                            console.log("info", info.EarningInfo);
                            let DaiSum = CalculateEarning(info.EarningInfo);
                            DaiSum = DaiSum / 1e18;
                            const rnk = {
                                glbId: id,
                                glbSum: DaiSum
                            }
                            setGlbTeam((old) => [
                                ...old,
                                rnk
                            ])
                        }
                    }
                    setLoading(false)
                }
            } catch (error) {
                // setMsg("something went wrong");
                setLoading(false)
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
        return sum;
    }
    return (
        <>
            {
                loading === true ? <Loader /> : ''
            }
            <div className='dashboardDiv'>
                <TopNav />
                <Container>
                    <h1 className="heading">Global Community</h1>
                    <div className="staticTable">
                        <table>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>DAI</th>
                                <th>Level</th>
                            </tr>
                            {console.log(glbTeam)}
                            {
                                glbTeam.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.glbId}</td>
                                            <td>{item.glbSum}</td>
                                            <td>{parseInt(GlobalId + 1)}</td>
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

export default GlobalCommunity