import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'))
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const [allUsers, setAllUsers] = useState()
    const [leaves, setLeaves] = useState()
    const [user, setUser] = useState(() => {
        if (token) {
            return jwtDecode(token)
        } else
            return null
    })

    const navigate = useNavigate()
    const getAllUsers = async () => {
        if (isAdmin) {
            const res = await axios.get('/api/employees')
            setAllUsers(res.data.users)
        }
    }
    const getUser = async () => {
        if (user) {
            try {
                setIsAuthenticated(true)
                if (user && user.role === 'admin') {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            } catch (error) {
                console.log(error.message);

                // localStorage.removeItem('authToken')
                return null
            }
        }
        return null
    }

    const logoutUser = () => {
        localStorage.removeItem('authToken')
        setToken(null)
        setUser(null)
        // delete axios.defaults.headers.common['Authorization']
        navigate('/login')
    }

    useEffect(() => {
        getUser()

    }, [token, user])

    useEffect(() => {
        getAllUsers()
    }, [isAdmin, user])



    const value = {
        token, user, setToken, setUser, navigate, logoutUser, setIsAdmin, isAdmin, allUsers, leaves, setLeaves
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider