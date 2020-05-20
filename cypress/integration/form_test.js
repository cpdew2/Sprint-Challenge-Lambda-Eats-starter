
describe("Test the form inputs", () => {  
    it("visit URL", () => {

        cy.visit("http://localhost:3000/form");


        cy.get('input[type="text"]');
        

        cy.get('textarea').type("ring door bell twice").clear();
        

        cy.get("Form").submit();
       


    });
});