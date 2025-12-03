import { Outlet } from "react-router-dom"
import { EmployeeSidebar } from "../components/EmployeeSidebar"
import Navbar from "../components/Navbar"

const EmployeeDashboard = () => {
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