import { faker } from '@faker-js/faker';


describe("Issue scenarios", ()=>{
    beforeEach(()=>{
        cy.login()
        cy.api_deleteAllProjects()
    })

    it("Create Successfully",()=>{
        const issue ={
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            project :{
                name : `project-${faker.datatype.uuid()}`,
                description: faker.random.words(5)
            }
        }   

        cy.gui_createIssue(issue)

        cy.contains(issue.title).should('be.visible')
        cy.contains(issue.description).should('be.visible')
    })

})
