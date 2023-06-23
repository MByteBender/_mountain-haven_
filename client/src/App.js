import logo from "./logo.svg";
import "./App.css";
import AboutUs from "./components/AboutUs";
import styles from "./styles/Home.module.css";
import Hero from "./components/Hero";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/homePage";
import { Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import BookApartment from "./components/BookApartment";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Apartment1 from "./pages/apartment1";
import Impressum from "./pages/impressum";
import Admin from "./pages/adminOpenBookings";
import AdminLogin from "./pages/adminLogin";
import Register from "./pages/register";

import PrivateRoute from "./components/PrivateRoute";

import AuthProvider from "./contexts/AuthProvider";
import OpenBookings from "./pages/openBookings";
import Blogs from "./pages/blogs";
import AdminContacts from "./pages/adminContacts";
import AdminNavbar from "./components/NavbarAdmin";
import Restaurants from "./pages/restaurants";

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
            <Route exact path="/impressum" element={<Impressum />} />
            <Route
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
            />
            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/openBookings" element={<OpenBookings />} />
            <Route exact path="/restaurants" element={<Restaurants />} />

            <Route exact path="/blogs" element={<Blogs />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
