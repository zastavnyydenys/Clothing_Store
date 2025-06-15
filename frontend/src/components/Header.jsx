import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  return (
    <>
      <style>{`
        header {
          background-color: #333;
          color: white;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          position: relative;
        }

        .logo {
          font-weight: 900;
          font-size: 1.5rem;
          white-space: nowrap;
          cursor: pointer;
        }

        .nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
        }

        nav a {
          color: #eee;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1rem;
          transition: color 0.3s ease, transform 0.3s ease;
          position: relative;
          padding: 5px 0;
        }

        nav a::after {
          content: '';
          display: block;
          height: 2px;
          background: #ff4081;
          width: 0;
          transition: width 0.3s ease;
          position: absolute;
          bottom: -4px;
          left: 0;
        }

        nav a:hover {
          color: #ff4081;
          transform: scale(1.1);
        }

        nav a:hover::after {
          width: 100%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #ff4081;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-weight: bold;
          color: white;
          font-size: 20px;
          user-select: none;
          position: relative;
        }

        .user-icon:hover {
          background-color: #e040fb;
        }

        .logout-button {
          margin-left: 10px;
          background: transparent;
          border: none;
          color: #eee;
          cursor: pointer;
          font-weight: bold;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .logout-button:hover {
          color: #ff4081;
        }
      `}</style>

      <header>
        <div className="logo">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            ClothingStore
          </Link>
        </div>

        <nav className="nav-center">
          <Link to="/">Головна</Link>
          <Link to="/products">Товари</Link>
          <Link to="/add-product">Додати товар</Link>
        </nav>

        <nav className="nav-right">
          {!user ? (
            <>
              <Link to="/login">Увійти</Link>
              <Link to="/register">Реєстрація</Link>
            </>
          ) : (
            <>
              <div className="user-icon" title={user.username}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <button className="logout-button" onClick={onLogout}>
                Вийти
              </button>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
