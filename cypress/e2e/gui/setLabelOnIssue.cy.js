import { faker } from '@faker-js/faker';


describe("Label issue scenarios", ()=>{
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project :{
            name : `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }   
    const label ={
        name: `label-${faker.datatype.uuid()}`,
        color: '#ffaabb'
    }

    beforeEach(()=>{
        cy.login()
        cy.api_deleteAllProjects()
        cy.api_createIssue(issue).then(resp =>{
            cy.api_createLabel(resp.body.project_id, label)
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${resp.body.author.id}`)
        })
        
    })

    it("Add label on issue Successfully",()=>{
       cy.gui_setLabelOnIssue(label)
       cy.get('.qa-labels-block').should('contain', label.name)
       cy.get('.qa-labels-block span')
        .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`);
        
    })

})
