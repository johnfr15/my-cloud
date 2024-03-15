import SigninLayout from "../components/Signin/layout/SigninLayout"
import SigninContainer from "../components/Signin/container/LoginContainer"

const { VITE_SERVICE_BASE_PATH } = import.meta.env

const Login = () => {

  return (
    <SigninContainer url={`${VITE_SERVICE_BASE_PATH}/login`} signupPath={'/register'}>
      <SigninLayout />
    </SigninContainer>
  )
}

export default Login