import React, { useState, useEffect } from 'react';
import './rentsadmin.css';

const RentAdmin = () => {
    const [rents, setRents] = useState(() => {
        const savedRents = localStorage.getItem('rents');
        return savedRents ? JSON.parse(savedRents) : [
            { id: 1, photo: 'golf-6.jpg', brand: 'Golf-6', price: 550, firstname: 'Monir', telephone: '0695051534', rentalDate: '2023-05-26', returnDate: '2023-05-30', total: 2200 },
            { id: 2, photo: 'toyota.jpg', brand: 'Toyota', price: 600, firstname: 'Monir', telephone: '0695051534', rentalDate: '2023-06-01', returnDate: '2023-06-05', total: 2400 },
            { id: 3, photo: 'clio.jpg', brand: 'Clio', price: 250, firstname: 'Abdelaziz', telephone: '0695051538', rentalDate: '2023-05-26', returnDate: '2023-05-30', total: 1000 }
        ];
    });

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('rents', JSON.stringify(rents));
    }, [rents]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredRents = rents.filter(rent =>
        rent.brand.toLowerCase().includes(searchTerm) ||
        rent.firstname.toLowerCase().includes(searchTerm) ||
        rent.telephone.includes(searchTerm)
    );

    return (
        <div className="rents-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for rents"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="rents-table">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>First Name</th>
                        <th>Telephone</th>
                        <th>Rental Date</th>
                        <th>Return Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRents.length > 0 ? (
                        filteredRents.map((rent) => (
                            <tr key={rent.id}>
                                <td><img src={`/images/${rent.photo}`} alt={rent.brand} width="50" /></td>
                                <td>{rent.brand}</td>
                                <td>{rent.price} MAD</td>
                                <td>{rent.firstname}</td>
                                <td>{rent.telephone}</td>
                                <td>{rent.rentalDate}</td>
                                <td>{rent.returnDate}</td>
                                <td>{rent.total} MAD</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No rentals found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RentAdmin;
