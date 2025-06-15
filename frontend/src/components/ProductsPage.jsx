import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Не удалось загрузить товары');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: '#eee', padding: '20px' }}>Загрузка товаров...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>Ошибка: {error}</div>;

  return (
    <>
      <style>{`
        .products-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          padding: 20px;
          background-color: #222;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .product-card {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          width: 220px;
          color: #eee;
          text-align: center;
          padding: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        .product-card:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(255, 64, 129, 0.8);
        }
        .product-image {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 15px;
          align-self: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.7);
        }
        .product-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
          flex-grow: 1;
        }
        .product-price {
          font-size: 1rem;
          margin-bottom: 15px;
          color: #ff4081;
          font-weight: 700;
        }
        .details-link {
          text-decoration: none;
          color: #eee;
          background-color: #555;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .details-link:hover {
          background-color: #ff4081;
          color: #fff;
        }
      `}</style>

      <div className="products-container">
        {products.length === 0 && <p style={{ color: '#eee' }}>Товаров пока нет.</p>}
        {products.map((product) => (
          <div key={product.id} className="product-card" tabIndex={0}>
            <img
              src="https://via.placeholder.com/200x200?text=No+Image"
              alt={product.name}
              className="product-image"
            />
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price} грн</div>
            <Link to={`/products/${product.id}`} className="details-link">
              Детальніше
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
