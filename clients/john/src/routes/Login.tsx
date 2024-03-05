import SigninLayout from "../components/Signin/layout/SigninLayout"
import SigninContainer from "../components/Signin/container/LoginContainer"

const Login = () => {

  return (
    <SigninContainer url={'http://localhost:8080/auth/login'} signupPath={'/register'}>
      <SigninLayout />
    </SigninContainer>
  )
}

export default Login