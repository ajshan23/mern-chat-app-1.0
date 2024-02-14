import React, { useEffect } from 'react'
import { useSocketContext } from '../context/socketContext'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../context/authSlice';
import notificationSound from "../assets/sounds/sound.mp3"
const useListenMessages = () => {
  const {socket} =useSocketContext();
  const messages=useSelector(state=>state.messages)
  const dispatch=useDispatch()

  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        newMessage.shouldShake=true;
        const sound=new Audio(notificationSound)
        sound.play();
        dispatch(setMessages([...messages,newMessage]))
    })

    return ()=>socket?.off("newMessage")
  },[socket,setMessages,messages])
}

export default useListenMessages
