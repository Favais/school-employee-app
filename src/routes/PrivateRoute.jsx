import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { token, navigate } = useContext(AuthContext)
    if (!token) {
        return <Navigate to={'/login'} />
    }
    return children

}

export default PrivateRoute