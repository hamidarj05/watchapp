
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import DashboardProducts from './dashboardProducts';

function Admin() {
  return (
    <> 
        <nav>
          <ul>
            <li>
              <Link to="/admin/products">Product Dashboard</Link>
              <Link to="/admin/products">Orders Dashboard</Link>
              <Link to="/admin/products">Users</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/admin/products" element={<DashboardProducts />} />
        </Routes> 
    </>
  );
}
export default Admin;