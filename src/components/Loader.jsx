import React from "react";
import { loading } from "../assets";

const Loader = ()=>{
    return (
        <div className={`absolute top-[100px] left-[40px]`}>
            <img src={loading} alt="Rotating Image" className={`w-[40px] rotateLoder`}/>
        </div>
    
    )
}
export default Loader;