import { useEffect, useState } from "react"
import { fetchDepartments } from "../utils/employeeHelper"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export const EmployeeEdit = () => {

    const [employee, setEmployee] = useState({
        name: '',
        department: ""
    })
    const [departments, setDepartments] = useState([])
    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
           
        }
        getDepartments()


    }, [])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const responnse = await axios.get(
                    `https://hr-server-eight.vercel.app/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )

                console.log(responnse);

                if (responnse.data.success) {
                    console.log(responnse.data.employee);
                    const employee = responnse.data.employee
                    setEmployee((prev) => ({ ...prev, name: employee.userID.name, department: employee.department }))
                }
            } catch (error) {
                if (error.response && error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchEmployee()
    }, [])

    console.log(departments);

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `https://hr-server-eight.vercel.app/employee/${id}`,
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    if (!employee && !departments) return
    console.log(departments);
    return (
        <div>
            <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={employee?.name}
                                onChange={handleChange}
                                placeholder="Insert Name"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Department
                            </label>
                            <select
                                name="department"
                                onChange={handleChange}
                                value={employee?.department}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Edit Employee
                    </button>
                </form>
            </div>
        </div >
    )
}

