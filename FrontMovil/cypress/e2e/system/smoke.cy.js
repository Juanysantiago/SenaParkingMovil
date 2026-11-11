
describe('Pruebas iniciales de SENA PARKING', () => {
  it('Cypress está funcionando correctamente', () => {
    expect(true).to.equal(true);
  });

  it('El frontend está corriendo y muestra la pantalla inicial', () => {
    cy.visit('/');

    cy.contains('SENA PARKING').should('be.visible');
    cy.contains('Control inteligente de parqueadero').should('be.visible');
    cy.contains('Iniciar sesión').should('be.visible');
    cy.contains('Registrarse').should('be.visible');
  });
});
