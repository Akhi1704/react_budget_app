import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Budget.css'; // Import the CSS file

const Budget = () => {
    const { budget, remainingFunds, setBudget, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const totalSpending = budget - remainingFunds;

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);
        if (isNaN(value)) {
            window.alert('Please enter a valid number');
            return;
        }
        if (value > 20000) {
            window.alert('The value cannot exceed 20,000');
            return;
        }
        if (value < totalSpending) {
            window.alert(`The value cannot exceed remaining funds of ${currency}${remainingFunds}`);
            return;
        }
        setBudget(value);
        setNewBudget(value);
    };

    return (
        <div className="budget-container">
            <div className="budget-section">
                <span>Budget: {currency}</span>
                <input 
                    type="number" 
                    step="10" 
                    value={newBudget} 
                    onChange={handleBudgetChange}
                    min="0"
                    className="budget-input"
                />
            </div>
        </div>
    );
};

export default Budget;

