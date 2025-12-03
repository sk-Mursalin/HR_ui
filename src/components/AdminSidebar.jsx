
import { LayoutDashboard } from 'lucide-react';
import { Users } from 'lucide-react';
import { Building } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const AdminSidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
            </div>
            <div>
                <NavLink to="/admin-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <Users />
                    <span>Employees</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <Building />
                    <span>Department</span>
                </NavLink>
                <NavLink to="/admin-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <Calendar />
                    <span>Leave</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar
