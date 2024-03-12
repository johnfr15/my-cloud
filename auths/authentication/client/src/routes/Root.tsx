import { Outlet } from "react-router"
import Navbar from "../components/Layout/Navbar"
import Dasboard from "../components/Layout/Dashboard"
import { UserProvider } from "../provider/UserProvider"

const Root = () => 
{
  return (
    <UserProvider>
        <Navbar />
        <Dasboard />
        <Outlet />
    </UserProvider>
  )
}

export default Root