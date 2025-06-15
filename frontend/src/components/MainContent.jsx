import React from 'react';
import { Link } from 'react-router-dom';

export default function MainContent() {
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
    ripple.addEventListener('animationend', () => ripple.remove());
  };

  const gradientBg = {
    background: 'linear-gradient(270deg, #333, #444, #555, #333)',
    backgroundSize: '800% 800%',
    animation: 'GradientShift 15s ease infinite',
    color: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
    minHeight: '100vh',
    margin: 0,
  };

  const buttonStyle = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    padding: '15px 40px',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#eee',
    backgroundColor: '#555',
    borderRadius: '50px',
    textDecoration: 'none',
    boxShadow: '0 6px 15px rgba(0,0,0,0.7)',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    userSelect: 'none',
    margin: '0 10px',
  };

  return (
    <>
      <style>{`
        @keyframes GradientShift {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
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
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>

      <div style={gradientBg}>
        <div style={{
          maxWidth: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '40px 30px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          width: '100%',
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '15px',
            fontWeight: '900',
            textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
            opacity: 0,
            animation: 'fadeIn 1.5s forwards',
          }}>
            Ласкаво просимо до ClothingStore
          </h1>

          <p style={{
            fontSize: '1.25rem',
            marginBottom: '35px',
            fontWeight: '400',
            color: '#ddd',
            letterSpacing: '0.03em',
            opacity: 0,
            animation: 'fadeIn 2.5s forwards',
            animationDelay: '0.5s',
          }}>
            Найкращий магазин одягу для твого стилю
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/products" style={buttonStyle} onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#777';
              e.currentTarget.style.transform = 'scale(1.05)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#555';
              e.currentTarget.style.transform = 'scale(1)';
            }} onClick={handleClick}>
              Перейти до товарів
            </Link>

            <Link to="/chat" style={buttonStyle} onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#777';
              e.currentTarget.style.transform = 'scale(1.05)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#555';
              e.currentTarget.style.transform = 'scale(1)';
            }} onClick={handleClick}>
              Перейти в чат
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
