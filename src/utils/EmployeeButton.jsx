
import { useNavigate } from "react-router-dom"

export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate()

    // const handleDelete = async (id) => {
    //     try {
    //         const responnse = await axios.delete(
    //             `http://localhost:5000/department/${id}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 },
    //             }
    //         )

    //         if (responnse.data.success) {
    //             onDepartmentDelete(id)
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.data.success) {
    //             alert(error.response.data.error)
    //         }
    //     }
    // }
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600"
                onClick={() => { navigate(`/admin-dashboard/employees/${_id}`) }}
            >view</button>
            <button className="px-3 py-1 bg-red-600"
                onClick={() => { navigate(`/admin-dashboard/employees/edit/${_id}`) }}
            >Edit</button>
             <button className="px-3 py-1 bg-orange-300"
                // onClick={() => { handleDelete(_id) }}
            >Leave</button>
        </div>
    )
}