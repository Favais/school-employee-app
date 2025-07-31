import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import UnAuthorized from '../components/UnAuthorized'

const Employees = () => {
    const { isAdmin } = useContext(AuthContext)
    if (!isAdmin) {
        return <UnAuthorized />
    }
    return (
        <div>Employees</div>
    )
}

export default Employees