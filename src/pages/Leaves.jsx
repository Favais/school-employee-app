import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import LeaveRequests from '../components/LeaveRequests';
import axios from 'axios';

const Leaves = () => {

    const { isAdmin } = useContext(AuthContext)

    if (isAdmin) {
        return <LeaveRequests />
    }
    return (
        <div>
            Leaves
        </div>
    )
}

export default Leaves