import React, { createContext, useReducer } from 'react';

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            };
        case 'CHG_CURRENCY':
            return {
                ...state,
                currency: action.payload,
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                ),
            };
        case 'INCREASE_ALLOCATION':
            return {
                ...state,
                expenses: state.expenses.map((expense) => {
                    if (expense.id === action.payload.id) {
                        return { ...expense, cost: expense.cost + action.payload.amount };
                    }
                    return expense;
                }),
            };
        case 'DECREASE_ALLOCATION':
            return {
                ...state,
                expenses: state.expenses.map((expense) => {
                    if (expense.id === action.payload.id) {
                        return { ...expense, cost: expense.cost - action.payload.amount };
                    }
                    return expense;
                }),
            };
        default:
            return state;
    }
};

const initialState = {
    budget: 2000,
    expenses: [
        { id: 'Marketing', name: 'Marketing', cost: 50 },
        { id: 'Finance', name: 'Finance', cost: 300 },
        { id: 'Sales', name: 'Sales', cost: 70 },
        { id: 'Human Resource', name: 'Human Resource', cost: 40 },
        { id: 'IT', name: 'IT', cost: 500 },
    ],
    currency: '£', // Default currency
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};
