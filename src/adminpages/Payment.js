import React, { useState, useEffect } from "react";
import axios from "axios";
import "./payment.css";

const PaymentsManagement = () => {

  const token = localStorage.getItem("token");
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    rental_id: "",
    amount: "",
    payment_date: "",
    payment_method: "CASH",
    status: "PENDING",
  });
  const [editingPayment, setEditingPayment] = useState(null); // Track the payment being edited
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000/api/admin/payment";

  // Fetch all payments on page load
  useEffect(() => {
    fetchPayments();
  }, []);

  // Function to fetch all payments from the backend
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to the request headers
        },
      });
      setPayments(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to load payments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new payment
  const handleAddPayment = async () => {
    if (!newPayment.rental_id || !newPayment.amount || !newPayment.payment_date) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await axios.post(API_URL, newPayment, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to the request headers
        },
      });
      alert("Payment added successfully!");
      setNewPayment({
        rental_id: "",
        amount: "",
        payment_date: "",
        payment_method: "CASH",
        status: "PENDING",
      });
      fetchPayments();
    } catch (error) {
      setErrorMessage("Failed to add payment. Please try again.");
    }
  };

  // Function to update a payment
  const handleUpdatePayment = async () => {
    if (!newPayment.rental_id || !newPayment.amount || !newPayment.payment_date) {
      setErrorMessage("All fields are required.");
      return;
    }

    const updatedPayment = {
      rental_id: newPayment.rental_id,
      amount: newPayment.amount,
      payment_date: newPayment.payment_date,
      payment_method: newPayment.payment_method,
      status: newPayment.status,
    };

    try {
      await axios.put(`${API_URL}/${editingPayment.payment_id}`, updatedPayment, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to the request headers
        },
      });
      alert("Payment updated successfully!");
      fetchPayments();
      setEditingPayment(null); // Reset editing mode after update
      setNewPayment({
        rental_id: "",
        amount: "",
        payment_date: "",
        payment_method: "CASH",
        status: "PENDING",
      });
    } catch (error) {
      setErrorMessage("Failed to update payment. Please try again.");
    }
  };

  // Function to delete a payment
  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`${API_URL}/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token to the request headers
        },
      });
      alert("Payment deleted successfully!");
      fetchPayments();
    } catch (error) {
      setErrorMessage("Failed to delete payment. Please try again.");
    }
  };

  // Function to set the form fields to edit an existing payment
  const handleEditPayment = (payment) => {
    setEditingPayment(payment); // Set the payment to be edited
    setNewPayment({
      rental_id: payment.rental_id,
      amount: payment.amount,
      payment_date: payment.payment_date,
      payment_method: payment.payment_method,
      status: payment.status,
    });
  };

  return (
    <div className="payments-management">
      <h2>Payments Management</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="payments-list">
          <h3>Existing Payments</h3>
          <ul>
            {payments.map((payment) => (
              <li key={payment.payment_id}>
                <p><strong>Rental ID:</strong> {payment.rental_id}</p>
                <p><strong>Amount:</strong> {payment.amount}</p>
                <p><strong>Payment Date:</strong> {payment.payment_date}</p>
                <p><strong>Payment Method:</strong> {payment.payment_method}</p>
                <p><strong>Status:</strong> {payment.status}</p>
                <button onClick={() => handleEditPayment(payment)}>Edit</button>
                <button onClick={() => handleDeletePayment(payment.payment_id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="add-payment-form">
        <h3>{editingPayment ? "Edit Payment" : "Add New Payment"}</h3>

        <label>Rental ID:</label>
        <input
          type="text"
          value={newPayment.rental_id}
          onChange={(e) => setNewPayment({ ...newPayment, rental_id: e.target.value })}
        />
        <label>Amount:</label>
        <input
          type="number"
          value={newPayment.amount}
          onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
        />
        <label>Payment Date:</label>
        <input
          type="datetime-local"
          value={newPayment.payment_date}
          onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })}
        />
        <label>Payment Method:</label>
        <select
          value={newPayment.payment_method}
          onChange={(e) => setNewPayment({ ...newPayment, payment_method: e.target.value })}
        >
          <option value="CASH">CASH</option>
          <option value="CARD">CARD</option>
          <option value="BANK_TRANSFER">BANK_TRANSFER</option>
        </select>
        <label>Status:</label>
        <select
          value={newPayment.status}
          onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
        >
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="REFUNDED">REFUNDED</option>
        </select>
        <button
          onClick={editingPayment ? handleUpdatePayment : handleAddPayment}
        >
          {editingPayment ? "Update Payment" : "Add Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentsManagement;
