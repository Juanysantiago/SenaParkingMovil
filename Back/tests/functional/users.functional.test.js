
const request = require('supertest');
const app = require('../../src/app');

const sequelize = require('../../src/config/database');

const User = require('../../src/models/User');
const TipoDocumento = require('../../src/models/TipoDocumento');

const { Op } = require('sequelize');

describe('Nivel 3: Pruebas Funcionales (Caja Negra) - SENA PARKING', () => {

  let tokenAdmin = '';
  let tokenAprendiz = '';

  let adminId;
  let aprendizId;

  let tipoDocumentoId;

  const identificador = Date.now().toString().slice(-10);

  const admin = {
    nombres: 'Admin Funcional',
    apellidos: 'Pruebas',
    documento: `${identificador}001`,
    email: `admin.funcional.${identificador}@test.com`,
    password: 'Password123',
    rol: 'administrador'
  };

  const aprendiz = {
    nombres: 'Aprendiz Funcional',
    apellidos: 'Pruebas',
    documento: `${identificador}002`,
    email: `aprendiz.funcional.${identificador}@test.com`,
    password: 'Password123',
    rol: 'aprendiz'
  };

  // ==========================================
  // CONFIGURACIÓN INICIAL
  // ==========================================

  beforeAll(async () => {

    try {

      // 1. Buscar un tipo de documento existente

      const tipoDocumento = await TipoDocumento.findOne();

      if (!tipoDocumento) {
        throw new Error(
          'No existe ningún tipo de documento en la base de datos'
        );
      }

      tipoDocumentoId = tipoDocumento.id;

      // 2. Registrar administrador de prueba

      const registroAdmin = await request(app)
        .post('/auth/register')
        .send({
          ...admin,
          tipoDocumento: tipoDocumentoId
        });

      if (registroAdmin.status !== 201) {
        throw new Error(
          `No se pudo registrar el administrador: ${JSON.stringify(registroAdmin.body)}`
        );
      }

      adminId = registroAdmin.body.user.id;

      // 3. Registrar aprendiz de prueba

      const registroAprendiz = await request(app)
        .post('/auth/register')
        .send({
          ...aprendiz,
          tipoDocumento: tipoDocumentoId
        });

      if (registroAprendiz.status !== 201) {
        throw new Error(
          `No se pudo registrar el aprendiz: ${JSON.stringify(registroAprendiz.body)}`
        );
      }

      aprendizId = registroAprendiz.body.user.id;

      // 4. Iniciar sesión como administrador

      const loginAdmin = await request(app)
        .post('/auth/login')
        .send({
          email: admin.email,
          password: admin.password,
          rol: admin.rol
        });

      if (loginAdmin.status !== 200 || !loginAdmin.body.accessToken) {
        throw new Error(
          `No se obtuvo el token del administrador: ${JSON.stringify(loginAdmin.body)}`
        );
      }

      tokenAdmin = loginAdmin.body.accessToken;

      // 5. Iniciar sesión como aprendiz

      const loginAprendiz = await request(app)
        .post('/auth/login')
        .send({
          email: aprendiz.email,
          password: aprendiz.password,
          rol: aprendiz.rol
        });

      if (loginAprendiz.status !== 200 || !loginAprendiz.body.accessToken) {
        throw new Error(
          `No se obtuvo el token del aprendiz: ${JSON.stringify(loginAprendiz.body)}`
        );
      }

      tokenAprendiz = loginAprendiz.body.accessToken;

    } catch (error) {

      console.error(
        'ERROR EN CONFIGURACIÓN DE PRUEBAS FUNCIONALES:',
        error.message
      );

      throw error;
    }
  });


  // ==========================================
  // LIMPIEZA
  // ==========================================

  afterAll(async () => {

    try {

      await User.destroy({
        where: {
          email: {
            [Op.in]: [
              admin.email,
              aprendiz.email
            ]
          }
        }
      });

    } catch (error) {

      console.error(
        'ERROR LIMPIANDO USUARIOS DE PRUEBA:',
        error.message
      );

    }

    await sequelize.close();
  });


  // ==========================================
  // FT-01: CORREO DUPLICADO
  // ==========================================

  test('FT-01: No debe permitir registrar un usuario con un correo existente', async () => {

    const response = await request(app)
      .post('/auth/register')
      .send({
        nombres: 'Usuario Duplicado',
        apellidos: 'Prueba',
        documento: `${identificador}003`,
        tipoDocumento: tipoDocumentoId,
        email: admin.email,
        password: 'Password123',
        rol: 'aprendiz'
      });

    expect(response.status).toBe(409);

    expect(response.body.message).toBe(
      'El correo electrónico ya está registrado'
    );

  });


  // ==========================================
  // FT-02: CONTRASEÑA INCORRECTA
  // ==========================================

  test('FT-02: Debe rechazar el inicio de sesión con una contraseña incorrecta', async () => {

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: admin.email,
        password: 'ContraseñaIncorrecta123',
        rol: 'administrador'
      });

    expect(response.status).toBe(401);

    expect(response.body.message).toBe(
      'Contraseña incorrecta'
    );

  });


  // ==========================================
  // FT-03: CONTROL DE ACCESO POR ROL
  // ==========================================

  test('FT-03: Un aprendiz no debe poder consultar la lista de usuarios', async () => {

    const response = await request(app)
      .get('/auth/users')
      .set('Authorization', `Bearer ${tokenAprendiz}`);

    expect(response.status).toBe(403);

  });


  // ==========================================
  // FT-04: CAMPOS OBLIGATORIOS
  // ==========================================

  test('FT-04: No debe registrar un usuario si falta el correo electrónico', async () => {

    const response = await request(app)
      .post('/auth/register')
      .send({
        nombres: 'Usuario Sin Correo',
        apellidos: 'Prueba',
        documento: `${identificador}004`,
        tipoDocumento: tipoDocumentoId,
        password: 'Password123',
        rol: 'aprendiz'
      });

    expect(response.status).toBe(400);

    expect(response.body.message).toBe(
      'El correo electrónico no es válido'
    );

  });


  // ==========================================
  // FT-05: ACTUALIZACIÓN PARCIAL
  // ==========================================

  test('FT-05: Debe actualizar solamente el celular sin modificar los demás datos', async () => {

    const celularNuevo = '3001234567';

    // Actualizar únicamente el celular

    const response = await request(app)
      .put(`/auth/users/${aprendizId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        celular: celularNuevo
      });

    expect(response.status).toBe(200);

    expect(response.body.message).toBe(
      'Usuario actualizado correctamente'
    );

    // Consultar nuevamente el usuario en la base de datos

    const usuarioActualizado = await User.findByPk(aprendizId);

    expect(usuarioActualizado).not.toBeNull();

    // Verificar que el celular cambió

    expect(usuarioActualizado.celular).toBe(celularNuevo);

    // Verificar que los demás datos siguen iguales

    expect(usuarioActualizado.nombres).toBe(aprendiz.nombres);

    expect(usuarioActualizado.apellidos).toBe(aprendiz.apellidos);

    expect(usuarioActualizado.email).toBe(aprendiz.email);

    expect(usuarioActualizado.documento).toBe(aprendiz.documento);

    expect(usuarioActualizado.rol).toBe(aprendiz.rol);

  });

});
