import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'))
    const [user, setUser] = useState(() => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            try {
                return jwtDecode(storedToken)
            } catch (error) {
                localStorage.removeItem('authToken')
                return null
            }
        }
        return null
    })
    const navigate = useNavigate()

    const getUser = async () => {
        const userDetails = jwtDecode(token)
        console.log(user);

    }

    useEffect(() => {
        getUser()

    }, [])
    const value = {
        token, setToken, setUser, navigate
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider