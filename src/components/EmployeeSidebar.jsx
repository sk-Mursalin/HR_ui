
import { LayoutDashboard } from 'lucide-react';
import { Users } from 'lucide-react';
import { Building } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const EmployeeSidebar = () => {
    const {user} = useAuth()
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
            </div>
            <div>
                <NavLink to="/employee-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`} className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <Users />
                    <span>My Profile</span>
                </NavLink>
                {/* <NavLink to="/employee-dashboard/departments" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <Building />
                    <span>Department</span>
                </NavLink> */}
                <NavLink to="/employee-dashboard/leaves" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <Calendar />
                    <span>Leave</span>
                </NavLink>
            </div>
        </div>
    )
}
