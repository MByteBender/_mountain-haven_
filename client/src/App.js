import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/homePage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Apartment1 from "./pages/apartment1";
import Impressum from "./pages/impressum";
import Admin from "./pages/adminOpenBookings";
import AdminLogin from "./pages/adminLogin";
import Register from "./pages/register";

import PrivateRoutes from "./components/PrivateRoute_new";

import PrivateRoute from "./components/PrivateRoute";

import AuthProvider from "./contexts/AuthProvider";
import OpenBookings from "./pages/openBookings";
import Blogs from "./pages/blogs";
import AdminContacts from "./pages/adminContacts";
import AdminNavbar from "./components/NavbarAdmin";
import Restaurants from "./pages/restaurants";
import Apartment2 from "./pages/apartment2";

function App() {
  const location = window.location.pathname.startsWith("/admin");

  console.log("LOVATIN: " + location);

  return (
    <Router>
      {location ? <AdminNavbar /> : <Navbar />}
      {/* give access to the Authprovider functions to the child components */}
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/apartment1" element={<Apartment1 />} />
            <Route exact path="/apartment2" element={<Apartment2 />} />

            <Route exact path="/impressum" element={<Impressum />} />

            <Route element={<PrivateRoutes />}>
              <Route element={<Admin />} path="/admin/openBookings" />
              <Route element={<AdminContacts />} path="/admin/contacts" />
            </Route>

            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/openBookings" element={<OpenBookings />} />
            <Route exact path="/restaurants" element={<Restaurants />} />

            <Route exact path="/blogs" element={<Blogs />} />
            <Route path="*" element={<Navigate to="/" />} />

            {/* <Route
              path="/admin/openBookings"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/contacts"
              element={
                <PrivateRoute>
                  <AdminContacts />
                </PrivateRoute>
              }
            /> */}
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
