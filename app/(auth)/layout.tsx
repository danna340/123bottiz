import React from 'react'

type Props = {}

const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
  return (
    <div>
        <h1 className='flex justify-center items-center mt-5 text-[42px]'>123bottiz</h1>
        <span className='flex justify-center items-center mt-2 text-[22px]'>powered by 123labz.</span>
        <div className='flex justify-center items-center h-full'>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout