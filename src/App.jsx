import { useState , useEffect } from 'react'
import './App.css'
import { Navbar } from './Navbar'
import { Friends } from './Friends'
import { Dashboard } from './Dashboard'
import { Overlay } from './Overlay'
import { useStateContext } from './context' 

  
function App() {
  const [ nightLight, setNightLight ] = useState(true);
  const [ myName, setMyName ] = useState(null);
  const [ loadingFrnds, setLoadingFrnds ] = useState(false);
  const [ pageLoading, setPageLoading ] = useState(false);
  const [ overlayValue, overlaySelector ] = useState(0);
  const [ friends, setFriends ] = useState([]);
  const { connect, address, getFriends} = useStateContext();
  const [ txns, setTxns ] = useState(null);
  const [ settleTxn, setSettleTxn ] = useState(null);

  const toggleLights = ()=>{
    setNightLight((val)=>!val);
  }
  const fetchFriends =async()=>{
    setLoadingFrnds(true);
    const data = await getFriends(address);
    if(data!=null){
      setFriends(data);
    }
    setLoadingFrnds(false);
  }
  useEffect(()=>{
    if(address!=undefined){
      fetchFriends();
    }
  },[address]); 
  return (

    <div className={`p-3 h-screen ${nightLight?"bg-[#131318]":"bg-white"}`}>
      <Navbar 
        nightLight={nightLight}
      />
      <div className='flex justify-center gap-5 mt-4'>
        <Friends 
          friends={friends}
          loading={loadingFrnds}
          nightLight={nightLight}
          myName={myName}
          setMyName={setMyName}
          overlaySelector={overlaySelector}
          setPageLoading={setPageLoading}
        />
        <Dashboard 
          nightLight={nightLight}
          txns={txns}
          setTxns={setTxns}
          setSettleTxn={setSettleTxn}
          overlaySelector={overlaySelector}
        />
      </div>
      <Overlay 
        overlayValue={overlayValue}
        overlaySelector={overlaySelector}
        nightLight={nightLight}
        friends={friends}
        settleTxn={settleTxn}
        pageLoading={pageLoading}
        setPageLoading={setPageLoading}
      />
      <div className={`absolute top-[90%] left-[20px] w-[50px] items-center justify-center rounded-full p-1 cursor-pointer z-50 ${nightLight?'bg-[#1c1c24]':'bg-[#c9c7c9]'}`} onClick={toggleLights}>
        <img src="src\assets\bulb.png" alt="" />
      </div>
    </div>
  )
}

export default App;
