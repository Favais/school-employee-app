import { Button } from 'antd';
import React from 'react'
import { IoWarningOutline } from "react-icons/io5";
import { Navigate } from 'react-router-dom';

const UnAuthorized = () => {
    return (
        <div className='flex flex-col gap-5 items-center justify-center h-full'>
            <IoWarningOutline size={100} />
            <h2 className='text-3xl'>Access Denied</h2>
            <p className='text-lg'>You don’t have permission to access this page.</p>
            <Button type="primary" onClick={() => Navigate('/login')}>
                Go to Login
            </Button>
        </div>
    )
}

export default UnAuthorized