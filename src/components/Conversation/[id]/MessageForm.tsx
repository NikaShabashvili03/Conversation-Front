import { SubmitHandler, useForm } from "react-hook-form";
import SendIcon from '../../../assets/icons/send.svg'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { sendMessages } from "../../../redux/slices/messagesSlice";
import { useContext, useState } from "react";
import { TypingSocketContext } from "../../../context/TypingContext";

interface IMessageForm {
    body: string;
}

interface MessageFormProps {
    id: number
}

export default function MessageForm({
    id
}: MessageFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [disabled, setDisabled] = useState(false)
  const typingSocket = useContext(TypingSocketContext)

  const handleTyping = (isTyping: boolean) => {
    if (typingSocket) {
      typingSocket.send(JSON.stringify({ 
        is_typing: isTyping,
      }));
    }
  };

  const { register, handleSubmit, reset } = useForm<IMessageForm>({
    defaultValues: {
        body: '',
    }
  });

  const onSubmit: SubmitHandler<IMessageForm> = async (data) => {
      try {
        setDisabled(true)
        dispatch(sendMessages({
            id: id,
            body: data.body
        })).then(() => {
            setDisabled(false)
            reset()
        })
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Login failed. Please try again.');
      }
  };

  const handleFocusOrChange = (e: React.FocusEvent<HTMLInputElement>) => {
    handleTyping(e.target.value.length > 0);
  };

  return (
    <div className="h-[10%] w-full">
      <form className="flex w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
      <input
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => handleFocusOrChange(e)}
          disabled={false}
          className="w-full h-[60px] px-5 bg-[#EFF6FC] rounded-[25px] border-none outline-none"
          {...register("body", { required: true, onBlur: () => handleTyping(false), onChange: (e) => handleFocusOrChange(e) })} 
        />
        <button disabled={disabled} type="submit" className="bg-[#6E00FF] rounded-[20px] h-[60px] w-[65px] flex justify-center items-center">
            <img src={SendIcon} alt="send" className="w-[28px] h-[28px]"/>
        </button>
      </form>
    </div>
  )
}
