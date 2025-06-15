import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      category: parseInt(formData.category, 10),
    };

    try {
      const response = await fetch('http://localhost:8000/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization если нужно
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(JSON.stringify(data));
      } else {
        navigate('/products');
      }
    } catch {
      setError('Ошибка сети или сервера');
    }
  };

  // ripple эффект для кнопки
  const handleClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.width = ripple.style.height = '100px';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.left = `${e.nativeEvent.offsetX - 50}px`;
    ripple.style.top = `${e.nativeEvent.offsetY - 50}px`;
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s linear';

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  };

  return (
    <>
      <style>{`
        @keyframes rippleEffect {
          from {
            transform: scale(0);
            opacity: 0.5;
          }
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(270deg, #333, #444, #555, #333)',
          backgroundSize: '800% 800%',
          animation: 'GradientShift 15s ease infinite',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          boxSizing: 'border-box',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#eee',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '40px 30px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            boxSizing: 'border-box',
          }}
        >
          <h2
            style={{
              fontWeight: '900',
              fontSize: '2rem',
              marginBottom: '20px',
              textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
            }}
          >
            Додати новий товар
          </h2>

          {error && (
            <div
              style={{
                color: '#ff6b6b',
                marginBottom: '15px',
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
              Назва:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  marginTop: '5px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#eee',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
              Опис:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                style={{
                  marginTop: '5px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#eee',
                  resize: 'vertical',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
              Ціна:
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={{
                  marginTop: '5px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#eee',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
              Кількість на складі:
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                style={{
                  marginTop: '5px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#eee',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
              Категорія (ID):
              <input
                type="number"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{
                  marginTop: '5px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#eee',
                }}
              />
            </label>

            <button
              type="submit"
              onClick={handleClick}
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '15px 30px',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#eee',
                backgroundColor: '#555',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 6px 15px rgba(0,0,0,0.7)',
                userSelect: 'none',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#777';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#555';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Додати товар
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
