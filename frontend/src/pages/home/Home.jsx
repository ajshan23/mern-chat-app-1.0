import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/MessageContainer/MessageContainer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    if (!localStorage.getItem("chat-user")) {
      navigate("/login")
    }
  },[])
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
