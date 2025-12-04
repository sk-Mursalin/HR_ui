import axios from "axios";
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { EmployeeButtons } from "../utils/EmployeeButton";
import { columns } from "../utils/employeeHelper";

export const EmplyeesList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const responnse = await axios.get('https://hr-server-eight.vercel.app/employee', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (responnse.data.success) {
                let sno = 0;
                const data = await responnse.data.employees.map((emp) => (
                    {
                        _id: emp._id,
                        sno: ++sno,
                        dep_name: emp.department.dep_name,
                        name: emp.userID.name,
                        action: (<EmployeeButtons _id={emp._id} />)
                    }
                ))
                setEmployees(data)

            }
        }
        fetchEmployees();
    }, [])

    return (
        <div className="p-6">
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Seach By Dep Name' className='px-4 py-0.5 border bg-amber-50' />
                <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-600 rounded'>Add New Employee</Link>
            </div>
            <div className="mt-5">
                <DataTable columns={columns} data={employees} />
            </div>
        </div>
    )
}

