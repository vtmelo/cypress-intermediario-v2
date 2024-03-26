const access_token = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', (project) => { 
   
    cy.request({
        method: 'POST',
        url: '/api/v4/projects',
        body:{
            name: project.name,
            description : project.description,
            initialize_with_readme: project.initialize_with_readme
        },
        headers: { Authorization : access_token},
    })
})

Cypress.Commands.add('api_getAllProjects', () => { 
   
    cy.request({
        method: 'GET',
        url: '/api/v4/projects',
        headers: { Authorization : access_token},
    })
})

Cypress.Commands.add('api_deleteAllProjects', (project) => { 
   
    cy.api_getAllProjects().then(resp =>
        resp.body.forEach(project => 
            cy.request({
                method: 'DELETE',
                url:`/api/v4/projects/${project.id}`,
                headers: { Authorization : access_token},
            })
        )
    )
     
})

Cypress.Commands.add('api_createIssue', (issue) => { 
   cy.api_createProject(issue.project).then(resp =>
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${resp.body.id}/issues`,
            body:{
                title: issue.title,
                description : issue.description,
            },
            headers: { Authorization : access_token},
        })
   )
   
})

Cypress.Commands.add('api_createLabel', (projectId, label) => { 
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/labels`,
        body:{
            name: label.name,
            color : label.color,
        },
        headers: { Authorization : access_token},
    })    
 })

 Cypress.Commands.add('api_createMilestone', (milestone, projectId) => { 
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/milestones`,
        body:{
            title: milestone.title
        },
        headers: { Authorization : access_token},
    })    
 })