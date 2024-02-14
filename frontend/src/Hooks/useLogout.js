import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../context/authSlice"
import toast from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom"

function useLogout() {
 const [loading,setLoading]=useState(false)
const dispatch=useDispatch()
const navigate=useNavigate()
 const logout=async()=>{
    setLoading(true)
    try {
        const res=await fetch("/api/auth/logout",{
            method:"POST",
            headers:{
              Accept:'application/json',
              'Content-Type':'application/json',
            },
        })
        const data=await res.json()
        if(data.error){
            throw new Error(data.error)
        }

        localStorage.removeItem("chat-user")
        dispatch(setUser({}))
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
    navigate("/signup")
 }
 return {loading,logout}
}

export default useLogout
