import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyAppointment from "./pages/MyAppointment";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const TRACKING_ID = "G-NXEBM2SZRG"; // Replace with your Google Analytics Measurement ID

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${TRACKING_ID}');
    `;
    document.head.appendChild(script2);

    // Track page views
    window.gtag && window.gtag("config", TRACKING_ID, { page_path: location.pathname });
  }, [location]);

  return null;
};

// Function to track appointment bookings
const handleAppointmentBooking = () => {
  if (window.gtag) {
    window.gtag("event", "appointment_booked", {
      event_category: "User",
      event_label: "Doctor Appointment",
    });
  }
};

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-appointment" element={<MyAppointment />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>

      {/* Button to track appointment bookings */}
      <div className="text-center my-4">
        <button
          onClick={handleAppointmentBooking}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default App;
