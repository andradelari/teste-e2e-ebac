Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', (indiceProduto, tamanho, cor) => { cy.get('.product-block').eq(indiceProduto).click() 
cy.get(`.button-variable-item-${tamanho}`).click() 
cy.get(`.button-variable-item-${cor}`).click() 
cy.get('.single_add_to_cart_button').click() 
cy.visit('/') 
})