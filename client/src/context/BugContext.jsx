import React, { createContext, useReducer, useEffect } from 'react';
import { getBugs } from '../services/bugService';

export const BugContext = createContext();

const initialState = { bugs: [], loading: true, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BUGS':
      return { ...state, bugs: action.payload, loading: false };
    case 'ADD_BUG':
      return { ...state, bugs: [...state.bugs, action.payload] };
    case 'UPDATE_BUG':
      return {
        ...state,
        bugs: state.bugs.map(b => (b._id === action.payload._id ? action.payload : b))
      };
    case 'DELETE_BUG':
      return { ...state, bugs: state.bugs.filter(b => b._id !== action.payload) };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const BugProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBugs();
        dispatch({ type: 'FETCH_BUGS', payload: data });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    })();
  }, []);

  return (
    <BugContext.Provider value={{ state, dispatch }}>
      {children}
    </BugContext.Provider>
  );
};
