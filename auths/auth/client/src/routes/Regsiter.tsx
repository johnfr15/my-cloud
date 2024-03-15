import SignupLayout from "../components/Signup/layout/SignupLayout"
import SignupContainer from "../components/Signup/container/SignupContainer"

const { VITE_SERVICE_BASE_PATH } = import.meta.env

const Register = () => {

  return (
    <SignupContainer url={`${VITE_SERVICE_BASE_PATH}/signup`} signinPath="/login">
      <SignupLayout />
    </SignupContainer>
  )
}

export default Register