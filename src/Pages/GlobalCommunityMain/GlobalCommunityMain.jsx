import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../Components/TopNav';

const GlobalCommunityMain = () => {
    const navigate = useNavigate();
    const grntm = JSON.parse(localStorage.getItem("myteam"));
    const globalTeam = grntm.global_team_count;
    function GlobalComm(num) {
        localStorage.setItem('globalId', num);
        navigate("/dashboard/global_community");
    }

    return (
        <>
            <TopNav />
            <Container>
                <div className='globalCommunityTable mt-5'>
                    <table >
                        <tr>
                            {/* <th>Number</th> */}
                            <th>Community</th>
                            <th>DAI</th>
                        </tr>
                        <tr onClick={() => GlobalComm(0)}>
                            {/* <td>0/2</td> */}
                            <td>{globalTeam[0] !== 0 ? globalTeam[0] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(1)}>
                            {/* <td>0/4</td> */}
                            <td>{globalTeam[1] !== 0 ? globalTeam[1] : 0}</td>
                            <td>0</td>
                        </tr>

                        <tr onClick={() => GlobalComm(2)}>
                            {/* <td>0/8</td> */}
                            <td>{globalTeam[2] !== 0 ? globalTeam[2] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(3)}>
                            {/* <td>0/16</td> */}
                            <td>{globalTeam[3] !== 0 ? globalTeam[3] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(4)}>
                            {/* <td>0/32</td> */}
                            <td>{globalTeam[4] !== 0 ? globalTeam[4] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(5)}>
                            {/* <td>0/64</td> */}
                            <td>{globalTeam[5] !== 0 ? globalTeam[5] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(6)}>
                            {/* <td>0/128</td> */}
                            <td>{globalTeam[6] !== 0 ? globalTeam[6] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(7)}>
                            {/* <td>0/256</td> */}
                            <td>{globalTeam[7] !== 0 ? globalTeam[7] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(8)}>
                            {/* <td>0/512</td> */}
                            <td>{globalTeam[8] !== 0 ? globalTeam[8] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(9)}>
                            {/* <td>0/1024</td> */}
                            <td>{globalTeam[9] !== 0 ? globalTeam[9] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(10)}>
                            {/* <td>0/2048</td> */}
                            <td>{globalTeam[10] !== 0 ? globalTeam[10] : 0}</td>
                            <td>0</td>
                        </tr>
                        <tr onClick={() => GlobalComm(11)}>
                            {/* <td>0/4096</td> */}
                            <td>{globalTeam[11] !== 0 ? globalTeam[11] : 0}</td>
                            <td>0</td>
                        </tr>
                    </table>
                </div></Container>
        </>
    )
}

export default GlobalCommunityMain