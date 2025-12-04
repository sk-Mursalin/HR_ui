import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { columns, LeaveButtons } from '../../utils/leaveHelper'

export const AdminLeaveView = () => {

    const [leaves, setLeaves] = useState(null)
    useEffect(() => {
        const fetcleaves = async () => {
            const responnse = await axios.get('http://localhost:5000/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (responnse.data.success) {
                console.log(responnse);
                let sno = 1;
                const data = await responnse.data.leaves.map((leave) => (
                    {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeID,
                        name: leave.employeeId.userID.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.dep_name,
                        days:
                            new Date(leave.endDate).getDate() -
                            new Date(leave.startDate).getDate(),
                        status: leave.status,
                        action: <LeaveButtons Id={leave._id} />,
                    }
                ))
                setLeaves(data)

            }
        }
        fetcleaves();
    }, [])

    if (!leaves) return
    return (
        <div className="p-5">
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Leaves</h3>
            </div>
            {/* <div className='flex justify-between items-center'>
                <input type="text" placeholder='Seach By Dep Name' className='px-4 py-0.5 border' />
                <div className="space-x-3">
                    <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">Pending</button>
                    <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">Approved</button>
                    <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">Rejected</button>
                </div>
            </div> */}
            <div className='mt-3'>
                <DataTable columns={columns} data={leaves} />

            </div>
        </div>
    )
}
