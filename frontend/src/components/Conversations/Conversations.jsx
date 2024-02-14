import React from 'react'
import Conversation from '../Conversation/Conversation'
import useGetConversations from '../../Hooks/useGetConversations'

const Conversations = () => {
  const {conversations,loading}=useGetConversations()

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation,index)=>(
        <Conversation key={conversation._id} conversation={conversation} lastInd={index===conversations.length -1} />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span>:null}
    </div>
  )
}

export default Conversations
