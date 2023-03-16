import { createSlice } from '@reduxjs/toolkit'
import  BUSD_ABI  from '../contracts/BUSD_ABI.json';
import  contractABI  from '../contracts/contract_ABI.json';
const arr  = {contract:"0x5C3C14C19560Dc45DE9102bdD4Fbf63Edaf0B3f9",contractABI:contractABI,BUSD:"0xe37b70Ef457899F0afdFB71CEd2671CFA84ef770",BUSD_ABI:BUSD_ABI} 

export const Contract = createSlice({
  name: 'details',
  initialState: {
    value: arr,
  },
  reducers: {    
     
  },
})
 
// Action creators are generated for each case reducer function

export default Contract.reducer

