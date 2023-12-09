describe('Login no Sauce Demo spec', () => {
  it('login com sucesso', () => {
    cy.visit('/');
    cy.login("standard_user", "secret_sauce");
    cy.get('#item_4_title_link').should('be.visible');
    cy.get('#item_0_title_link').should('be.visible');
  })

  it.skip('login com falha - username required', () => {
    //TODO
  })

  it.skip('logout', () => {
    //TODO
  })
})