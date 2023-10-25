import React from "react";
import { AvatarGenerator } from "random-avatar-generator";
import { AddTransaction } from "./components/AddTransaction";
import { Settle } from "./components/Settle";


export function Overlay({ overlayValue, overlaySelector, nightLight, friends, settleTxn, pageLoading, setPageLoading }){
    return (
        <>  
            { pageLoading &&
                <>
                    <div className="absolute inset-0 z-50 bg-black opacity-80">
                        <img src="src\assets\loading.png" alt="" className="rotateLoder relative top-[50%] left-[48%]" />

                    </div>
                    {/* <div className={`relative z-10 w-[50rem] h-[23rem] p-4 rounded shadow-md ${nightLight?'bg-[#131318]':'bg-white'}`}> */}
                    {/* </div> */}
                </>
            }
            { overlayValue == 1 &&
                <AddTransaction
                    overlayValue={overlayValue}
                    overlaySelector={overlaySelector}
                    nightLight={nightLight}
                    friends={friends}
                    setPageLoading={setPageLoading}
                />
            }
            { overlayValue == 2 &&
                <Settle
                    overlayValue={overlayValue}
                    overlaySelector={overlaySelector}
                    nightLight={nightLight}
                    settleTxn={settleTxn}
                    setPageLoading={setPageLoading}
                />
            }
        </>
    )
}