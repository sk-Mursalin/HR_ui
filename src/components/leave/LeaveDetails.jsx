import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const LeaveDetails = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const responnse = await axios.get(
                    `https://hr-server-eight.vercel.app/leave/details/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )

                console.log(responnse);

                if (responnse.data.success) {
                    console.log(responnse.data.leave);
                    setLeave(responnse.data.leave)
                }
            } catch (error) {
                if (error.response && error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchLeave()
    }, [])

    const changeStatus = async (id, status) => {
        try {
            const responnse = await axios.put(
                `https://hr-server-eight.vercel.app/leave/${id}`,{status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )

            console.log(responnse);

            if (responnse.data.success) {
                console.log(responnse.data.employee);
                navigate("/admin-dashboard/leaves")
            }
        } catch (error) {
            if (error.response && error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }


    if (!leave) return

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Leave Details
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
                        <p className="font-medium">{leave.employeeId.userID.name}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">EmployeeId:</p>
                        <p className="font-medium">{leave.employeeId.employeeId}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Gender:</p>
                        <p className="font-medium">{leave.employeeId.gender}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="font-medium">{leave.employeeId.department.dep_name}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Leave Type:</p>
                        <p className="font-medium">{leave.leaveType}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Reason:</p>
                        <p className="font-medium">{leave.reason}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Start Date:</p>
                        <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">End Date:</p>
                        <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">{leave.status == "pending" ? "Actions :" : "Status:"}</p>
                        {leave.status === "Pending" ? (
                            <div className="flex space-x-2">
                                <button className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400 rounded text-gray-800" onClick={() => { changeStatus(leave._id, "Approved") }}>Approve</button>
                                <button className="px-2 py-0.5 bg-red-400 hover:bg-red-600 rounded text-gray-800" onClick={() => { changeStatus(leave._id, "Rejected") }}>Reject</button>
                            </div>
                        ) : (
                            <p className="font-medium">{leave.status}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

