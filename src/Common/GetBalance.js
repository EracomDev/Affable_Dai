import { useSelector, useDispatch } from 'react-redux'
import { BigNumber, ethers } from 'ethers';
import React from 'react'; 


    
export default async function GetBalance (id) {
    
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const bl = await provider.getBalance(id);
    // console.log(BigNumber(bl));
    return bl;
    
    
}
 