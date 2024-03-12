import SignupLayout from "../components/Signup/layout/SignupLayout"
import SignupContainer from "../components/Signup/container/SignupContainer"

const { VITE_AUTHENTICATION_HOST } = import.meta.env

const Register = () => {

  return (
    <SignupContainer url={`${ VITE_AUTHENTICATION_HOST }/auth/signup`} signinPath="/login">
      <SignupLayout />
    </SignupContainer>
  )
}

export default Register