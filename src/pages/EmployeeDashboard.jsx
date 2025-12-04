import { Outlet, useNavigate } from "react-router-dom"
import { EmployeeSidebar } from "../components/EmployeeSidebar"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext";

const EmployeeDashboard = () => {
  const navigate = useNavigate()
  const { loading, user } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;  // or a spinner
  }
  if (!user) {
    navigate("/login")
  }
  return (
    <div className='flex'>
      <EmployeeSidebar />
      <div className='flex-1 ml-64'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard