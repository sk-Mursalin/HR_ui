
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import AdminSidebar from '../components/AdminSidebar';
import Navbar from '../components/Navbar';


const AdminDashboard = () => {

    const { user, loading } = useAuth();
    const navigate = useNavigate();
    if (loading) {
        return <p>loading..</p>
    }
    if (!user) {
        navigate("/login")
    }
    console.log(user);
    return (
        <div className='flex'>
            <AdminSidebar />
            <div className='flex-1 ml-64'>
                <Navbar />
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminDashboard