import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { getUser } from "../services/AuthService";

type UserContextProps = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoading: boolean;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps>(null!);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('AUTH_TOKEN');
            if(!token) {
                setIsLoading(false);
                return;
            }
            
            const userData = await getUser();
            if(userData) {
                setUser(userData);
            }
            setIsLoading(false);
        }
        fetchUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, logout }}>
            {children}
        </UserContext.Provider>
    )
}