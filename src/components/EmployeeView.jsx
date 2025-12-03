import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EmployeeView = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const responnse = await axios.get(
                    `http://localhost:5000/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )

                console.log(responnse);

                if (responnse.data.success) {
                    console.log(responnse.data.employee);
                    setEmployee(responnse.data.employee)
                }
            } catch (error) {
                if (error.response && error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchEmployee()
    }, [])
    if (!employee) return

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                        className="rounded-full border w-72"
                    />
                </div>
                <div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="font-medium">{employee.userID.name}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">EmployeeId:</p>
                        <p className="font-medium">{employee.employeeID}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Gender:</p>
                        <p className="font-medium">{employee.gender}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="font-medium">{employee.department.dep_name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
