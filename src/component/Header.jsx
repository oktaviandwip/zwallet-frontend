import { Bell } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './parts/avatar'
import { Button } from './parts/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './parts/dropdownMenu'

function Header() {
  const { profile } = useSelector((s) => s.profile)

  const [showBellNotif, setShowBellNotif] = useState(false)
  const showBellNotifHandler = (e) => {
    e.preventDefault()
    setShowBellNotif(!showBellNotif)
  }
  return (
    <header className='bg-white py-4 rounded-3xl shadow-lg'>
      <div className='container max-w-desktop mx-auto md:p-0 p-3 '>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='hidden sm:flex items-center justify-center sm:justify-start'>
            <h1 className='text-primary px-3 text-[29px]'>Zwallet</h1>
          </div>
          <div className='flex gap-2 items-center justify-between w-full sm:w-fit px-2'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-12 w-12 flex rounded-md'>
                <AvatarImage src={profile.image} alt={profile.username} />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className='grid gap-1 *:text-dark '>
                <span className='sm:hidden text-[#3A3D42E5]'>Hello,</span>
                <p className='text-lg  font-bold leading-none'>
                  {profile.email}
                </p>
                <p className='text-[13px] hidden sm:block'>{profile.phone}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='secondary'
                    size='icon'
                    className='rounded-full'>
                    <Bell className='h-6 w-6 text-dark' />
                    <span className='sr-only'>Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className='hover:bg-gray-200 p-2'>
                      <p className='text-xs  dark:text-neutral-500'>
                        2 hours ago
                      </p>
                      <span className='block  text-base font-semibold dark:text-neutral-300'>
                        Eilis Warner
                      </span>
                      <p className='text-sm  dark:text-neutral-500'>
                        changed an issue from “in Progress” to “Review”
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <div className='flex items-center gap-3'>
              <img
                className='h-[48px] w-[48px] rounded-lg'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
              <div>
                <span className='sm:hidden text-[#3A3D42E5]'>Hello,</span>

                <p className='bold'>Robert Chandler</p>
                <span className='hidden sm:block text-[#3A3D42E5]'>
                  +62 8139 3877 7946
                </span>
              </div>
            </div>
            <div className='relative ml-3 '>
              <img src={iconBell} alt='' onClick={showBellNotifHandler} />

              <div
                className={`${
                  showBellNotif ? ' block' : ' hidden'
                } absolute right-0 z-10 mt-2 w-48 origin-top-right p-3 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex='-1'>
                <p>Transaction History</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
