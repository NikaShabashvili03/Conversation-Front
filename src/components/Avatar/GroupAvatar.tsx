import { SafeUser } from '../../types';
import clsx from 'clsx';
import GroupMapped from './GroupMapped';


interface GroupAvatarProps {
    users: SafeUser[],
}

export default function GroupAvatar({
    users,
}: GroupAvatarProps) {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  }

  return (
    <div className={clsx(
      "relative w-11 h-11",
    )}>
      {slicedUsers.map((user: SafeUser, i: number) => {
        return <GroupMapped positionMap={positionMap} key={i} index={i} user={user}/>
      })}
    </div>
  )
}
