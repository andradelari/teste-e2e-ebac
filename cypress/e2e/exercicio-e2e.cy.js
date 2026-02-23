/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

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
        cy.get('#cart .checkout').click()



        // Gerando dados
        let nome = faker.person.firstName();
        let sobrenome = faker.person.lastName();
        let email = faker.internet.email();
        let endereco = faker.location.streetAddress();
        let cidade = faker.location.city();
        let cep = '01001-000';
        let telefone = '119' + faker.string.numeric(8);
        let senha = faker.internet.password();

        // Preenchendo formulário
        cy.get('#billing_first_name').type(nome);
        cy.get('#billing_last_name').type(sobrenome);


        cy.get('#billing_country_field .select2-selection__arrow').click();
        cy.get('.select2-search__field').type('Brasil{enter}');

        cy.get('#billing_address_1').type(endereco);
        cy.get('#billing_city').type(cidade);
        cy.get('#billing_postcode').type(cep);
        cy.get('#billing_phone').type(telefone);
        cy.get('#billing_email').type(email);

        cy.get('#billing_state_field .select2-selection__arrow').click();
        cy.get('.select2-search__field').type('São Paulo{enter}');

        cy.get('#createaccount').click()
        cy.get('#account_password').type(senha)


        cy.get('#payment_method_cod').click()
        cy.get('#terms').check()
        cy.get('#place_order').click()
        cy.url({ timeout: 10000 }).should('include', 'order-received')

    });

}); 