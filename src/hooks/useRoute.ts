import { useLocation } from 'react-router-dom'
import ChatIcon from '../assets/icons/chat.svg'
import HomeIcon from '../assets/icons/home.svg'

export const useRoutes = () => {
    const { pathname } = useLocation()

    return [
        {
            href: '/',
            active: pathname === '/',
            icon: HomeIcon,
            alt: 'home'
        },
        {
            href: '/conversation',
            active: pathname.startsWith('/conversation'),
            icon: ChatIcon,
            alt: 'chat'
        },
    ]
}