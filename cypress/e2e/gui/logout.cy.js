
describe("Logout scenarios", ()=>{

    beforeEach(() => {

      cy.login()
        cy.visit('/')
        
    })
    it("Logout Successfully",()=>{
      
       cy.logout()
       cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })

})