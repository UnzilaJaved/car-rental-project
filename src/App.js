import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import Testimonials from "./pages/Testinomials";
import WhyChooseUs from "./pages/whychooseus";
import BookCars from "./pages/BookCar";
import RentalCar from "./pages/RentCar";
import AdminLogin from "./adminpages/adminlogin"
import AdminHome from "./adminpages/adminhome";
import UserTable from "./adminpages/usertable";
import CarsAdmin from "./adminpages/carsadmin";
import RentAdmin from "./adminpages/rent";
import MaintainanceAdmin from "./adminpages/maintainance";
import IncidentForm from "./adminpages/IncidentReporting";
import InsuranceForm from "./adminpages/Insurance";
import Footer from "./pages/footer";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import PaymentsAdmin from "./adminpages/Payment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
         <Route path="aboutus" element={<WhyChooseUs/>} /> 
        <Route path="testimonials" element={<Testimonials/>} />
        <Route path="bookcars" element={<BookCars/>} />
        <Route path="/rental-car" element={<RentalCar />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/users" element={<UserTable/>} />
        <Route path="/carsadmin" element={<CarsAdmin/>} />
        <Route path="/carsrents" element={<RentAdmin/>} />
        <Route path="/maintainance" element={<MaintainanceAdmin/>} />
        <Route path="/incidentreportingform" element={<IncidentForm />} />
        <Route path="/insuranceform" element={<InsuranceForm />} />
        <Route path="/payments" element={<PaymentsAdmin />} />
        <Route path="/contact" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
