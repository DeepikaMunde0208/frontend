// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [performanceScore, setPerformanceScore] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://backend-psi-fawn.vercel.app/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const syncData = async () => {
    try {
      await axios.get('https://backend-psi-fawn.vercel.app/sync/');
      fetchData();
    } catch (error) {
      console.error('Error syncing data:', error);
    }
  };

  const addRow = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-psi-fawn.vercel.app/row/', null, {
        params: {
          ID: id,
          'Avatar Name': avatarName,
          'Performance Score': performanceScore,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const deleteRow = async (id) => {
    try {
      await axios.delete('https://backend-psi-fawn.vercel.app/row/', {
        params: { ID: id },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <div>
      <h1>Google Sheets Data</h1>
      <button onClick={syncData}>Sync Data</button>
      <form onSubmit={addRow}>
        <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" placeholder="Avatar Name" value={avatarName} onChange={(e) => setAvatarName(e.target.value)} />
        <input type="text" placeholder="Performance Score" value={performanceScore} onChange={(e) => setPerformanceScore(e.target.value)} />
        <button type="submit">Add Row</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar Name</th>
            <th>Performance Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td><button onClick={() => deleteRow(row[0])}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
