import Image from 'next/image'
import React from 'react'

type Props = {}

export const Loader = (props: Props) => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center'>
        <div className='w-10 h-10 relative animate-spin'>
            <Image 
                alt='logo'
                fill
                src="/logo.png"
                sizes=''/>
        </div>
        <p className='text-muted-foreground'>
            123bottiz are thinking...
        </p>
    </div>
  )
}