// PaymentsAdmin.js
import React, { useState, useEffect } from 'react';
import './adminhome.css';
import './payment.css';
const PaymentsAdmin = () => {
    const [payments, setPayments] = useState(() => {
        const savedPayments = localStorage.getItem('payments');
        return savedPayments ? JSON.parse(savedPayments) : [
            { paymentId: 1, invoiceId: 'INV001', rentalId: 1, status: false },
            { paymentId: 2, invoiceId: 'INV002', rentalId: 2, status: false },
            { paymentId: 3, invoiceId: 'INV003', rentalId: 3, status: false }
        ];
    });

    useEffect(() => {
        localStorage.setItem('payments', JSON.stringify(payments));
    }, [payments]);

    const handleApprove = (paymentId) => {
        const updatedPayments = payments.map(payment =>
            payment.paymentId === paymentId ? { ...payment, status: true } : payment
        );
        setPayments(updatedPayments);

        // Also update the rental status in local storage if payment is approved
        const savedRents = localStorage.getItem('rents');
        if (savedRents) {
            const rents = JSON.parse(savedRents);
            const updatedRents = rents.map(rent =>
                updatedPayments.find(payment => payment.rentalId === rent.id && payment.status === true)
                    ? { ...rent, status: 'Paid' }
                    : rent
            );
            localStorage.setItem('rents', JSON.stringify(updatedRents));
        }
    };

    return (
        <div className="payments-page">
            <h2>Payments</h2>
            <table className="payments-table">
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Invoice ID</th>
                        <th>Rental ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.paymentId}>
                            <td>{payment.paymentId}</td>
                            <td>{payment.invoiceId}</td>
                            <td>{payment.rentalId}</td>
                            <td>{payment.status ? 'Approved' : 'Pending'}</td>
                            <td>
                                {!payment.status && (
                                    <button onClick={() => handleApprove(payment.paymentId)}>Approve</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentsAdmin;
