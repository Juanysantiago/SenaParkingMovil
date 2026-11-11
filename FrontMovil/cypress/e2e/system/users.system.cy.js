
describe('Nivel 4: Pruebas de Sistema (E2E) - SENA PARKING', () => {

  // ST-01: Visualización de la pantalla principal
  it('ST-01: Debe mostrar correctamente la pantalla principal', () => {
    cy.visit('/');

    cy.contains('SENA PARKING').should('be.visible');
    cy.contains('Control inteligente de parqueadero').should('be.visible');
    cy.contains('Iniciar sesión').should('be.visible');
    cy.contains('Registrarse').should('be.visible');
  });

  // ST-02: Navegación hacia el inicio de sesión
  it('ST-02: Debe permitir acceder a la pantalla de inicio de sesión', () => {
    cy.visit('/');

    cy.contains('Iniciar sesión').click();

    // Aquí se validarán los elementos reales de LoginScreen.
  });

  // ST-03: Navegación hacia el registro
  it('ST-03: Debe permitir acceder a la pantalla de registro', () => {
    cy.visit('/');

    cy.contains('Registrarse').click();

    // Aquí se validarán los elementos reales de RegisterScreen.
  });

});
