
describe('Nivel 5: Pruebas de Aceptación (UAT) - SENA PARKING', () => {

 // AT-01: Acceso al inicio de sesión
it('AT-01: El aprendiz debe poder acceder a la pantalla de inicio de sesión', () => {
  cy.visit('/');

  cy.contains('Iniciar sesión')
    .should('be.visible')
    .click();

  // Esperar a que termine la navegación
  cy.wait(1000);

  // Comprobar que los elementos del login existen
  cy.contains('SENA PARKING').should('exist');
  cy.contains('CORREO').should('exist');
  cy.contains('CONTRASEÑA').should('exist');
  cy.contains('INICIAR SESIÓN').should('exist');

  // Comprobar que se muestran los tres roles
  cy.contains('aprendiz').should('exist');
  cy.contains('guarda').should('exist');
  cy.contains('administrador').should('exist');
});

  // AT-02: Acceso al formulario de registro
  it('AT-02: El aprendiz debe poder acceder al formulario de registro', () => {
    cy.visit('/');

    cy.contains('Registrarse')
      .should('be.visible')
      .click();

    // Comprueba que se abrió la pantalla de registro.
    // Los elementos concretos se ajustarán con RegisterScreen.
  });

  // AT-03: Visualización de la pantalla principal
  it('AT-03: El sistema debe mostrar las opciones principales de SENA PARKING', () => {
    cy.visit('/');

    cy.contains('SENA PARKING').should('be.visible');

    cy.contains('Control inteligente de parqueadero')
      .should('be.visible');

    cy.contains('Gestiona de manera fácil y segura el ingreso y salida')
      .should('be.visible');

    cy.contains('Iniciar sesión').should('be.visible');
    cy.contains('Registrarse').should('be.visible');
  });

  // AT-04: Validación de campos obligatorios
  it('AT-04: El sistema debe mostrar un mensaje si se intenta iniciar sesión con campos vacíos', () => {
    cy.visit('/');

    cy.contains('Iniciar sesión').click();

    cy.contains('INICIAR SESIÓN')
      .should('be.visible')
      .click();

    cy.contains('El correo y la contraseña son obligatorios')
      .should('be.visible');
  });

  // AT-05: Validación de selección de roles
  it('AT-05: El sistema debe mostrar los tres roles disponibles', () => {
    cy.visit('/');

    cy.contains('Iniciar sesión').click();

    cy.contains('aprendiz').should('be.visible');
    cy.contains('guarda').should('be.visible');
    cy.contains('administrador').should('be.visible');
  });

});
