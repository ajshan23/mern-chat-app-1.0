import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
        conversation=await Conversation.create({
            participants:[senderId,recieverId]
        })
    }

    const newMessage=new Message({
        senderId:senderId,
        recieverId:recieverId,
        message:message,
    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
    //this will run in parallel
    await Promise.all([conversation.save(),newMessage.save()])





   // SOCEKT IO FUNCTIONALITY WILL GO HERE

   const recieverSocketId=getReceiverSocketId(recieverId)
   if(recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage",newMessage)//to specific client
  }









    res.status(201).json({
        message:newMessage
    })
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};




export const getMessages=async(req,res)=>{
    try {
        const {id:userTochatId}=req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userTochatId]}
        }).populate("messages")//not referece but actual messages

        if (!conversation) {
            return res.status(200).json([])
        }
        const messages=conversation.messages;
        return res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMssages controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
    }
}