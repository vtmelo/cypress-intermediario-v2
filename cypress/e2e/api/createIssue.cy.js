import { faker } from "@faker-js/faker"

describe( 'Create Project', ()=>{

    beforeEach(()=>{
        cy.api_deleteAllProjects()
    })

    it('Create Successfully' , ()=>{
        const issue ={
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            project :{
                name : `project-${faker.datatype.uuid()}`,
                description: faker.random.words(5)
            }
        }   

        cy.api_createIssue(issue).then(resp =>{
            expect(resp.status).to.be.equal(201)
            expect(resp.body.title).to.equal(issue.title)
            expect(resp.body.description).to.equal(issue.description)

        })

    })
})