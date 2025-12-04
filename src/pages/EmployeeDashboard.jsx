import { Outlet } from "react-router-dom"
import { EmployeeSidebar } from "../components/EmployeeSidebar"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext";

const EmployeeDashboard = () => {

  const { loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;  // or a spinner
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