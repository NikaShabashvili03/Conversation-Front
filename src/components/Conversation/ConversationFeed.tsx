import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConversationFeed } from '../../redux/slices/conversationFeedSlice'
import { RootState, AppDispatch } from '../../redux/store'; 
import { SafeConversation } from '../../types';
import Conversation from './Conversation';
import ConversationSkeleton from './ConversationSkeleton';

export default function ConversationFeed() {
  const dispatch = useDispatch<AppDispatch>()
  const { conversations, status } = useSelector((state: RootState) => state.conversationFeed)

  const isLoading = useMemo(() => status === 'loading' || status === 'idle', [status]);

  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }, [conversations]);

  useEffect(() => {
    dispatch(fetchConversationFeed())
  }, [dispatch])
  
 
  return (
    <div className='w-full rounded-[25px] flex flex-col gap-2 h-[60%] px-4 py-4 bg-white'>
           <h2 className='font-semibold text-[25px]'>People</h2>
           <div className='h-full flex-col flex gap-3 pr-2 overflow-y-auto'>
              {isLoading
                ? new Array(3).fill(null).map((_, i: number) => <ConversationSkeleton key={i}/>)
                : sortedConversations.map((conversation: SafeConversation) => (
                    <Conversation key={conversation.id} {...conversation}/>
                  ))
              }
           </div>
    </div>
  )
}
