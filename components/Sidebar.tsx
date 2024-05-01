"use client"
import { sidebarLinks } from '@/constants/SidebarLinks';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function Sidebar() {
    const pathName = usePathname();
  return (
    <section className='sticky top-0 left-0 w-fit h-screen flex-col bg-dark-1
     justify-between p-6 pt-28 text-white max-sm:hidden lg:w-[264px]' style={{backgroundColor: "#1C1F2E"}}>
        <div className='flex flex-col flex-1 gap-6'>
            {sidebarLinks.map((link) => {
                const isActive = pathName === link.route || pathName.startsWith(link.route);

                return (
                    <Link 
                        href={link.route} 
                        key={link.label}
                        className={cn('flex items-center p-4 rounded-lg justify-start',
                        {'bg-blue-1': isActive,}
                        )}
                        style={{gap: "1rem",}}
                    >
                        <Image 
                            src={link.icon} 
                            alt={link.label} 
                            width={24} 
                            height={24} 
                        />
                        <p className='text-lg font-semibold max-lg:hidden'>
                            {link.label}
                        </p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar