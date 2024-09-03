import { createContext, useContext, useState, useEffect, Children } from "react";

import { getCurrentUser } from '../lib/appwrite'

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then((response) => {
            if (response) {
                setIsLogged(true);
                setUser(response);
            } else {
                setIsLogged(false);
                setUser(null);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                loading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;