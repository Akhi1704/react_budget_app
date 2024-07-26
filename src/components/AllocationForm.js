import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
    const { dispatch, budget, expenses, currency } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
    const remaining = budget - totalExpenses;

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [action, setAction] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitEvent = () => {
        const changeAmount = parseInt(amount);

        if (isNaN(changeAmount) || changeAmount === 0) {
            alert('Please enter a valid number');
            return;
        }

        if ((action === 'Reduce' && changeAmount > remaining) || (action === 'Add' && remaining + changeAmount > budget)) {
            setErrorMessage(`The value cannot exceed remaining funds ${currency}${remaining}`);
            return;
        }

        const expense = {
            name: name,
            cost: changeAmount,
        };

        if (action === 'Reduce') {
            dispatch({
                type: 'DECREASE_ALLOCATION',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'INCREASE_ALLOCATION',
                payload: expense,
            });
        }

        // Clear inputs and error message after successful submission
        setName('');
        setAmount('');
        setAction('');
        setErrorMessage('');
    };

    return (
        <div>
            <div className='row'>
                <div className='input-group mb-3' style={{ marginLeft: '2rem' }}>
                    <div className='input-group-prepend'>
                        <label className='input-group-text' htmlFor='inputGroupSelect01'>
                            Department
                        </label>
                    </div>
                    <select
                        className='custom-select'
                        id='inputGroupSelect01'
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option defaultValue>Choose...</option>
                        <option value='Marketing'>Marketing</option>
                        <option value='Sales'>Sales</option>
                        <option value='Finance'>Finance</option>
                        <option value='HR'>HR</option>
                        <option value='IT'>IT</option>
                        <option value='Admin'>Admin</option>
                    </select>

                    <div className='input-group-prepend' style={{ marginLeft: '2rem' }}>
                        <label className='input-group-text' htmlFor='inputGroupSelect02'>
                            Allocation
                        </label>
                    </div>
                    <select
                        className='custom-select'
                        id='inputGroupSelect02'
                        onChange={(event) => setAction(event.target.value)}
                    >
                        <option defaultValue value='Add'>
                            Add
                        </option>
                        <option value='Reduce'>Reduce</option>
                    </select>

                    <div className='input-group-prepend' style={{ marginLeft: '2rem' }}>
                        <span className='input-group-text'>{currency}</span>
                    </div>
                    <input
                        required='required'
                        type='number'
                        id='amount'
                        value={amount}
                        style={{ marginLeft: '0.5rem', width: '10rem' }}
                        onChange={(event) => setAmount(event.target.value)}
                    ></input>

                    <button className='btn btn-primary' onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
            {errorMessage && (
                <div className='row'>
                    <div className='col'>
                        <div className='alert alert-danger' role='alert'>
                            {errorMessage}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllocationForm;

