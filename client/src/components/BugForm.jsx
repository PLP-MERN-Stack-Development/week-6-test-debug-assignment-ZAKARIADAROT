import React, { useState, useContext } from 'react';
import { BugContext } from '../context/BugContext';
import { createBug } from '../services/bugService';

const BugForm = () => {
  const { dispatch } = useContext(BugContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert('All fields are required');
    const newBug = await createBug({ title, description });
    dispatch({ type: 'ADD_BUG', payload: newBug });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Bug</button>
    </form>
  );
};

export default BugForm;
