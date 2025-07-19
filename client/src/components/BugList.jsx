import React, { useContext } from 'react';
import { BugContext } from '../context/BugContext';
import { deleteBug } from '../services/bugService';

const BugList = () => {
  const { state, dispatch } = useContext(BugContext);
  const { bugs, loading, error } = state;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (id) => {
    await deleteBug(id);
    dispatch({ type: 'DELETE_BUG', payload: id });
  };

  return (
    <ul>
      {bugs.map(bug => (
        <li key={bug._id}>
          {bug.title} - {bug.status}
          <button onClick={() => handleDelete(bug._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BugList;
