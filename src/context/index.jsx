import React,{useContext, createContext, useEffect, useState} from "react";
import { useAddress, useContract, useMetamask, useContractRead } from '@thirdweb-dev/react'; 
import { ethers } from "ethers";
import { ABI } from "../constants";

const StateContext = createContext();
export const StateContextProvider = ({children})=>{    
    const address = useAddress();
    const connect = useMetamask();
    const { contract ,isLoading, error} = useContract("0xAE7c31d312DFe3928813b4F4888388CF74e1B56D",ABI);
    
    //toggeling the lights....
    const getFriends = async (address)=>{
        const data = await contract.call("viewFriendship", [address]);
        if(data.length == 0){return null}

        return data;
    }
    //creating a new friend....
    const addNewFriend = async (_name,_address,_myName,_myAddress)=>{
        console.log();
        const data = await contract.call("addFriend", [_address, _name, _myAddress, _myName]);
        return data;
    }
    //fetching txns...
    const getTransactions = async()=>{
        const txns = await contract.call("viewPayment", []);
        return txns;
    }
    //adding trxn
    const addtransactionToChain = async(_payer,_splitFor,_amount,_message)=>{
        const data = await contract.call("addPayment", [_payer, _splitFor, _amount, _message]);
        console.log(data);
        return null;
    }
    //settling txn 
    const settleTreansaction = async (_idBN,_amountBN)=>{
        const data = await contract.call(
            "settel",
            [_idBN],
            {
                value: _amountBN,
            }
        );
        console.log(data);
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                getFriends,
                addNewFriend,
                getTransactions,
                addtransactionToChain,
                settleTreansaction
                
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ()=> useContext(StateContext);