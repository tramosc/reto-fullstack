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
    <div className="max-w-sm mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Iniciar sesión
        </button>
      </form>
    </div>

  );
}
