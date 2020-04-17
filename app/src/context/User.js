import React, { createContext, useState } from 'react';

export const UserContext = createContext();
const UserProvider = ({children}) =>{
    const [user, setUser] = useState(
        {}
    );
    const saveUser = user => {
        setUser(user);
    }
    return (
        <UserContext.Provider value={{ user, saveUser }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;