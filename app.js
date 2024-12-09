import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <Router>
      <div>
        <nav style={style.navbar}>
          <h1 style={style.logo}>BookStore</h1>
          <ul style={style.navLinks}>
            <li><Link to="/" style={style.link}>Home</Link></li>
            <li><Link to="/books" style={style.link}>Books</Link></li>
            <li><Link to="/cart" style={style.link}>Cart</Link></li>
            <li><Link to="/about-us" style={style.link}>About Us</Link></li>
            <li><Link to="/contact-us" style={style.link}>Contact Us</Link></li>
          </ul>
        </nav>
        <div style={style.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#6200ea",
    padding: "10px 20px",
  },
  logo: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyleType: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  container: {
    padding: "20px",
  },
};

export default App;
