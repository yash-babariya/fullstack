import React, { useState, useEffect } from 'react';
import { getHello } from './api/api';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHello()
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch message');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fullstack App</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;