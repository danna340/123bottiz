'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon, } from 'lucide-react';
import {usePathname} from 'next/navigation';
import { FreeCounter } from '@/components/FreeCounter';

type Props = {};

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-200'
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-200'
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700'
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: '/music',
        color: 'text-emerald-700'
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: '/code',
        color: 'text-green-700'
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        href: '/settings',
    },
];

interface SidebarProps {
    apiLimitCount: number, 
    isPro: boolean
}

const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
  }: SidebarProps) => {

    const pathname = usePathname();

    return (
        <div className='space-y-4 py-4 flex flex-col h-full bg-[#4A006F] text-white'>
            <div className='px-3 py-2 flex-1'>
                <Link href='/dashboard'
                    className='flex items-center mb-14 pl-3'
                >
                    <div className='relative w-8 h-8 mr-4'>
                        <Image fill alt="logo" src='/logo.png' sizes=''/>
                    </div>
                    <h1 className={cn('font-bold text-[22px] flex justify-center')}>123bottiz</h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map((route, index) => (
                        <Link href={route.href}
                            key={index}
                            className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', 
                            route.color,
                            {
                                'bg-white/10': pathname === route.href
                            })}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-4", route.color)}/>
                                <h1 className={cn('font-bold text-[16px] flex justify-center')}>{route.label}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* //USER LIMIT COUNTER */}
            <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro}/>
        </div>
    )
}

export default Sidebar