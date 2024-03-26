import { faker } from '@faker-js/faker';


describe('Git Clone scenarios', ()=>{
    const project = { 
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        initialize_with_readme: true

    }

    beforeEach(() => {
        cy.api_deleteAllProjects()
        cy.api_createProject(project)
      })

    it('Clone Successfully',()=>{
        cy.cloneViaSSH(project)

        cy.readFile(`cypress/downloads/${project.name}/README.md`)
            .should('contain', `# ${project.name}`)
            .and('contain', project.description)
    })

})