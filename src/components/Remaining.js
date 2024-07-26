import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Remaining.css'; // Import the CSS file

const Remaining = () => {
    const { remainingFunds, currency } = useContext(AppContext);

    return (
        <div className="remaining-container">
            <div className="remaining-section">
                <span>Remaining: {currency}{remainingFunds}</span>
            </div>
        </div>
    );
};

export default Remaining;

