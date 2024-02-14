// UserContext.js
import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({ email: localStorage.getItem('userEmail') || null });

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail && !user.email) {
            setUser({ email: userEmail });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
