import { useSelector, useDispatch } from 'react-redux'
import { BigNumber, ethers } from 'ethers';
import React from 'react'; 


    
export default async function UserInfo (id , contract , contractABI, func = "") {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractinstance = new ethers.Contract(contract, contractABI, signer); 
    if(func==""){                      
        const userInfo = await contractinstance.userInfo(id);
        const incomeInfo = await contractinstance.incomeInfo(id);
        const EarningInfo = await contractinstance.EarningInfo(id);

        const inc = await contractinstance.total_users.call();
        //console.log("signera : " + userInfo);

        return {userInfo:userInfo,incomeInfo:incomeInfo,EarningInfo:EarningInfo,total_users:inc};
        
    }else if(func=='userinfo'){
        const userInfo = await contractinstance.userInfo(id);
        return {userInfo:userInfo};
       
    }else{
        return [];
    }
        
        
}
 