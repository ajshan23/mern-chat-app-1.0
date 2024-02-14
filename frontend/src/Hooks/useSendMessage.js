import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../context/authSlice"
const useSendMessage = () => {
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const messages=useSelector(state=>state.messages)
    const selectedConversation=useSelector(state=>state.seleConv)

    const sendMessage=async (message)=>{
        setLoading(true)
        try {
            const res=await fetch(`/api/messages/send/${selectedConversation?._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({message})
            })
            const data=await res.json()

            if(data.error){
                throw new Error(data.error)
            }
            console.log(data.message);
            dispatch(setMessages([...messages,data.message]))
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {sendMessage,loading}
}

export default useSendMessage
