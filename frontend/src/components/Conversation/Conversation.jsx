import useConversation from "../../zustand/useConversation.js"
import {useDispatch,useSelector} from "react-redux"
import {setConv} from "../../context/authSlice.js"
const Conversation = ({ conversation, lastInd }) => {

  const dispatch=useDispatch()

const selectedConv=useSelector(state=>state.seleConv)
  const isSelected=selectedConv?._id===conversation._id;
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-sky-500":""}
      `}
      onClick={()=>dispatch(setConv(conversation))}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="useravatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            {/* <span className="text-xl">😤</span> */}
          </div>
        </div>
      </div>
      {!lastInd && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
