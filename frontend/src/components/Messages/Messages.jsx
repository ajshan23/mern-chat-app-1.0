import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages'
import MessageSkelton from '../Skeltons/MessageSkelton'
import useListenMessages from '../../Hooks/useListenMessages'

const Messages = () => {

  const {messages,loading}=useGetMessages()
  useListenMessages();
  const lastMessgeRef=useRef(null)
  useEffect(()=>{
    setTimeout(()=>{
      lastMessgeRef.current?.scrollIntoView({behavior:"smooth"});
    },100)
  },[messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>

    {!loading && messages.length>0 && messages.map((message)=>(
      <div key={message._id} ref={lastMessgeRef}><Message  message={message}/></div>
    ))}



      {loading && [...Array(3)].map((_,index)=><MessageSkelton key={index}/>)}

      {!loading && messages.length===0 &&(
        <p className='text-center'>Send a message to start the convesaitons</p>
      )}


    </div>
  )
}

export default Messages
