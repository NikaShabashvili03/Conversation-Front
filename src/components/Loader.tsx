import { BounceLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
       <BounceLoader 
            size={60}
            color='#6e00ff'
       />
    </div>
  )
}
