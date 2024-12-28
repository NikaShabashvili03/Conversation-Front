import { useContext, useEffect, useMemo, useRef } from 'react';
import { SafeConversation, SafeMessage, SafeUser } from '../../../types'
import { fetchMessages, pushMessage, seenMessage, updateMessage } from '../../../redux/slices/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import Message from './Message';
import MessageForm from './MessageForm';
import { useAuth } from '../../../context/AuthContext';
import useOtherUser from '../../../hooks/useOtherUser';
import Avatar from '../../Avatar/Avatar';
import GroupAvatar from '../../Avatar/GroupAvatar';
import { MessageSocketContext } from '../../../context/MessageContext';
import Typing from './Typing';

export default function SingleConversation({
    id,
    isGroup,
    users,
    name
}: SafeConversation) {
  const dispatch = useDispatch<AppDispatch>()

  const { messages, status } = useSelector((state: RootState) => state.messages)

  const otherUsers = useOtherUser({
    isGroup: isGroup,
    users: users
  })

  const { user } = useAuth()

  const isLoading = useMemo(() => status === 'loading' || status === 'idle', [status]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchMessages({ id: id }))
  }, [dispatch, id])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

 const messageSocket = useContext(MessageSocketContext);

 useEffect(() => {
    if (messageSocket) {
      const handleMessage = (event: MessageEvent) => {
        const { message, action } = JSON.parse(event.data);
        if(message.sender.id != user?.id){
          if(action === 'create'){
            dispatch(pushMessage(message))
          }
        }else{
          if(action === 'update'){
            dispatch(updateMessage(message))
          }
        }
      };

      messageSocket.addEventListener('message', handleMessage);

      return () => {
        messageSocket.removeEventListener('message', handleMessage);
      };
    }
  }, [messageSocket, id, dispatch, user?.id]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender.id !== user?.id && !lastMessage.seens.some((_user: SafeUser) => _user.id === user?.id)) {
        dispatch(seenMessage({ conversationId: id, id: lastMessage.id }));
      }
    }
  }, [messages, user?.id, id, dispatch])

  if (isLoading) return <div>Loading...</div>
  
  if(!messages) return <div>Conversation Not Found</div>
  

  return (
    <div className='w-full h-full flex flex-col justify-between gap-2 px-10'>
      <div className='w-full h-[10%] flex items-center border-b justify-between'>
        <div className='flex gap-2'>
          {isGroup && Array.isArray(otherUsers) ? <GroupAvatar users={otherUsers}/> : <Avatar onlineIndicator size='md' user={(otherUsers as SafeUser)}/>}
          <h2 className='text-[20px] font-semibold'>
              {name
                  ? name
                  : isGroup && Array.isArray(otherUsers)
                  ? otherUsers?.slice(0, 2).map((user: SafeUser) => user.firstname).join(', ')
                  : <>{(otherUsers as SafeUser)?.firstname} {(otherUsers as SafeUser)?.lastname}</>
              }
          </h2>
        </div>
        <div>
          Edit
        </div>
      </div>
      <div className='w-full h-[80%] py-10 px-2 overflow-y-auto flex flex-col justify-start items-start gap-5'>
        {messages.map((message: SafeMessage) => <Message conversationId={id} isLastMessage={message.id === messages[messages.length - 1].id} me={message.sender.id === user?.id} key={message.id} {...message}/>)}
        <Typing/>
        <div ref={messagesEndRef} />
      </div>
      <MessageForm id={id}/>
    </div>
  )
}
