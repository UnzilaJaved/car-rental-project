// Sidebar.js
import React from "react";
import './adminhome.css';
import Nav from 'react-bootstrap/Nav';
const Sidebar = () => (
  <div className="sidebar">
    <h2>Dashboard</h2>
    <nav>
      <ul>
      <Nav.Link href="/adminhome" className="me-2">
      <li><button className="sidebar-button">Users</button></li>
     </Nav.Link>
     <Nav.Link href="/carsadmin" className="me-2">
     <li><button className="sidebar-button">Cars</button></li>
     </Nav.Link>
     <Nav.Link href="/carsrents" className="me-2">
     <li><button className="sidebar-button">Rents</button></li>
     </Nav.Link>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
