import React, { useState } from "react"
import { useNavigate } from "react-router-dom";


interface LoginContainerProps {
    url: string;

    newRegister?: ( value: FormValues ) => void;
    extraDatas?: { [key: string]: any };
    headers?: { [key: string]: any };
    redirection?: string 
}

type FormValues = {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    remember: boolean;
}

const defaultProps: LoginContainerProps = {
    url: "http://localhost:8000/",
    redirection: '/',
}

const SignupContainer = ( props: LoginContainerProps & any ) => 
{
    /***********************************|
    |               STATE               |
    |__________________________________*/
    const { newRegister, url, extraDatas, headers, redirection } = { ...defaultProps, ...props } as LoginContainerProps;
    const [errorRegistering, setErrorRegistering] = useState<string | undefined>(undefined);
    const navigate = useNavigate()




    
    /***********************************|
    |              LOGIC                |
    |__________________________________*/
    const register = async( value: FormValues ) => {

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

            if ( response.ok === false ) throw response;
            if ( response.redirected ) navigate(redirection!)


            setErrorRegistering(undefined)

        } catch (error: any) {

            let message = 'An error occured'

            if ( error instanceof Error )
                error.message
            if ( [409, 500].includes(error.statusCode || error.status) )
                message = error.message

            setErrorRegistering(message)

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
                register: newRegister || register, 
                errorRegistering,
                ...props
            } 
        )
    }
    
    return <></> 
}

export default SignupContainer