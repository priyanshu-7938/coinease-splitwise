import React from "react";
import { AvatarGenerator } from 'random-avatar-generator';
import { useStateContext } from "../context";
import { paid, wait } from "../assets";

const generator = new AvatarGenerator();

export function Transaction({ txn, nightLight, setSettleTxn, overlaySelector, all }){
    const { address } = useStateContext();
    const initSettling = ()=>{
        setSettleTxn(txn);
        overlaySelector(2);
    }
    return (
        <>
        {txn.from === address && (all || !txn.settled)  &&
            <div className={`flex flex-col m-1 pb-2 rounded justify-between p-1 px-3 gap-2 ${nightLight?'border-transparent bg-[#131318]':'border-2'} ${txn.settled?'pointer-events-none opacity-30':''}`}>
                <div className="flex gap-2 items-center p-1" >
                    <img className="w-7" src={generator.generateRandomAvatar(txn.from)} alt="" />
                    <div className="flex flex-col">
                        <p className="text-[20px]">You</p>
                        <div className="w-full h-[2px] bg-blue-pink-3"></div>
                    </div>
                    <p className="text-xs">owe</p>
                    <img className="w-7" src={generator.generateRandomAvatar(txn.to)} alt="" />
                    <div className="flex flex-col max-w-[80px]">
                        <p className="text-[20px] truncate">{txn.to} </p>
                        <div className="w-full h-[2px] bg-blue-pink-3"></div>
                    </div>
                </div>
                <div className="flex h-[18px] gap-1 items-center mt-1">
                    <div className="bg-blue-pink-3 w-[2px] h-[100%]"></div>
                    <p className="text-xs">For </p>
                    <p className={`text-xs w-full px-2 py-1 rounded truncate ${nightLight?'bg-[#121234]':'bg-[rgb(203,213,225)]'}`}>{txn.message? txn.message:''}</p>
                </div>
                <div className="flex h-[18px] gap-1 items-center mt-1">
                    <div className="bg-blue-pink-3 w-[2px] h-[100%]"></div>
                    <p className="text-xs">Id</p>
                    <p className={`text-xs w-full px-2 py-1 rounded truncate text-gray-500 ${nightLight?'bg-[#121234]':'bg-[rgb(203,213,225)]'}`}>{txn.id._hex}</p>
                </div> 
                <div className="flex gap-1 items-center justify-between mt-1">
                    <div className="flex h-[34px] gap-1 items-center">
                        <div className="bg-blue-pink-3 w-[2px] h-[100%]"></div>
                        <p className="text-xl">Amount</p>
                        <div className="flex flex-col">
                            <p className={` w-full px-2 rounded  text-[18px] text-[#C822FF] font-bold`}>{parseFloat(txn.amount.toString())/1e18} Sepolia ETH</p>
                            <span className="text-[8px] px-2 py-0 text-gray-500">{txn.amount.toString()} Wei</span>
                        </div>
                    </div>
                    <button className={`w-24 rounded h-7 flex items-center justify-center gap-1 ${txn.settled?'bg-[#121234]':' bg-blue-pink-3'}`} onClick={()=>{initSettling()}}>{txn.settled? <>Settled <img src={paid} className="w-[20px]" alt="" /></>: <>Settle</> }</button>
                </div>
            </div>
        }
        {txn.from !== address && (all || !txn.settled) &&
            <div className={`flex flex-col m-1 pb-2 rounded justify-between p-1 px-3 gap-2 ${nightLight?'border-transparent bg-[#131318]':'border-2'}`}>
                <div className="flex gap-2 items-center p-1" >
                    <img className="w-7" src={generator.generateRandomAvatar(txn.to)} alt="" />
                    <div className="flex flex-col max-w-[30%]">
                        <p className="text-[20px] truncate">{txn.to}</p>
                        <div className="w-full h-[2px] bg-blue-pink-3"></div>
                    </div>
                    <p className="text-xs">owe</p>
                    <img className="w-7" src={generator.generateRandomAvatar(txn.from)} alt="" />
                    <div className="flex flex-col">
                        <p className="text-[20px]">You</p>
                        <div className="w-full h-[2px] bg-blue-pink-3"></div>
                    </div>
                </div>
                <div className="flex h-[18px] gap-1 items-center mt-1">
                    <div className="bg-blue-pink-3 w-[2px] h-[100%]"></div>
                    <p className="text-xs">For </p>
                    <p className={`text-xs w-full px-2 py-1 rounded truncate ${nightLight?'bg-[#121234]':'bg-[rgb(203,213,225)]'}`}>{txn.message? txn.message:''}</p>
                </div>
                <div className="flex gap-1 items-center justify-between mt-1">
                    <div className="flex h-[34px] gap-1 items-center">
                        <div className="bg-blue-pink-3 w-[2px] h-[100%]"></div>
                        <p className="text-xl">Amount</p>
                        <div className="flex flex-col">
                            <p className={` w-full px-2 rounded  text-[18px] text-[#1A6DFF] font-bold`}>{parseFloat(txn.amount.toString())/1e18} Sepolia ETH</p>
                            <span className="text-[8px] px-2 py-0 text-gray-500">{txn.amount.toString()} Wei</span>
                        </div>
                    </div>
                    {txn.settled ? (
                        <div className={`flex items-center gap-1 rounded p-1 ${nightLight?'bg-[#121234]':'bg-gray-300'}`}>
                            <p className="font-epilogue px-2">Paid Off</p>
                            <img src={paid} className="w-[25px]" alt="wait" />
                        </div>
                    ):(
                        <div className={`flex items-center gap-1 rounded p-1 ${nightLight?'bg-[#121234]':'bg-gray-300'}`}>
                            <p className="rounded font-epilogue px-2 bg-blue-pink-3 text-gray-400" >Yet to be Transit</p>
                            <img src={wait} className="w-[25px]" alt="wait" />
                        </div>
                    )}
                </div>
            </div>
        }
        </>
    )
}