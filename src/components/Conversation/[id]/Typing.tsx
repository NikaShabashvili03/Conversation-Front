import { useContext, useEffect, useState } from "react";
import { TypingSocketContext } from "../../../context/TypingContext";
import { SafeUser } from "../../../types";
import { useAuth } from "../../../context/AuthContext";
import Avatar from "../../Avatar/Avatar";
import { PulseLoader } from "react-spinners";


export default function Typing() {
    const { user } = useAuth()
    const typingSocket = useContext(TypingSocketContext)
    const [typingUsers, setTypingUsers] = useState<SafeUser[]>([]);

    useEffect(() => {
        if (typingSocket) {
            typingSocket.onmessage = (event) => {
            const { is_typing, user: _user } = JSON.parse(event.data);
        
            if (_user.id !== user?.id) {
                setTypingUsers((prev: SafeUser[]) => {
                if (is_typing) {
                    const uniqueUsers = new Set(prev.map((u) => u.id)); 
                    if (!uniqueUsers.has(_user.id)) {
                    return [...prev, _user]; 
                    }
                    return prev;
                } else {
                    return prev.filter((fUser) => fUser.id !== _user.id);
                }
                });
            }
            };
        }
    }, [typingSocket, user]);

  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="flex gap-1 justify-center items-center">
        {typingUsers.map((user: SafeUser) => (
            <>
                <Avatar size="sm" user={user}/>
            </>
        ))}
      </div>
      {typingUsers.length > 0 && (
        <div className="px-2 py-2 bg-gray-200 rounded-full flex justify-center items-center">
            <PulseLoader size={3} />
        </div>
      )}
    </div>
  )
}
