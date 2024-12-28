import { Link, Outlet } from 'react-router-dom'
import { useRoutes } from '../hooks/useRoute'
import clsx from 'clsx'
import Avatar from './Avatar/Avatar'
import { useAuth } from '../context/AuthContext'
import PrivateRoute from './PrivateRoute'
import LogoutIcon from '../assets/icons/logout.svg'

export default function Aside() {
  const routes = useRoutes()
  const { user, logout } = useAuth()
  
  return (
    <PrivateRoute>
      <div className='h-dvh w-full p-10 gap-10 flex justify-center items-center bg-[#EFF6FC]'>
        <div className='w-[133px] py-5 bg-[#6E00FF] flex flex-col justify-between items-center rounded-[25px] h-full'>
              <div className='w-full flex justify-center items-center flex-col gap-10'>
                <Avatar onlineIndicator bordered size='lg' user={user}/>
                <ul className='w-full flex flex-col gap-2'>
                  {routes.map(({ icon, active, href, alt }, i: number) => (
                    <li key={i} className='h-[68px] w-full'>
                      <Link className={clsx(
                        'w-full h-full flex justify-center relative items-center',
                        active ? "bg-[#612DD1]" : "bg-transparent"
                      )} to={href}>
                        <img className='w-[30px] h-[30px] object-cover' src={icon} alt={alt}/>
                        <div className={clsx(
                          'w-[5px] h-full absolute right-0 bg-[#F3B559]',
                          active ? 'block' : "hidden"
                        )}></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={logout}>
                  <img src={LogoutIcon} className='w-[33px] h-[33px] aspect-square' alt='logout'/>
              </button>
        </div>
        <div className='w-full h-full'>
          <Outlet/>
        </div>
      </div>
    </PrivateRoute>
  )
}
