import React, { useState, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import { render } from "react-dom";
import { useStateContext } from '../context' 
import { ethers } from 'ethers';
import { add2, cross, down, left, txn } from "../assets";

export function AddTransaction({ overlayValue, overlaySelector, nightLight, friends, setPageLoading }){
    const grnerator = new AvatarGenerator();
    const { address, addtransactionToChain } = useStateContext();
    const [ viewPayers,payerViewToggler ] = useState(false);
    const [ totalMember, setMembers ] = useState();
    
    const [ payer, setPayer ] = useState(null);
    const [ payers, setPayers ] = useState(null);
    const [ stateSet, setSet] = useState(null);
    const [ allSpliters, setAllSpliters ] = useState(null);
    const [ spliters, setSpliters ] = useState(null);

    //functions to add users to the list..
    const addToSet = (item) => {
        const newSet = new Set(stateSet);
        newSet.add(item);
        setSet(newSet);
    };
    const removeFromSet = (item) => {
        const newSet = new Set(stateSet);
        newSet.delete(item);
        setSet(newSet);
    };
    //function that sets all members includeing you too...
    const callingSet = ()=>{
        setMembers([ [address,"You"], ...friends ]);
    }
    useState(()=>{
        if(friends!=undefined && address!=undefined){
            callingSet();
        }
    },[friends]);

    if(totalMember!=undefined && payers==null){
        setPayers(totalMember.map((item)=>{
            return ( 
                <li key={item[0]} className="flex gap-2 cursor-pointer text-left px-2" onClick={()=>{setPayer(item);document.getElementById("payerListSelection").classList.toggle("hidden");}}>
                    <img src={grnerator.generateRandomAvatar(item[0])} className="w-4" alt="" />
                    <p>{item[1]}</p>
                </li>
            )
        }))
    }
    
    //record for selected accounts......
    if( totalMember!=undefined &&  stateSet==null){
        const stateForTheSpliter = new Set();
        totalMember.forEach((ele)=>{
            stateForTheSpliter.add(ele);
        }); 
        setSet(stateForTheSpliter);
    }
    
    const updateData = ()=>{
        //setting the alll spliter data..
        setAllSpliters(totalMember.map((item,index)=>{
            return (<>
                { (stateSet.has(item))?  
                    (<li key={item[0]} className="flex gap-2">
                        <img src={left} className="w-7 cursor-pointer" alt="" onClick={()=>{
                            removeFromSet(item);
                        }} />
                        <img src={grnerator.generateRandomAvatar(item[0])} className="w-4" alt="" />
                        <p>{item[1]}</p>
                    </li>)
                    :<></>
                }
            </>)
        }))
        //setting the spliters data too...
        setSpliters(totalMember.map((item,index)=>{
            if(!stateSet.has(item)){ 
                return (
                    <li key={item[0]} className={`flex gap-2 items-center px-2 rounded m-[0.12rem] ${nightLight?'bg-[#121234] border-transparent':'bg-gray-300 border-2'}`}>
                        <img src={grnerator.generateRandomAvatar(item[0])} className="w-4" alt="" />
                        <p>{item[1]}</p>
                        <img src={cross} className="h-3" alt="img" onClick={()=>{
                            addToSet(item);
                        }}/>
                    </li>
                )
            }
        }))


    }
    useEffect(()=>{
        if(totalMember!=undefined){
            updateData();
        }
    },[stateSet]);

    const handelUpload = async ()=>{
        if( payer==null || spliters==null ){
            alert("Select a payer or a spliter.");
            return;
        }
        const amount = document.getElementById("amountEth").value;
        const message = document.getElementById("message").value;
        if(!( /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(amount) )){
            alert("Not a valid amount.");
            return;
        }
        const array = totalMember.map((elem)=>{
            if(!stateSet.has(elem)){
                return elem[0];
            }
        }).filter((elem)=>elem!=undefined);
        if(array.length == 0){
            alert("Select spliters.");
            return;
        }
        setPageLoading(true);
        const responce = await addtransactionToChain(payer[0],array,ethers.utils.parseUnits(amount, 18),message);
        setPageLoading(false);
        location.reload();        
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-40 ${nightLight?'text-white':'text-[#333333]'}`}>
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <div className={`relative z-10 w-[50rem] h-[23rem] p-4 rounded shadow-md ${nightLight?'bg-[#131318]':'bg-white'}`}>
                <div className="flex items-center justify-between mb-1">
                    <div className="flex gap-2 item-center">
                        <img src={txn} alt="" className="w-[35px]"/>
                        <p className="text-xl pt-1" >New Transaction</p>
                    </div>
                    <button className={`w-10 rounded ${nightLight?'border-transparent':'border-2'}`} onClick={()=>{overlaySelector(0)}}><img src={cross} alt="" /></button>
                </div>
                <div>
                    <div className="flex mb-3">
                        <p className="w-40 text-lg text-bold text-left pl-4">Payer</p>
                        <p className={`w-60 text-left flex justify-between px-3 rounded items-center ${nightLight?'border-transparent bg-[#1c1c24]':'border-2'}`}>
                            {payer? 
                                <>
                                    <span className="flex gap-2">
                                        <img src={grnerator.generateRandomAvatar(payer[0])} className="w-4" alt="" />
                                        {payer[1]}
                                    </span>
                                </>
                                : 
                                <>
                                    <span className="text-gray-400">Select Payer</span>
                                </>
                            }
                            <span onClick={()=>{document.getElementById("payerListSelection").classList.toggle("hidden");}}>
                                <img className="w-5" src={down}/>
                                </span>
                        </p>
                        <ul id="payerListSelection" className ={`absolute hidden left-[17rem] top-[5.5rem] rounded-lg shadow-sm h-20 w-36 overflow-y-auto border ${nightLight?'bg-[#131318] border-[#333333]':'bg-white border-gray-300'}`}>
                            {payers}
                        </ul>   
                    </div>
                    <div className="flex h-40">
                        <p className="w-40 text-lg text-bold text-left pl-4">Spliters</p>
                        <div className={`min-w-[20rem] w-[25rem] max-h-36 overflow-y-auto text-left p-1 rounded ${nightLight?'border-transparent bg-[#1c1c24]':'border-2'}`}>{ spliters!=null && spliters.length!=0 ? <ul className="flex flex-wrap" >{spliters}</ul>: <span className="text-gray-400 ml-2">Select Spliters</span>}</div>
                        <span onClick={()=>{
                                document.getElementById("spliterListSelection").classList.toggle("hidden");
                                document.getElementById("add-cross").classList.toggle("cross")
                            }}>
                            <img id="add-cross" src={add2} className="w-7 h-7 ml-1 cursor-pointer" alt="" /> 
                        </span>
                        <ul id="spliterListSelection" className ={`px-2 hidden absolute left-[36.2rem] top-[8rem] border rounded-lg shadow-sm h-40 w-48 overflow-y-auto ${nightLight?'bg-[#131318] border-[#333333]':'bg-white border-gray-300'}`}>
                            {allSpliters}
                        </ul> 
                    </div>
                    <div className="flex">
                        <p className="w-40 text-lg text-bold text-left pl-4">Paid for</p>
                        <input type="text" id="message" className={`w-[300px] rounded px-2 active:border-none ${nightLight?'bg-[#1c1c24] border-0':'text-[#333333] border-2'}`} placeholder="Collatral in seatal."/>
                    </div>
                    <div className="flex justify-between pr-10">
                        <div className="flex items-center">
                            <p className="w-40 text-lg text-left text-bold pl-4">Amount</p>
                            <input id="amountEth" className={`w-[208px] rounded px-2 active:border-none ${nightLight?'bg-[#1c1c24] border-0':'text-[#333333] border-2'}`} type="text" placeholder="0.023" />
                            <p className="test-bold text-left pl-2">Sepolia ETH</p>
                        </div>
                        <div className="w-40"><button className={`h-10 rounded px-6 ${nightLight?'bg-blue-pink-3':'bg-slate-300'}`} onClick={()=>{handelUpload();}}>Add To Chain</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}