import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MeetsPage = () => {
  const [meets, setMeets] = useState([]);

  useEffect(() => {
    fetchMeets();
  }, []);

  const fetchMeets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/getmeets');
      setMeets(response.data);
    } catch (error) {
      console.error('Error fetching meets:', error);
    }
  };


  const handleRefetch = () => {
    fetchMeets();
  };

  return (
    <div>
      <h1>Hello Meets Page</h1>
      <button onClick={handleRefetch}>Refetch Meets</button>
      <table>
        <thead>
          <tr>
            <th>Meet ID</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meets.map((meet) => (
            <tr key={meet.meetId}>
              <td>{meet.meetId}</td>
              <td>{meet.userId}</td>
              <td>
                <Link to={`/meet/${meet.meetId}`}>Go to Meet</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetsPage;
