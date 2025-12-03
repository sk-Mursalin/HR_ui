import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "../utils/depertmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";
import { DepartmentButtons } from "../utils/button";

export const DepermentList = () => {
    const [departments, setDepartments] = useState([])
    const [filteredDepartments, setFilteredDepartments] = useState([])


    const onDepartmentDelete = async (id) => {
        const data = departments.filter(dep => dep._id !== id)
        setDepartments(data)
    }
    
    useEffect(() => {
        const fetchDepartments = async () => {
            const responnse = await axios.get('http://localhost:5000/department', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (responnse.data.success) {
                let sno = 0;
                const data = await responnse.data.departments.map((dep) => (
                    {
                        _id: dep._id,
                        sno: ++sno,
                        dep_name: dep.dep_name,
                        action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                    }
                ))
                setDepartments(data)
                setFilteredDepartments(data)
            }
        }
        fetchDepartments();
    }, [])

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFilteredDepartments(records)
    }

    return (
        <div className="p-5">
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Seach By Dep Name' className='px-4 py-0.5 border' onChange={filterDepartments} />
                <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-600 rounded'>Add New Dep</Link>
            </div>
            <div className="mt-5">
                <DataTable columns={columns} data={filteredDepartments} />
            </div>
        </div>
    )
}

export default DepermentList