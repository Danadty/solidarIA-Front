'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, CircularProgress, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// 🧩 Definimos el tipo de mensaje
interface Message {
    sender: 'user' | 'bot';
    text: string;
}

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 🔽 Hace scroll automático al último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // 🔽 Hace scroll automático al abrir el chat
    useEffect(() => {
        if (open) {
            setTimeout(() => scrollToBottom(), 100); // espera a que se rendericen los mensajes
        }
    }, [open]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat-gemini/recommend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: '*/*' },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            const botMessage: Message = { sender: 'bot', text: data?.data?.message || 'Sin respuesta' };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error(err);
            const errorMessage: Message = { sender: 'bot', text: 'Error al comunicarse con el servidor' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* BOTÓN FLOTANTE */}
            {!open && (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => setOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        borderRadius: '50%',
                        width: 55,
                        height: 55,
                        fontSize: 24,
                        zIndex: 1001,
                    }}
                >
                    💬
                </Button>
            )}

            {/* CAJA DE CHAT CON ANIMACIÓN SLIDE */}
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Paper
                    elevation={4}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        width: 320,
                        height: 450,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        zIndex: 1000,
                    }}
                >
                    {/* HEADER */}
                    <Box
                        sx={{
                            bgcolor: 'success.main',
                            color: 'white',
                            px: 1.5,
                            py: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            SolidarIA Chat
                        </Typography>
                        <IconButton
                            onClick={() => setOpen(false)}
                            size="small"
                            sx={{
                                color: 'white',
                                p: 0.5,
                                minWidth: 0,
                                width: 24,
                                height: 24,
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>

                    </Box>


                    {/* MENSAJES */}
                    <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5 }}>
                        {messages.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    mb: 1,
                                }}
                            >
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        maxWidth: '70%',
                                        bgcolor: msg.sender === 'user' ? 'success.light' : 'grey.300',
                                        color: msg.sender === 'user' ? 'white' : 'black',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography>{msg.text}</Typography>
                                </Paper>
                            </Box>
                        ))}

                        {/* INDICADOR DE CARGA */}
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                                <Paper sx={{ p: 1.5, maxWidth: '40%', display: 'flex', alignItems: 'center', borderRadius: 2, bgcolor: 'grey.300' }}>
                                    <CircularProgress size={18} sx={{ mr: 1 }} />
                                    <Typography variant="body2">Escribiendo...</Typography>
                                </Paper>
                            </Box>
                        )}

                        <div ref={messagesEndRef} />
                    </Box>

                    {/* INPUT */}
                    <Box sx={{ display: 'flex', p: 1.5, gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            disabled={loading}
                        />
                        <Button variant="contained" color="success" onClick={sendMessage} disabled={loading}>
                            Enviar
                        </Button>
                    </Box>
                </Paper>
            </Slide>
        </>
    );
}
