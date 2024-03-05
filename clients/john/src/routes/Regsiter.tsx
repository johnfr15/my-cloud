import SignupLayout from "../components/Signup/layout/SignupLayout"
import SignupContainer from "../components/Signup/container/SignupContainer"

const Register = () => {

  return (
    <SignupContainer url={'http://localhost:8080/auth/signup'} signinPath="/login">
      <SignupLayout />
    </SignupContainer>
  )
}

export default Register