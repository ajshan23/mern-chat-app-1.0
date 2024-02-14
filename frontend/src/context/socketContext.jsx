import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"
const SocketContext=createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    
    const [socket,setSocket]=useState(null);

    const [onlineUsers,setOnlineUsers]=useState([])
     const authUser=useSelector(state=>state.user);
    useEffect(()=>{
      if(authUser){
        const socket=io("http://localhost:8000",{
            query:{
                userId:authUser._id
            }
        })
        setSocket(socket)

        socket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users)
        })

        return ()=>socket.close()
      }else{
        if (socket) {
            socket.close()
            setSocket(null)
        }
      }
    },[authUser])
    return(
        <SocketContext.Provider  value={{socket,onlineUsers}}>
        {children}
        </SocketContext.Provider>
    )
}