import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface UserContextType {
    children?: React.ReactNode
    user?: {[key: string]: any}
    isLogged?: boolean
    logout?: () => void
}


const UserContext = createContext<UserContextType>({});



export const UserProvider = (props: UserContextType) => 
{
    /***********************************|
    |               STATE               |
    |__________________________________*/
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate()





    /***********************************|
    |              PRIVATE              |
    |__________________________________*/
    const _init = useCallback(async() => 
    {
        const isLogged = await _isLogged()

        if ( isLogged === false )
            navigate("/login")

    }, [navigate])

    const _isLogged = async() => 
    {
        try {

            const response = await fetch("http://localhost:8080/user", {
                method: 'GET'
            })
            const data = await response.json()
    
            console.log( data )
            setIsLogged( data.isAuthenticated )
            setUser( data )
    
            return data.isAuthenticated

        } catch (error) {

            return false

        }
    }





    /***********************************|
    |              PUBLIC               |
    |__________________________________*/
    const logout = () => {
        setIsLogged(false)
    };





    /***********************************|
    |            CONSTRUCTOR            |
    |__________________________________*/
    useEffect( () => {
        _init()
    }, [_init])


    return (
        <UserContext.Provider value={{ isLogged, user, logout }}>
        {props.children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);