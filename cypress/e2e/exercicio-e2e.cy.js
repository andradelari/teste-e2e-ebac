/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

    /* Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        //Primeiro produto
        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-L').click()
        cy.get('.button-variable-item-White').click()
        cy.get('.single_add_to_cart_button').click()
        cy.visit('/')

        // Segundo produto
        cy.get('.product-block').eq(1).click()
        cy.get('.button-variable-item-S').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()
        cy.visit('/')

        // Terceiro produto
        cy.get('.product-block').eq(4).click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Gray').click()
        cy.get('.single_add_to_cart_button').click()
        cy.visit('/')

        // Quarto produto
        cy.get('.product-block').eq(7).click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()


        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()


        cy.get('.showlogin').click()


        cy.fixture('perfil').then((login) => {
            cy.get('#username').type(login.usuario)
            cy.get('#password').type(login.senha)
        })
        cy.get('.woocommerce-button').click()
        cy.get('#payment_method_cod').click()
        cy.get('#terms').check()
        cy.get('#place_order').click()
        cy.url({ timeout: 10000 }).should('include', 'order-received')

    });


})