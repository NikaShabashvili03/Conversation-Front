import clsx from 'clsx'
import { SafeUser } from '../../types'
import Avatar from './Avatar'

interface GroupMappedProps {
    user: SafeUser,
    positionMap: {
        0: string,
        1: string,
        2: string
    }
    small?: boolean,
    index: number,
}
export default function GroupMapped({
    user,
    positionMap,
    small,
    index,
}: GroupMappedProps) {
  return (
    <div 
          key={user.id} 
          className={clsx(`
            absolute
            inline-block 
            rounded-full
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `, 
          small && 'h-[18px] w-[18px]'
          )}>
            <Avatar onlineIndicator size='sm' user={user}/>
    </div>
  )
}