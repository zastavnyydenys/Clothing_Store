import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Не удалось загрузить продукт');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ color: '#eee', padding: '20px' }}>Загрузка продукта...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>Ошибка: {error}</div>;
  if (!product) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          to {opacity: 1;}
        }
        .product-details {
          background: linear-gradient(270deg, #333, #444, #555, #333);
          background-size: 800% 800%;
          animation: GradientShift 15s ease infinite;
          color: #eee;
          max-width: 600px;
          margin: 40px auto;
          padding: 30px 40px;
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          opacity: 0;
          animation: fadeIn 1.5s forwards;
        }
        @keyframes GradientShift {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .product-details img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 25px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.7);
        }
        .product-name {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 10px;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.8);
        }
        .product-price {
          font-size: 1.75rem;
          color: #ff4081;
          font-weight: 700;
          margin-bottom: 25px;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
        }
        .product-description {
          font-size: 1.2rem;
          line-height: 1.5;
          margin-bottom: 35px;
          color: #ddd;
          letter-spacing: 0.02em;
        }
        .back-link {
          color: #eee;
          background-color: #555;
          padding: 15px 35px;
          border-radius: 50px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 6px 15px rgba(0,0,0,0.7);
          transition: background-color 0.3s ease, transform 0.3s ease;
          user-select: none;
          display: inline-block;
        }
        .back-link:hover {
          background-color: #ff4081;
          color: #fff;
          transform: scale(1.05);
        }
        body {
        background-color: #222;
        }
        }
      `}</style>

      <div className="product-details">
        <img
          src={product.image || "https://via.placeholder.com/300x300?text=No+Image"}
          alt={product.name}
        />
        <div className="product-name">{product.name}</div>
        <div className="product-price">{product.price} грн</div>
        <div className="product-description">{product.description || 'Опис відсутній'}</div>
        <Link to="/products" className="back-link">Назад до товарів</Link>
      </div>
    </>
  );
}
