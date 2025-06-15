import React from 'react';

export default function Footer() {
  return (
    <>
      <style>{`
        footer {
          background-color: #f0f0f0;
          padding: 20px 0;
          text-align: center;
          color: #555;
          font-size: 0.9rem;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
        }

        footer a {
          color: #333;
          text-decoration: none;
          transition: color 0.3s ease;
          font-weight: 500;
        }

        footer a:hover {
          color: #ff4081;
        }
      `}</style>

      <footer>
        <p>© 2025 ClothingStore</p>
        <p>
          <a href="/privacy">Політика конфіденційності</a> |{' '}
          <a href="/terms">Умови користування</a> |{' '}
          <a href="/contact">Контакти</a>
        </p>
      </footer>
    </>
  );
}
