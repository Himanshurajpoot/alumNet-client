import { createContext, useContext, useState, useEffect} from 'react';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check localStorage on mount to restore user session
    useEffect(() => {
        const checkStoredUser = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const storedJwt = localStorage.getItem('jwt');
                
                if (storedUser && storedJwt) {
                    const userData = JSON.parse(storedUser);
                    // Ensure the user data has the token
                    if (userData && userData.token) {
                        setUser(userData);
                    } else {
                        // If user data exists but no token, clear it
                        localStorage.removeItem('user');
                        localStorage.removeItem('jwt');
                    }
                }
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                // Clear corrupted data
                localStorage.removeItem('user');
                localStorage.removeItem('jwt');
            } finally {
                setIsLoading(false);
            }
        };

        checkStoredUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('jwt', userData.token);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
