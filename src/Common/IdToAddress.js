import { useSelector, useDispatch } from 'react-redux'
import { BigNumber, ethers } from 'ethers';
import React from 'react'; 


    
export default async function IdToAddress (ids , contract , contractABI) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractinstance = new ethers.Contract(contract, contractABI, signer);   
    const addr = await contractinstance.idToAddress(ids);
    return addr;   
    
}
 