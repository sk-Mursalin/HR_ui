
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import DepermentList from "./components/DepermentList";
import AdminSummary from "./components/AdminSummary";
import AddDeperment from "./components/AddDeperment";
import EditDeperment from "./components/EditDeperment";
import { EmplyeesList } from "./components/EmplyeesList";
import { EmployeeAdd } from "./components/EmployeeAdd";
import { EmployeeView } from "./components/EmployeeView";
import { EmployeeEdit } from "./components/EmployeeEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<AdminDashboard />}> </Route> */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepermentList />} />
          <Route path="add-department" element={<AddDeperment />} />
          <Route path="department/:id" element={<EditDeperment />} />
          <Route path="employees" element={<EmplyeesList />} />
          <Route path="add-employee" element={<EmployeeAdd />} />
          <Route path="employees/:id" element={<EmployeeView />} />
          <Route path="employees/edit/:id" element={<EmployeeEdit />} />
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;