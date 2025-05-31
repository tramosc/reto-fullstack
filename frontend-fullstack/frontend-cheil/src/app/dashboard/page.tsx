// app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h1>Dashboard privado</h1>
      <p>¡Solo puedes ver esto si estás logueado!</p>
    </div>
  );
}
