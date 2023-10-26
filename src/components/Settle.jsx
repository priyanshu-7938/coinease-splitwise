import React from "react";
import { AvatarGenerator } from "random-avatar-generator";
import { useStateContext } from "../context";
import { cross } from "../assets";

export const Settle = ({ overlayValue, overlaySelector, nightLight, settleTxn, setPageLoading })=>{
    const generator = new AvatarGenerator();
    const { settleTreansaction } = useStateContext();

    const initTransfer = async ()=>{
        setPageLoading(true);
        const data = await settleTreansaction(settleTxn.id,settleTxn.amount);
        setPageLoading(false);
        location.reload();
    }
    return (
        <>
            {settleTxn && (
                <div className={`fixed inset-0 flex items-center justify-center z-40 ${nightLight?'text-white':'text-[#333333]'}`}>
                    <div className="absolute inset-0 bg-black opacity-80"></div>
                    <div className={`relative z-10 w-[50rem] p-4 rounded shadow-md ${nightLight?'bg-[#131318]':'bg-white'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex h-[40px] gap-1 items-center">
                                <div className="w-[3px] h-full bg-blue-pink-3 rounded"></div>
                                <p className="text-[26px]">Settling</p>
                                <p className={`text-[16px] px-2 ${nightLight?'bg-[#121234]':'bg-slate-300'}`}>{settleTxn.id._hex}</p>
                            </div>
                            <button className={`w-10 rounded ${nightLight?'border-transparent':'border-2'}`} onClick={()=>{overlaySelector(0)}}><img src={cross} alt="" /></button>
                        </div>
                        <div className="flex flex-row p-2">
                            <div>
                                <div className="flex h-[30px] mt-6 mb-2 gap-2 items-center text-[24px]">
                                    <p className={` rounded px-2 py-1 ${nightLight?'bg-[#121234]':'bg-slate-300'}`}>{parseFloat(settleTxn.amount.toString())/1e18} ETH</p>
                                    <p className="text-gray-500">will be tranfered to</p>
                                </div>
                                <div className="flex gap-2 pl-4">
                                    <img className="w-7" src={generator.generateRandomAvatar(settleTxn.to)} alt="" />
                                    <div className="flex flex-col">
                                        <p className="text-[20px]">{settleTxn.to} </p>
                                        <div className="w-full h-[2px] bg-blue-pink-3"></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 pl-4 mt-2 max-w-[500px] truncate items-center text-[20px]">
                                    <p className="text-gray-500">For </p>
                                    <p className={`rounded px-2 py-1 ${nightLight?'bg-[#121234]':'bg-slate-300'}`}>{settleTxn.message}</p>
                                </div>
                            </div>
                            <div className="flex flex-1 items-end justify-center pb-[20px]">
                                <button className="bg-blue-pink-3 w-[120px] h-[40px] rounded-full" onClick={()=>{initTransfer()}} >Transfer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}