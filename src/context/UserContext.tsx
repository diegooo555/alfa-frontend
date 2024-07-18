import { useState, useEffect, ReactNode, createContext } from "react";
import { registerRequest, loginUser, verifyTokenRequest } from "../api/user";
import Cookies from 'js-cookie';

interface ChildrenProps {
    children: ReactNode;
}

interface UserRegister {
    name: string,
    email: string,
    password: string,
}

interface UserLogin {
    email: string,
    password: string,
}

interface AuthUser {
    id: number,
    email: string,
}

interface UserContextType {
    user: AuthUser ,
    setUser: React.Dispatch<React.SetStateAction<{
        id: number;
        email: string;
    }>>,
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    signup: (user: UserRegister) => Promise<void>,
    signin: (user: UserLogin) => Promise<void>,
    logOut: () => void,
}

export const AuthContext = createContext<UserContextType | null>(null);

export const AuthProvider = ({ children }: ChildrenProps) => {

    const [user, setUser] = useState({
        id: 0,
        email: "Indefinido",
    })
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const signup = async (user: UserRegister): Promise<void> => {

        try {
            const res = await registerRequest(user)
            setUser(res)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const signin = async (user: UserLogin): Promise<void> => {
        try {
            const res = await loginUser(user)
            setUser(res)
            setIsAuthenticated(true)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            
            try {
                const res = await verifyTokenRequest();
                if (!res) return setIsAuthenticated(false);        
                setIsAuthenticated(true);
                setUser(res);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
                console.log(error)
            }
        };
        checkLogin();
    }, [loading]);

    const logOut = () => {
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser({
            id: 0,
            email: "Indefinido",
        })
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading, signup, signin, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}