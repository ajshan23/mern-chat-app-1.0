import React, { useEffect } from "react";
import Messages from "../Messages/Messages";
import MessageInput from "../MessageInput/MessageInput";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setConv } from "../../context/authSlice";
const MessageContainer = () => {
  const slectedConversation=useSelector(state=>state.seleConv)
  const dispatch=useDispatch()

  // console.log(slectedConversation);

  useEffect(() => {
   
  //cleanup function (unmount)
    return () => dispatch(setConv(null))
  }, [])
  
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!slectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To : </span>
            <span className="text-gray-900 font-bold">{slectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="px-4 text-center sm:text-lg
       md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2"
      >
        <p>Welcome Ajmal</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
