import { createContext, useContext, useState } from "react";

const User = createContext();

const Context = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <User.Provider value={{ user, setUser }}>
            {children}
        </User.Provider>
    );
};

export const UserState = () => {
    return useContext(User);
};

export default Context;