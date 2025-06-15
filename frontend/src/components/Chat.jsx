import React, { useState, useEffect } from 'react';

const Chat = ({ roomName }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [status, setStatus] = useState('Підключення...');

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    ws.onopen = () => setStatus('Підключено');
    ws.onclose = () => setStatus('Відключено');
    ws.onerror = () => setStatus('Помилка зʼєднання');

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setChatLog(prev => [...prev, data.message]);
    };

    setSocket(ws);

    return () => ws.close();
  }, [roomName]);

  const sendMessage = () => {
    if (socket?.readyState === WebSocket.OPEN && message.trim()) {
      socket.send(JSON.stringify({ message }));
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Кімната: {roomName}</h2>
      <p>Статус зʼєднання: {status}</p>

      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        height: '300px',
        overflowY: 'auto',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9'
      }}>
        {chatLog.map((msg, i) => (
          <div key={i} style={{
            marginBottom: '10px',
            backgroundColor: '#e0e0e0',
            padding: '8px 12px',
            borderRadius: '12px',
            alignSelf: 'flex-start',
            maxWidth: '80%'
          }}>
            {msg}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={message}
          placeholder="Введіть повідомлення..."
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #aaa'
          }}
        />
        <button onClick={sendMessage} style={{
          padding: '10px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Надіслати
        </button>
      </div>
    </div>
  );
};

export default Chat;
