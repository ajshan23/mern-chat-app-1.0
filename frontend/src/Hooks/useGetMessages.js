import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../context/authSlice'

const useGetMessages = () => {
     
    const [loading,setLoading]=useState(false)
    const messages=useSelector(state=>state.messages)
    const selectedConversation=useSelector(state=>state.seleConv)
    const dispatch=useDispatch()

    useEffect(()=>{
     
         const getMessages =async()=>{
            setLoading(true)
          try {
            const res=await fetch(`/api/messages/${selectedConversation._id}`);

            const data=await res.json()

            if(data.error){
                throw new Error(data.error)
            }
            dispatch(setMessages(data))
          } catch (error) {
            toast.error(error)
          }  finally{
            setLoading(false)
          }
          
         }
         if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])

    return {messages,loading}
}

export default useGetMessages
