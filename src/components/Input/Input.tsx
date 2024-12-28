import { FieldValues, Path, UseFormRegister } from 'react-hook-form';



interface InputProps<T extends FieldValues> {
    label?: string;
    name: Path<T>; 
    register: UseFormRegister<T>;
    required?: boolean;
    placeholder: string
    type: 'email' | 'password' | 'text' | 'number'
}

export default function Input<T extends FieldValues>({
    label,
    name,
    register,
    required,
    placeholder,
    type
}: InputProps<T>) {
  return (
    <div>
      {label && <label className='text-[#828282] font-semibold text-[14px]'>{label}</label>}
      <input className='w-full rounded-[5px] px-[10px] py-[13px] h-[45px] border border-[#DED2D9] placeholder:text-[#E0E0E0] text-black bg-transparent' placeholder={placeholder} type={type} {...register(name, { required })} />
    </div>
  )
}
