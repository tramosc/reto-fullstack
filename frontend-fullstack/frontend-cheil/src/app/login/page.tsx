// app/login/page.tsx
'use client'; // si usas hooks o estado (useState, useEffect)

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // nuevo hook para navegación en App Router
import api from '@/services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      router.push('/dashboard'); // navega a dashboard
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        setError('Credenciales incorrectas.');
      } else {
        setError('Error al iniciar sesión');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}
