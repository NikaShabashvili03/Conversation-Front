import clsx from "clsx";
import Placeholder from "../../assets/images/placeholder.png";
import useOnline from "../../hooks/useOnline";
import { SafeUser } from "../../types";

interface AvatarProps {
  user: SafeUser | null;
  bordered?: boolean;
  size?: "ss" | "sm" | "md" | "lg" | "full";
  onlineIndicator?: boolean
}

export default function Avatar({ user, bordered, size = "full", onlineIndicator }: AvatarProps) {
  const isOnline = useOnline({
    id: user?.id,
    userStatus: user?.isOnline,
  });

  return (
    <div
      className={clsx(
        "rounded-full aspect-square relative",
        bordered && "border-[#5322BC] border-[4px]",
        size === 'ss' && 'w-4 h-4',
        size === "lg" && "w-14 h-14",
        size === "md" && "w-11 h-11",
        size === "sm" && "h-6 w-6",
        size === "full" && "w-full h-full"
      )}
    >
      <img
        className="w-full h-full rounded-full object-cover"
        src={
          user?.avatar
            ? `${import.meta.env.VITE_APP_BACKEND_URL}${user.avatar}`
            : Placeholder
        }
        alt={`${user?.firstname || "User"}'s avatar`}
      />
      {onlineIndicator && (
         <span
            className={clsx(
              "absolute flex justify-center items-center rounded-full border-2 border-[#313338] group-hover:border-[#3a3c41]",
              isOnline ? "bg-[#50a361]" : "bg-[#81848d]",
              size == 'sm' && '-bottom-0 right-0 w-[12px] h-[12px]',
              size == 'md' && '-bottom-0 right-1 w-[15px] h-[15px]',
              size == 'lg' && '-bottom-1 right-0 w-[16px] h-[16px]',
            )}
          >
        </span>
      )}
    </div>
  );
}
