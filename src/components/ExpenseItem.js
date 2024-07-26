import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import './ExpenseItem.css';

const ExpenseItem = ({ expense }) => {
    const { updateExpense, deleteExpense, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        deleteExpense(expense.id);
    };

    const increaseAllocation = () => {
        const newExpense = {
            ...expense,
            cost: expense.cost + 10,
        };

        updateExpense(newExpense);
    };

    const decreaseAllocation = () => {
        if (expense.cost <= 10) {
            window.alert('The expense cannot be decreased below 0.');
            return;
        }

        const newExpense = {
            ...expense,
            cost: expense.cost - 10,
        };

        updateExpense(newExpense);
    };

    return (
        <tr>
            <td>{expense.name}</td>
            <td>{currency}{expense.cost}</td>
            <td>
                <button className="btn-circle increase" onClick={increaseAllocation}>
                    <span>+</span>
                </button>
            </td>
            <td>
                <button className="btn-circle decrease" onClick={decreaseAllocation}>
                    <span>-</span>
                </button>
            </td>
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense} /></td>
        </tr>
    );
};

export default ExpenseItem;

