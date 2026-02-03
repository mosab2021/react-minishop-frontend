import { createContext, use, useContext, useEffect, useState } from "react";
const UserContext = createContext();
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedin, setIsLoggedin] = useState(false)
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
            setIsLoggedin(true)
        }
    }, [])
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setIsLoggedin(true)
        }
        else {
            localStorage.removeItem('user')
            setIsLoggedin(false)
        }
    }, [user])
    const signUp = (username, password) => {
        const newUser = { username, password }
        localStorage.setItem('registeredUser', JSON.stringify(newUser))
        setUser(newUser)

    }
    const Login = (username,password)=>{
        const stored = JSON.parse(localStorage.getItem('registeredUser'))
        if(stored && stored.username === username && stored.password === password){
            setUser(stored)
        }
        else{
            return(false)
        }
    }
    const Logout = ()=>{
        setUser(null);
    }
    return(
            <UserContext.Provider
                value={{
                    user,
                    isLoggedin,
                 signUp,
                 Logout,
                 Login,

                }}
            >
                {children}
            </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext);
