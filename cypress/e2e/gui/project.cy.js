import { faker } from '@faker-js/faker';


describe("Project scenarios", ()=>{
    beforeEach(()=>{
        cy.api_deleteAllProjects()
        cy.login()
    })

    it("Create Successfully",()=>{
        const project = {
            name : `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.gui_createProject(project)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/root/`+project.name)
    })

})
