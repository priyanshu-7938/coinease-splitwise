import React from "react";

const Loader = ()=>{
    return (
        <div className={`absolute top-[100px] left-[40px]`}>
            <img src="src\assets\loading.png" alt="Rotating Image" className={`w-[40px] rotateLoder`}/>
        </div>
    
    )
}
export default Loader;