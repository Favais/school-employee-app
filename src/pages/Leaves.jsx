import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import LeaveRequests from '../components/LeaveRequests';
import axios from 'axios';
import MyLeaveRequests from '../components/MyLeaveRequests';

const Leaves = () => {

    const { isAdmin } = useContext(AuthContext)

    if (isAdmin) {
        return <div className='p-4'><LeaveRequests /></div>
    }
    return (
        <div className='p-4'>
            <MyLeaveRequests />
        </div>
    )
}

export default Leaves