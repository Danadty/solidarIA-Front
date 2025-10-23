'use client';

import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setMessages(prev => [...prev, { sender: 'user', text: input }]);

    try {
      const res = await fetch('http://52.54.112.49:3000/chat-gemini/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: '*/*' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data?.data?.message || 'Sin respuesta' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error al comunicarse con el servidor' }]);
    }

    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* 🔘 BOTÓN FLOTANTE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#32cd96',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '55px',
            height: '55px',
            fontSize: '22px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            zIndex: 1001,
          }}
        >
          ↑
        </button>
      )}

      {/* 💬 CAJA DE CHAT */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '300px',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#f0f2f5',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
        }}>
          {/* HEADER */}
          <div style={{
            backgroundColor: '#32cd96',
            color: 'white',
            padding: '8px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}>
            <span><strong>SolidarIA Chat</strong></span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                transform: 'rotate(180deg)', // flechita hacia abajo
              }}
            >
              ↑
            </button>
          </div>

          {/* MENSAJES */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '5px',
              }}>
                <div style={{
                  backgroundColor: msg.sender === 'user' ? '#32cd96' : '#e5e5ea',
                  color: msg.sender === 'user' ? 'white' : 'black',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  maxWidth: '70%',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div style={{ display: 'flex', padding: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              style={{ flex: 1, padding: '8px', borderRadius: '20px', border: '1px solid #ccc' }}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} style={{
              marginLeft: '5px',
              padding: '8px 12px',
              borderRadius: '20px',
              backgroundColor: '#32cd96',
              color: 'white',
              border: 'none',
            }}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
}
