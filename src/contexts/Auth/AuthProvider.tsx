import { useState } from "react";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { useApiLogin } from "../../services/api";


export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const api = useApiLogin();

    const validateToken = async () => {
        const storageData = localStorage.getItem('authToken');

        if (storageData) {
            const data = await api.validateToken(storageData);

            if (data.id) {
                if (!user) {
                    setUser(data);
                }
            }
        }
    }
    validateToken();

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if (data.access_token) {
            setToken(data.access_token);            
            const userData = await api.me(data.access_token);

            if (userData.id) {
                setUser(userData);
            }
            return true;
        }
        return false;
    }

    const signout = async () => {
        const storageData = localStorage.getItem('authToken');
        if (storageData) {
            await api.logout(storageData);
            setUser(null);
            setToken('');
        }
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}