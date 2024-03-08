import SigninLayout from "../components/Signin/layout/SigninLayout"
import SigninContainer from "../components/Signin/container/LoginContainer"

const { VITE_AUTHENTICATION_HOST } = import.meta.env

const Login = () => {

  return (
    <SigninContainer url={`${ VITE_AUTHENTICATION_HOST }/auth/login`} signupPath={'/register'}>
      <SigninLayout />
    </SigninContainer>
  )
}

export default Login