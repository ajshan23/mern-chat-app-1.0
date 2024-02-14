import React from 'react'
import { useSelector } from 'react-redux'
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {

    const authUser=useSelector(state=>state.user);
    // console.log("authuser:",authUser);
    const selectedConversation=useSelector(state=>state.seleConv);
    const fromMe=message.senderId===authUser._id;
    const chatClassName=fromMe?"chat chat-end":"chat chat-start"
    const profilePic=fromMe?authUser.profilePic:selectedConversation?.profilePic
    const bubbleBgColor=fromMe?'bg-blue-500':'';
    const fomratedTime=extractTime(message.createdAt)
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="" />
            </div>

        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
            {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            {fomratedTime}
        </div>
    </div>
  )
}

export default Message
