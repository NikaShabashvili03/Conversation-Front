import { Outlet, useOutlet } from 'react-router-dom'
import ChatIcon from '../../assets/icons/chat.svg'
import ConversationFeed from '../../components/Conversation/ConversationFeed';
import ConversationGroupFeed from '../../components/Conversation/ConversationGroupFeed';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addConversation, addGroup, updateConversation, updateGroup } from '../../redux/slices/conversationFeedSlice';
import { ConversationSocketContext } from '../../context/ConversationContext';
import { useContext, useEffect } from 'react';


export default function ConversationPage() {
  const outlet = useOutlet();
  const dispatch = useDispatch<AppDispatch>()

  const conversationContext = useContext(ConversationSocketContext);
 

  useEffect(() => {
    if (conversationContext) {
      const handleMessage = (event: MessageEvent) => {
        const { conversation, action } = JSON.parse(event.data);
        if(action === 'update'){
          if(conversation.isGroup){
            dispatch(updateGroup(conversation))
          }
          else{
            dispatch(updateConversation(conversation))
          }
        }
        else{
          if(conversation.isGroup){
            dispatch(addGroup(conversation))
          }
          else{
            dispatch(addConversation(conversation))
          }
        }
      };
      
      conversationContext.addEventListener('message', handleMessage);
    
      return () => {
        conversationContext.removeEventListener('message', handleMessage);
      };
    }
  }, [conversationContext, dispatch]);

  return (
    <div className='w-full h-full gap-10 flex'>
      <div className='w-1/4 gap-10 flex flex-col justify-between h-full'>
          <div className='h-[8%] w-full bg-white'>
            Search bar
          </div>
          <ConversationGroupFeed/>
          <ConversationFeed/>
      </div>
      <div className='w-3/4 bg-white flex justify-center items-center rounded-[25px]'>
         {outlet 
          ? <Outlet /> 
          : (
            <div className='flex justify-center items-center flex-col'>
                <div className='pb-3 pl-3 pt-4 pr-3 bg-[#612DD1] flex justify-center items-center rounded-full'>
                  <img src={ChatIcon} alt='Chat' className='rounded-full'/>
                </div>
                <h2 className='font-semibold text-xl'>Your message</h2>
                <p className='text-gray-500 text-sm'>Send a message to start a chat</p>
            </div>
          )
         }
      </div>
    </div>
  )
}
