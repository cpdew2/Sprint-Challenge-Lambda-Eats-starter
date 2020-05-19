beforeEach(function () {
    cy.visit('http://localhost:3000/');
})
describe('Test the form inputs', function () {
    it('adds text to name field', function() {
        cy.get('size')
        .select(MD)
        .should('have.value', 'Md')

        cy.get('[type="checkbox"]')
        .check()
        .should('be.checked')

        cy.get('[name="textarea"]')
        .click()
        .type("ring door bell twice")
        .should("have.value", "ring door bell twice")

        cy.contains('Submit')
        .click({force: true});
    });
});