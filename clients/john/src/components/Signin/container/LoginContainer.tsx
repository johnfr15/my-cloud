import React, { useState } from "react"
import { useNavigate } from "react-router-dom";


interface LoginContainerProps {
    url: string;

    newLogin?: ( value: FormValues ) => void;
    extraDatas?: { [key: string]: any };
    headers?: { [key: string]: any };
    redirection?: string
}

type FormValues = {
    email: string;
    password: string;
    remember: boolean;
}

const defaultProps: LoginContainerProps = {
    url: "http://localhost:8000/",
    redirection: "/",
}

const SigninContainer = ( props: LoginContainerProps & any ) => 
{
    /***********************************|
    |               STATE               |
    |__________________________________*/
    const { newLogin, url, extraDatas, headers } = { ...defaultProps, ...props } as LoginContainerProps;
    const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);
    const navigation = useNavigate()





    /***********************************|
    |          BUSINESS LOGIC           |
    |__________________________________*/
    const login = async( value: FormValues ) => {

        try {

            // Send POST request to server pointed by url
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    ...headers,
                },
                body: JSON.stringify({ ...extraDatas, ...value }),
            })

            if ( response.ok === false ) 
            {
                const data = await response.json()
                throw data;
            }

            if ( response.redirected ) 
                navigation("/")

            setErrorLogin(undefined)

        } catch (error: any) {

            let message = 'An error occured'

            if ( error instanceof Error )
                error.message
            if ( error.statusCode === 401 )
                message = error.message

            setErrorLogin(message)

        }
    };





    /***********************************|
    |           WRAP LAYOUT             |
    |__________________________________*/
    // If the container has children return the Layout with the business logic or nothing
    if ( React.isValidElement(props.children) )
    {
        return React.cloneElement( 
            props.children, 
            { 
                login: newLogin || login, 
                errorLogin,
                ...props
            } 
        )
    }
    
    return <></> 
}

export default SigninContainer