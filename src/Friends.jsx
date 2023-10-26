import React ,{ useState }from "react";
import { Friend } from "./Friend";
import { AvatarGenerator } from 'random-avatar-generator';
import { useStateContext } from "./context";
import Loader from "./components/Loader";
import { alert, curlyArrow, txn } from "./assets";


export function Friends({friends, loading, nightLight, myName, setMyName, overlaySelector, setPageLoading }){
    const generator = new AvatarGenerator();
    const { address, addNewFriend} = useStateContext();
    
    function Friends404(){
        return (
            <>
            {!loading && address  && (
                <div className="flex flex-col items-center gap-40 py-1 px-2">
                        <img src={alert} className="w-30" alt="" />
                        <div className="flex gap-3">
                            <p className="text-gray-700 text-xl">add new ?</p>
                            <img src={curlyArrow} alt="" className="w-[40px] h-[40px]" />
                        </div>
                </div>
            )}
            </>
        )
    }
    async function addFriend(){
        if(document.getElementById("hash").value==''){
            alert("The address be a 40 charachter long in hex-code");            
            return;
        }
        if(document.getElementById("name").value==''){
            alert("Enter a Name for user.");
            return;
        }
        const hash = document.getElementById('hash').value;
        const name = document.getElementById('name').value;
        if(!myName){
            setMyName(prompt("Set Your UserName before Using the app. That name be displayed on your friends window"));
            document.getElementById('hash').value='';
            document.getElementById('name').value='';
        }
        else{
            setPageLoading(true);
            const data = await addNewFriend(name,hash,myName,address);   
            setPageLoading(false);
            location.reload();        
        }
    }
    return (
        <div className={`relative ${!address?'pointer-events-none opacity-30':''}`}>
            {loading && <Loader/>}
            <div className={`pt-1 w-60 h-96 text-left border-spacing-3 rounded font-epilogue ${nightLight?'bg-[#1c1c24] rounded-[20px] rounded-b-none text-white':'border-4'}`}>
                <div className="text-3xl m-3 flex items-center gap-2">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center  ${(nightLight&&!address)?'bg-blue-pink-2':''}`}>
                        <img src={address? generator.generateRandomAvatar(address): "src/assets/defaultUser.png"} className="w-12 flex mx-2" alt="" />
                    </div>
                    <p className="pl-2">Friends</p>                    
                </div>
                <div className="h-[calc(100%-5rem)] overflow-y-auto scrollbar scroll-smooth scrollbar-thumb-neutral-300">
                    {friends.length!=0 ? friends.map((data,i)=>(<Friend key={i} hash={data[0]} name={data[1]} nightLight={nightLight}/>)): <Friends404 />}
                </div>
            </div>
            <div className={`p-2 w-60 ${nightLight?'bg-blue-pink-2 rounded-b-[20px]':''}`}>
                <input id="hash" className={`px-2 w-full font-epilogue ${nightLight? 'border-transparent rounded-t-[10px] h-[30px] text-white bg-[#1c1c24] mb-[0]':'border-2 mt-1 rounded border-gray-300'}`} placeholder="0x2cdB64f......." type="text"/>
                <div className={`flex ${nightLight?'mt-[3px]':'gap-1 mt-1'}`}>
                    <input id="name" className={`px-2 w-2/3 ${nightLight?'border-transparent rounded-bl-[10px] text-white bg-[#1c1c24] h-[30px]':'border-2 rounded border-gray-300'}`} placeholder="Johnny Depp" type="text" />
                    <button className={`text-center w-1/3  ${nightLight?'rounded-br-[10px] border-1 bg-slate-600 h-[30px]':'bg-slate-300 rounded'}`} onClick={()=>{addFriend()}}>Add</button>
                </div>
            </div>    
            <button className={`w-full flex p-2 rounded-xl text-xl items-center justify-center ${nightLight?'bg-[#1c1c24] text-white font-epilogue mt-[5rem]':'bg-slate-300 mt-[5rem]'}`} onClick={()=>{overlaySelector(1)}}><img src={txn} className="w-10 mr-2" alt=""/>Add Transaction</button>
        </div>
    )
}