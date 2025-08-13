import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import LeaveRequests from '../components/LeaveRequests';
import axios from 'axios';
import MyLeaveRequests from '../components/MyLeaveRequests';

const Leaves = () => {

    const { isAdmin } = useContext(AuthContext)

    if (isAdmin) {
        return <LeaveRequests />
    }
    return (
        <div>
            <MyLeaveRequests />
        </div>
    )
}

export default Leaves