import { faker } from "@faker-js/faker"

describe("Milestones scenarios", ()=>{
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
    const milestone = { 
        title : `milestone-${faker.datatype.uuid()}`
    }

    beforeEach(()=>{
        cy.login()
        cy.api_deleteAllProjects()
        cy.api_createIssue(issue).then(resp =>{
            cy.api_createLabel(resp.body.project_id, label)
            cy.api_createMilestone(milestone, resp.body.project_id)
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${resp.body.author.id}`)
        })
        
    })

    it("Add milestone on issue Successfully",()=>{
       cy.gui_setMilestoneOnIssue(milestone)
        cy.get('.block.milestone').should('contain', milestone.title)
    })

})