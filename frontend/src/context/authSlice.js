import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    user:{},
    seleConv:null,
    messages:[]
}

export const authSlice=createSlice({
    initialState:initialstate,
    name:"auth",
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setConv:(state,action)=>{
            state.seleConv=action.payload
        },
        setMessages:(state,action)=>{
            state.messages=action.payload
        },
    }
})

export const {setUser,setConv,setMessages}=authSlice.actions;

export default authSlice.reducer;