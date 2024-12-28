import clsx from 'clsx'

interface ButtonProps {
    title: string,
    onClick?: () => void
    type: 'submit' | 'button',
    img?: string,
    size?: 'sm' | 'lg',
    className?: string
    disabled?: boolean
}

export default function Button({
    title,
    onClick,
    type,
    img,
    size,
    className,
    disabled
}: ButtonProps) {
  return (
    <button 
        onClick={onClick} 
        type={type}
        disabled={disabled}
        className={clsx(
          "text-white font-medium rounded-lg text-center gap-2 items-center",
          size === 'sm' && 'px-2 min-w-[100px] flex justify-center items-center py-1.5 text-[12px]',
          size === 'lg' && 'h-[50px] text-lg',
          !size && 'px-5 py-2.5 text-sm',
          className ? className : 'bg-[#6e00ff] hover:bg-[#6c2fbb] disabled:bg-[#b483f5]'
        )}
    >
        {title}
        {img && <img className='w-4 h-4' src={img} alt={'icon'}/>}
    </button>
  )
}
