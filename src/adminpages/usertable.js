// UserTable.js
import React from "react";
import './adminhome.css';

const UserTable = ({ userData }) => (
  <div className="user-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td><button className="delete-button">🗑️</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
