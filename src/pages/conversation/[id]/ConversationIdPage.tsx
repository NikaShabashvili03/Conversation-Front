import { useParams } from "react-router-dom";
import SingleConversation from "../../../components/Conversation/[id]/SingleConversation";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchConversation } from "../../../redux/slices/conversationSlice";
import { MessageContext } from "../../../context/MessageContext";
import { TypingContext } from "../../../context/TypingContext";

export default function ConversationIdPage() {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { conversation, status } = useSelector((state: RootState) => state.conversation)

  const isLoading = useMemo(() => status === 'loading' || status === 'idle', [status]);

  useEffect(() => {
    dispatch(fetchConversation({ id: id ? parseInt(id) : null }))
  }, [dispatch, id])

  if (isLoading) return <div>Loading...</div>
  
  if(!conversation) return <div>Conversation Not Found</div>

  return (
    <MessageContext id={id}>
      <TypingContext id={id}>
        <SingleConversation {...conversation}/>
      </TypingContext>
    </MessageContext>
  )
}
