import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [hover, setHover] = useState(false);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Login successful!');
        setFormData({ username: '', password: '' });
        // Сохраняем пользователя (например, username и токен) через callback
        onLogin({ username: formData.username, token: data.token });
      } else {
        setMessage(data.error || 'Invalid credentials');
      }
    } catch {
      setMessage('Network error');
    }
  };

  const handleClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s linear';
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '0.5';

    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  };

  const styles = {
    container: {
      maxWidth: 400,
      margin: '40px auto',
      padding: 30,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: 8,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#fff',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      margin: '10px 0 20px 0',
      borderRadius: 5,
      border: '1px solid #ccc',
      fontSize: 16,
      boxSizing: 'border-box',
    },
    button: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      padding: '12px 0',
      fontSize: 18,
      fontWeight: 700,
      color: hover ? '#fff' : '#eee',
      backgroundColor: hover ? '#3f51b5' : '#555',
      borderRadius: 50,
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 6px 15px rgba(0,0,0,0.7)',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      userSelect: 'none',
      transform: hover ? 'scale(1.05)' : 'scale(1)',
    },
    message: {
      marginTop: 15,
      color: message.toLowerCase().includes('success') ? 'green' : 'red',
      fontWeight: 'bold',
      minHeight: 24,
      textAlign: 'center',
    },
    title: {
      textAlign: 'center',
      marginBottom: 25,
      color: '#333',
    },
  };

  return (
    <>
      <style>{`
        @keyframes rippleEffect {
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>

      <div style={styles.container}>
        <h2 style={styles.title}>Log In</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            style={styles.input}
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
          >
            Login
          </button>
        </form>
        <p style={styles.message}>{message}</p>
      </div>
    </>
  );
}
