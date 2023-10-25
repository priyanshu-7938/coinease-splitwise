import React, { useState, useEffect } from "react";
import { AvatarGenerator } from 'random-avatar-generator';
import { useStateContext } from "./context";

export function Navbar({ nightLight }){
    const generator = new AvatarGenerator();
    const { connect, address } = useStateContext();
    
    return (
      <>
        <div className={`rounded-[20px] navbar flex justify-between h-15 p-1 ${nightLight? 'bg-[#1c1c24]':''}`}>
          <div className="front flex items-center">
            <img className="mx-2 h-14" src="src\assets\icn96.png" alt="bitcoin" />
            <p className={`mr-5 text-4xl font-epilogue mt-2 ${nightLight?'text-white':'text-[#333333]'}`}>Coin ease</p>
          </div>
          <div className="flex items-center gap-2">
            {!address && <button className={`rounded bg-white mx-5 p-2 w-[100px] ${nightLight? 'text-white bg-blue-pink':'text-[#333333] border-4'}`} onClick={()=>{connect()}}>Connect</button>}
            {address && 
              <div className="flex items-center gap-[10px] px-3">
                <img  
                  src={generator.generateRandomAvatar(address)} 
                  className="w-9" 
                />
                <div className="flex flex-col">
                  <p className={`font-[20px] ${nightLight?'text-white':'test-[#333333]'}`}>{address.slice(0, 5) + "..." + address.slice(-3)}</p>
                  <div className="bg-blue-pink h-[2px] w-full p-0 m-0 "></div>
                </div>
              </div>
            }
          </div>
        </div>
      </>
    )
}