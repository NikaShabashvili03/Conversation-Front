import { useAuth } from '../context/AuthContext';
import { SafeUser } from '../types';

interface UseOtherUserProps {
  users: SafeUser[];
  isGroup: boolean;
}

export default function useOtherUser({ users, isGroup }: UseOtherUserProps): SafeUser | SafeUser[] {
  const { user } = useAuth();

  const otherUsers = users.filter((_user: SafeUser) => _user?.id !== user?.id);
  return isGroup ? otherUsers : otherUsers[0];
}