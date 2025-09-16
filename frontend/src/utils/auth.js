import { createContext, useContext, useState} from 'react';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const login = (user) => {

        setUser(user);
        localStorage.setItem('jwt', `${user.token}`);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jwt');
    }
    return (<AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(AuthContext);
}
