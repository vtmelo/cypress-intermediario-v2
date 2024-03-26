
Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    {cacheSession = true} ={}
) => { 
    const login = ()=>{
        cy.visit("/users/sign_in")
        cy.get('#user_login').type(user)
        cy.get('#user_password').type(password,{log:false})
        cy.get('[data-qa-selector="sign_in_button"]').click()
    
    }
    const validate = () =>{
        cy.visit('/')
        cy.location('pathname', { timeout:1000})
        .should('not.equal', '/users/sign_in')
    }

    const options = { 
        cacheAcrossSpecs: true,
        validate,
    }
    if (cacheSession) { 
        cy.session(user, login, options)
    }else{
        login()     
    }
  
 })

Cypress.Commands.add('logout', () => { 
    cy.get('.header-user-dropdown-toggle').click()
    cy.get('.sign-out-link').click()
 })


Cypress.Commands.add('gui_createProject', (project) => { 
    cy.visit('/projects/new')
    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()

    cy.contains('Create project').click()    
})

Cypress.Commands.add('gui_createIssue', (issue) => { 
    cy.api_createProject(issue.project)
    cy.visit(`/${Cypress.env("user_name")}/${issue.project.name}/issues/new`)
    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)

    cy.contains('Submit issue').click()    
})

Cypress.Commands.add('gui_setLabelOnIssue', (label) => { 
    cy.get(".qa-edit-link-labels").click()
    cy.contains(label.name).click()
    cy.get('body').click()  
})


Cypress.Commands.add('gui_setMilestoneOnIssue', (milestone) => { 
    cy.get(".milestone a").click()
    cy.contains(milestone.title).click()
    cy.get('body').click()  
})