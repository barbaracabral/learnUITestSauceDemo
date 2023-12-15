let username = "standard_user";
let password = "secret_sauce";

describe('Realizar Compra spec', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
    });
    afterEach(() => {
        cy.saveLocalStorage();
    });

    it.only('realizar compra', () => {
        cy.visit('/');
        cy.programmaticLogin(username);

        cy.visit('/inventory.html');
        //adicionar produtos ao carrinho
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        //clicar no ícone carrinho e realizar checkout
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();

        //Preencher os dados do Cliente e Continuar
        cy.get('[data-test="firstName"]').type("Bárbara");
        cy.get('[data-test="lastName"]').type("Cabral");
        cy.get('[data-test="postalCode"]').type("88106-518");
        cy.get('[data-test="continue"]').click();

        //Verificar os Dados do Pagamento e Finalizar
        cy.get('.summary_subtotal_label').should('be.visible');
        cy.get('.summary_tax_label').should('be.visible');
        cy.get('.summary_total_label').should('be.visible');
        cy.get('[data-test="finish"]').click();

        //Verificar a Thank you Page e voltar para a Home
        cy.get('#checkout_complete_container').should('exist');
        cy.get('[data-test="back-to-products"]').click();
    })
  
  })