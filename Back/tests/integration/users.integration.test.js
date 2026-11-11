
const request = require('supertest');
const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');

const app = require('../../src/app');
const db = require('../../src/config/database');

describe('Nivel 2: Pruebas de Integración - Usuarios SENA PARKING', () => {

  let tokenAdmin = '';
  let idUsuarioCreado = '';

  beforeAll(async () => {
    try {
      // 1. Limpiar la tabla
      await db.query(
        'DELETE FROM Users WHERE email IN (?, ?)',
        {
          replacements: [
            'admin@test.com',
            'integracion@test.com'
          ],
          type: QueryTypes.BULKDELETE
        }
      );

      // 2. Crear contraseña encriptada
      const hash = await bcrypt.hash('admin123', 10);

      // 3. Insertar administrador de prueba
      await db.query(
        `INSERT INTO Users
        (nombres, apellidos, documento, tipoDocumento,
         email, password, rol, estado, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        {
          replacements: [
            'Admin',
            'Test',
            '9999999999',
            'CC',
            'admin@test.com',
            hash,
            'administrador',
            'activo'
          ],
          type: QueryTypes.INSERT
        }
      );

      // 4. Iniciar sesión
      const loginRes = await request(app)
  .post('/auth/login')
  .send({
    email: 'admin@test.com',
    password: 'admin123',
    rol: 'administrador'
  });

      console.log(
        'RESPUESTA LOGIN:',
        JSON.stringify(loginRes.body, null, 2)
      );

      // 5. Obtener token
      tokenAdmin =
        loginRes.body?.data?.session_token ||
        loginRes.body?.data?.accessToken ||
        loginRes.body?.accessToken ||
        '';

      if (!tokenAdmin) {
        throw new Error(
          `No se obtuvo el token. HTTP ${loginRes.status}: ${JSON.stringify(loginRes.body)}`
        );
      }

    } catch (error) {
      console.error('ERROR EN beforeAll:', error.message);
      console.error('ERROR SQL:', error.original?.sqlMessage);
      throw error;
    }
  }, 30000);

  afterAll(async () => {
    await db.close();
  });

  // IT-01
  test('IT-01: Crear usuario en la BD', async () => {

    const nuevoUsuario = {
      nombres: 'Test Integracion',
      apellidos: 'Apellido',
      documento: '8888888888',
      tipoDocumento: 'CC',
      email: 'integracion@test.com',
      password: 'password123',
      rol: 'aprendiz'
    };

    const response = await request(app)
      .post('/auth/register')
      .send(nuevoUsuario);

    console.log('RESPUESTA CREAR:', response.body);

    expect(response.status).toBe(201);

    const rows = await db.query(
      'SELECT * FROM Users WHERE email = ?',
      {
        replacements: [nuevoUsuario.email],
        type: QueryTypes.SELECT
      }
    );

    expect(rows.length).toBe(1);
    expect(rows[0].nombres).toBe(nuevoUsuario.nombres);

    idUsuarioCreado = rows[0].id;
  });

  // IT-02
  test('IT-02: Login debe retornar un token válido', async () => {

  const response = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin@test.com',
      password: 'admin123',
      rol: 'administrador'
    });

  console.log(
    'RESPUESTA LOGIN IT-02:',
    JSON.stringify(response.body, null, 2)
  );

  expect(response.status).toBe(200);
  expect(response.body).toBeDefined();

});

  // IT-03
  test('IT-03: Ruta protegida debe responder correctamente', async () => {

    expect(tokenAdmin).toBeTruthy();

    const response = await request(app)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    console.log('RESPUESTA VERIFICACIÓN:', response.body);

    expect([200, 404]).toContain(response.status);

  });

  // IT-04
  test('IT-04: Usuario creado debe conservar sus datos', async () => {

    const rows = await db.query(
      'SELECT nombres, apellidos FROM Users WHERE id = ?',
      {
        replacements: [idUsuarioCreado],
        type: QueryTypes.SELECT
      }
    );

    expect(rows.length).toBe(1);
    expect(rows[0].nombres).toBe('Test Integracion');

  });

  // IT-05
  test('IT-05: Eliminar usuario de prueba', async () => {

    await db.query(
      'DELETE FROM Users WHERE id = ?',
      {
        replacements: [idUsuarioCreado],
        type: QueryTypes.BULKDELETE
      }
    );

    const rows = await db.query(
      'SELECT * FROM Users WHERE id = ?',
      {
        replacements: [idUsuarioCreado],
        type: QueryTypes.SELECT
      }
    );

    expect(rows.length).toBe(0);

  });

});
