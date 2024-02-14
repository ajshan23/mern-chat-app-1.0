import { useState } from "react"
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import {setUser} from "../context/authSlice.js"
import { useNavigate } from "react-router-dom"
function useLogin() {
  const [loading,setLoading]=useState(false)
const dispatch=useDispatch()
const navigate=useNavigate()
  const login =async({username,password})=>{
    setLoading(true)
    try {
        const res= await fetch("/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,password})
        })

        const data=await res.json();
        if (data.error) {
         toast.error(data.error)
        //  throw new Error(data.error)
        return null
      }
        localStorage.setItem("chat-user",JSON.stringify(data))
        //redux
        dispatch(setUser(data))
       navigate("/")

    } catch (error) {
        toast.error(error)
    }finally{
        setLoading(false)
    }
  }
  return {loading,login}
}

export default useLogin
