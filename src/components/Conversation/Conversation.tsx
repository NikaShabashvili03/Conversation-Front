import { SafeConversation, SafeUser } from '../../types'
import { Link } from 'react-router-dom'
import useOtherUser from '../../hooks/useOtherUser'
import { format, isToday, isYesterday } from 'date-fns';
import GroupAvatar from '../Avatar/GroupAvatar';
import Avatar from '../Avatar/Avatar';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

export default function Conversation({
    id,
    name,
    updated_at,
    isGroup,
    lastMessage,
    users
}: SafeConversation) {
  const { user } = useAuth()
  const otherUsers = useOtherUser({
    users: users,
    isGroup: isGroup
  })

  const isNotSeened = lastMessage?.sender.id !== user?.id && !lastMessage?.seens.some(({id}: {id: number}) => id === user?.id)
  
  const formatDateTime = () => {
    if (isToday(updated_at)) {
        return `Today, ${format(updated_at, 'h:mmaaa')}`;
      } else if (isYesterday(updated_at)) {
        return `Yesterday, ${format(updated_at, 'h:mmaaa')}`;
      } else {
        return `${format(updated_at, 'EEEE')}, ${format(updated_at, 'h:mmaaa')}`;
      }
  };

  return (
    <Link to={`/conversation/${id}`} className='flex h-auto w-full py-2 gap-1 border-b last:border-b-0'>
        {isGroup && Array.isArray(otherUsers) ? <GroupAvatar users={otherUsers}/> : <Avatar onlineIndicator size='md' user={(otherUsers as SafeUser)}/>}
        <div className='w-full flex flex-col'>
            <div className='w-full flex justify-between'>
                <h2 className={clsx(
                  'text-[15px]',
                  isNotSeened ? 'font-bold' : "font-semibold"
                )}>
                    {name
                        ? name
                        : isGroup && Array.isArray(otherUsers)
                        ? otherUsers?.slice(0, 2).map((user: SafeUser) => user.firstname).join(', ')
                        : <>{(otherUsers as SafeUser)?.firstname} {(otherUsers as SafeUser)?.lastname}</>
                    }
                </h2>
                <p className='text-[12px] text-[#7C7C7C]'>{formatDateTime()}</p>
            </div>
            <div className='flex w-full justify-between items-center'>
                <h2 className={clsx(
                  'text-sm text-[#7C7C7C]',
                  isNotSeened ? 'font-bold' : "font-semibold"
                )}>{lastMessage ? `${lastMessage.sender.id !== user?.id ? lastMessage.sender.firstname : "You"}: ${lastMessage.body ? lastMessage.body : "Deleted Message"}` : "Message not found"}</h2>
                {isNotSeened && <div className='w-2 h-2 bg-red-600 rounded-full'></div>}
            </div>
        </div>
    </Link>
  )
}
