import React, { useEffect, useState } from "react";
import { AvatarGenerator } from 'random-avatar-generator';
import { Transaction } from "./components/Transaction";

import { data } from './txn';
import { useStateContext } from "./context";
import Loader from "./components/Loader";
import { tasks } from "./assets";

const generator = new AvatarGenerator();
export function Dashboard({ nightLight, txns, setTxns, setSettleTxn, overlaySelector }){
    const [ loadingTxns, setLoadingTxns ] = useState(false);
    const { address, getTransactions } = useStateContext();
    
    
    function Logs404(){
        return (
        <>
            {(address && !loadingTxns) && 
                <div className="flex items-center gap-2 px-[30px] pt-7">
                    <div className="w-[200px] rounded-full flex items-center justify-center">
                        <img src={tasks} className=" flex mx-2" alt="" />
                    </div>
                    {/* <img src={generator.generateRandomAvatar()} className="h-40 m-4" alt="" /200*/}
                    <p className="text-xl m-2">No transactions that involves U!! record a new one via "add transaction" button</p>
                </div>
            }
        </>
        )
    }
    const fetchTransaction = async ()=>{
        setLoadingTxns(true);
        const txnData = await getTransactions();
        setLoadingTxns(false);
        console.log( txnData );
        setTxns(txnData);
    }
    useEffect(()=>{
        if(address!=undefined){
            fetchTransaction();
        }
    },[address]);
    
    //cheked toggler...
    const [ all, setAll] = useState(false);

    const handleToggle = () => {
      setAll((val)=>!val);
    };
    

    return (
        <div className={`relative ${!address?'pointer-events-none opacity-30':''}`}>
            {loadingTxns?(<Loader/>):''}
            <div className={`w-[32rem] h-[85vh] ${nightLight?' border-transparent rounded-[20px] bg-[#1c1c24] text-white':'border-4 rounded'}`}>
                <div className={` px-4 flex items-center justify-between ${nightLight?'rounded-t-[20px]':'bg-slate-300'}`}>
                    <p className={`text-4xl pb-2 mb-1 text-center pt-2 `}>Dashboard</p>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <span>All</span>
                        <input type="checkbox" checked={all} onChange={handleToggle} className="hidden" />
                        <span className="w-12 h-6 flex items-center p-1 bg-white rounded-full shadow-inner relative">
                            <span
                            className={`w-5 h-5 rounded-full absolute transition-transform transform ${
                                all ? 'translate-x-full bg-blue-pink' : 'translate-x-0 bg-gray-300'
                            }`}
                            ></span>
                        </span>
                    </label>
                </div>
                <div className="h-[calc(100%-4.3rem)] scroll-smooth scrollbar overflow-y-auto pr-0">
                    {txns ? txns.map((item,i)=><Transaction key={i} txn={item} nightLight={nightLight} setSettleTxn={setSettleTxn} overlaySelector={overlaySelector} all={all}/>): <Logs404/>}
                </div>
            </div>
        </div>
    )
}