import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const password = '12345678';  // Contraseña de prueba
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.usuario.create({
    data: {
      email: 'usuario1@example.com',
      password: hashedPassword,
      nombre: 'Usuario Prueba',
    },
  });

  console.log('Usuario creado:', user);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
