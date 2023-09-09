describe('trying to do almost everything a typical user would do', () => {
  it('should pass a long story', () => {
    cy.visit('/');
    cy.log('add 3 todos');
    cy.getBySel('new-todo-input')
      .type('write code{enter}')
      .type('write tests{enter}')
      .type('deploy{enter}');
    cy.getBySel('todo-item').should('have.length', 3);

    cy.log('1st todo has been done');
    cy.getBySel('todo-item').first().find('.toggle').check();
    cy.getBySel('todo-item').first().should('have.class', 'completed');

    cy.log('by default "All" filter is active');
    cy.contains('.filters a.selected', 'All').should('be.visible');
    cy.contains('.filters a', 'Active')
      .click()
      .should('have.class', 'selected')
      .and('be.visible');
    cy.getBySel('todo-item').should('have.length', 2);

    cy.log('check "Completed" todos');
    cy.contains('.filters a', 'Completed')
      .click()
      .should('have.class', 'selected')
      .and('be.visible');
    cy.getBySel('todo-item').should('have.length', 1);

    cy.log('remove completed todos');
    cy.getBySel('clear-completed').click();
    cy.getBySel('todo-item').should('have.length', 0);
    cy.contains('.filters a', 'All')
      .click()
      .should('have.class', 'selected')
      .and('be.visible');
    cy.getBySel('todo-item').should('have.length', 2);
  });
});
