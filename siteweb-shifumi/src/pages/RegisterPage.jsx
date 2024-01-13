import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const responseData = await response.json();
      localStorage.setItem('_id', responseData._id);
      localStorage.setItem('username', responseData.username);

      navigate('/Login'); 
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div
        style={{
            maxWidth: '500px',
            margin: 'auto',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#f5f5f5',
        }}
    >
        <h1>Register</h1>
        <form style={{ marginTop: '10px' }}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '10px 0',
                        border: '1px solid grey',
                    }}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '10px 0',
                        border: '1px solid grey',
                    }}
                />
            </label>
            <br />
            <button
                type="button"
                onClick={handleRegister}
                style={{
                    backgroundColor: 'Black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                }}
            >
                Register
            </button>
        </form>
    </div>
);
};

export default Register;
