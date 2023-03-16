import { useSelector, useDispatch } from 'react-redux'
import { BigNumber, ethers } from 'ethers';
import React from 'react'; 


    
export default async function CompanyInvest (contract , contractABI) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractinstance = new ethers.Contract(contract, contractABI, signer);   
    const invester_payout = await contractinstance.invester_payout.call();
    const dolphin_payout = await contractinstance.dolphin_payout.call();
    const shark_payout = await contractinstance.shark_payout.call();
    const whale_payout = await contractinstance.whale_payout.call();
    const hamback_payout = await contractinstance.hamback_payout.call();
    const maticPool_payout = await contractinstance.maticPool_payout.call();
    const invester = await contractinstance.getInvesterCount();
    const dolphin = await contractinstance.getDolphinCount();
    const shark = await contractinstance.getSharkCount();
    const whale = await contractinstance.getWhaleCount();
    const hamback = await contractinstance.getHambackCount();
    const maticPool = await contractinstance.getMaticPoolCount();

    console.log(`invester${invester.length}`);
    return [
        parseFloat(invester_payout/1e18),
        parseFloat(dolphin_payout/1e18),
        parseFloat(shark_payout/1e18),
        parseFloat(whale_payout/1e18),
        parseFloat(hamback_payout/1e18),
        parseFloat(maticPool_payout/1e18),
        parseFloat(invester),
        parseFloat(dolphin),
        parseFloat(shark),
        parseFloat(whale),
        parseFloat(hamback),
        parseFloat(maticPool),
        ];   
    
}
 