import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditDeperment = () => {
    const [departments, setDepartments] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const responnse = await axios.get(
                    `http://localhost:5000/department/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )

                if (responnse.data.success) {
                    setDepartments(responnse.data.department)
                }
            } catch (error) {
                if (error.response && error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchDepartments()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartments({ ...departments, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`https://hr-server-eight.vercel.app/department/${id}`, departments, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if (error.response && error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="dep_name"
                        className="text-sm font-medium text-gray-700"
                    >
                        Department Name
                    </label>
                    <input
                        type="text"
                        name="dep_name"
                        onChange={handleChange}
                        placeholder="Department Name"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                        value={departments.dep_name}
                    />
                </div>
                <div className="mt-3">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        placeholder="Description"
                        value={departments.description}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Edit Department
                </button>
            </form>
        </div>
    )
}

export default EditDeperment