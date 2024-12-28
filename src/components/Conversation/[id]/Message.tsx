import clsx from "clsx";
import { Emoji, SafeMessage, SafeUser } from "../../../types";
import Avatar from "../../Avatar/Avatar";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { reactionMessage } from "../../../redux/slices/messagesSlice";
import { format } from "date-fns";

interface Reaction {
    emoji: string;
    user: SafeUser;
}

interface MessageProps extends SafeMessage {
    me: boolean;
    isLastMessage: boolean;
    conversationId: number;
}

export default function Message({
    id,
    body,
    me,
    sender,
    seens,
    isDeleted,
    isLastMessage,
    reactions,
    conversationId
}: MessageProps) {
    const { user } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const emojis = ["❤️", "👍", "😂", "😮", "😢", "👎"];

    const handleReaction = (emoji: Emoji) => {
        dispatch(
            reactionMessage({
                emoji,
                conversationId,
                id
            })
        );
    };

    const countReactions = (reactionsArray: Reaction[]) => {
        const reactionCount: { [emoji: string]: number } = {};
        reactionsArray.forEach((reaction) => {
            reactionCount[reaction.emoji] = (reactionCount[reaction.emoji] || 0) + 1;
        });
        return reactionCount;
    };

    const isEmojiActive = (emoji: string) =>
      reactions.some((reaction) => reaction.emoji === emoji && reaction.user.id === user?.id);

    const groupedReactions = countReactions(reactions);

    const myReaction = reactions.filter(({ user: _user }: { user: SafeUser }) => _user.id === user?.id)[0]
    return (
      <>
          <div className={clsx("w-full flex flex-col", me && "items-end justify-end")}>
              <div className="w-fit gap-1 flex flex-col">
                  <div className={clsx("flex gap-1", me && "flex-row-reverse")}>
                      <Avatar size="sm" user={sender} />
                      <div
                          className={clsx(
                              "px-4 py-1 rounded-full relative",
                              me ? "bg-[#6E00FF] text-white" : "bg-[#E7E7E7] text-black",
                              isDeleted && "border border-red-600 !bg-[#E7E7E7] !text-black"
                          )}
                      >
                          {isDeleted && <p className="absolute bottom-full mb-0.5 left-1 text-sm text-gray-400">{format(isDeleted, 'h:mm aaa')}</p>}
                          <h2>{body ? body : "Deleted"}</h2>
                          <div
                              className={clsx(
                                  "absolute group justify-start -top-[20px] -right-[20px] flex items-center gap-1 w-8 h-8 bg-gray-100 rounded-full",
                                  me && "hidden",
                                  isDeleted && 'hidden'
                              )}
                          >
                              <h2 className="group-hover:hidden flex text-lg p-1 hover:bg-gray-200 rounded-full">
                                  {myReaction ? myReaction.emoji : "❤️"}
                              </h2>
                              <div className="group-hover:flex rounded-full hidden bg-gray-100">
                                  {emojis.map((emoji) => (
                                      <button
                                          key={emoji}
                                          onClick={() => handleReaction(emoji as Emoji)}
                                          className={clsx(
                                              "text-lg p-1 hover:bg-gray-300 rounded-full",
                                              isEmojiActive(emoji) && "bg-gray-200 text-white"
                                          )}
                                          title={`React with ${emoji}`}
                                      >
                                          {emoji}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className={clsx("flex px-7 gap-1", me && "flex-row-reverse")}>
                      {isLastMessage &&
                          seens.map((_user: SafeUser, i: number) => {
                              if (_user.id === user?.id) return null;
                              return <Avatar key={i} size="ss" user={_user} />;
                          })}
                  </div>

                  {!isDeleted && Object.keys(groupedReactions).length > 0 && (
                      <div className="flex gap-2 mt-2">
                          {Object.entries(groupedReactions).map(([emoji, count]) => (
                              <div
                                  key={emoji}
                                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
                              >
                                  <span className="text-sm">{emoji}</span>
                                  <span className="text-sm font-medium text-gray-600">
                                      {count}
                                  </span>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </>
  );
}