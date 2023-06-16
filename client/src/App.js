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
} from "react-router-dom";

import HomePage from "./pages/homePage";
import { Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import BookApartment from "./components/BookApartment";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Apartment1 from "./pages/apartment1";
import Impressum from "./pages/impressum";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/apartment1" element={<Apartment1 />} />
          <Route exact path="/impressum" element={<Impressum />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
