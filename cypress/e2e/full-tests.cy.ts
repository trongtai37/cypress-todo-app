describe('Basic CRUD Todo app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('When page first loads without initial todos', () => {
    it('should focus on the todo input field when the page loads', () => {
      cy.focused().should('have.attr', 'data-test', 'new-todo-input');
    });

    it('should not render the todo list and footer when there are no todos', () => {
      cy.getBySel('todo-list').children().should('have.length', 0);
      cy.getBySel('footer').should('not.exist');
    });
  });

  context('Create todos', () => {
    it('should add 3 todos', () => {
      cy.getBySel('new-todo-input').type('todo 1{enter}');
      cy.getBySel('new-todo-input').type('todo 2{enter}');
      cy.getBySel('new-todo-input').type('todo 3{enter}');
      cy.getBySel('todo-list').children().should('have.length', 3);
    });

    it('should add correct todo text to the todo list', () => {
      cy.getBySel('new-todo-input').type('todo 1{enter}');
      cy.getBySel('todo-list')
        .children()
        .eq(0)
        .find('label')
        .should('contain', 'todo 1');

      cy.getBySel('new-todo-input').type('todo 2{enter}');
      cy.getBySel('todo-list')
        .children()
        .eq(1)
        .find('label')
        .should('contain', 'todo 2');
    });

    it('should clear the input field when a todo is added', () => {
      cy.getBySel('new-todo-input').type('todo 1{enter}');
      cy.getBySel('new-todo-input').should('have.value', '');
    });

    it('should trim the input', () => {
      cy.getBySel('new-todo-input').type('   todo 1   {enter}');
      cy.getBySel('todo-list')
        .children()
        .eq(0)
        .find('label')
        .should('have.text', 'todo 1');
    });

    it('should show footer when a todo is added', () => {
      cy.getBySel('new-todo-input').type('todo 1{enter}');
      cy.getBySel('footer').should('be.visible');
    });

    it('does not allow adding empty todos', () => {
      cy.getBySel('new-todo-input').type('{enter}');
      cy.getBySel('todo-list').children().should('have.length', 0);
    });

    it('does not allow adding todos with only spaces', () => {
      cy.getBySel('new-todo-input').type('   {enter}');
      cy.getBySel('todo-list').children().should('have.length', 0);
    });
  });

  context('Make actions to a todo', () => {
    beforeEach(cy.createDefaultTodos);

    it('should mark as completed a todo', () => {
      cy.getBySel('todo-list').children().eq(1).find('.toggle').check();

      cy.getBySel('todo-list')
        .children()
        .eq(1)
        .find('label')
        .should('have.css', 'text-decoration-line', 'line-through');
    });

    it('should un-mark as completed a todo', () => {
      cy.getBySel('todo-list').children().eq(1).find('.toggle').check();
      cy.getBySel('todo-list').children().eq(1).find('.toggle').uncheck();

      cy.getBySel('todo-list')
        .children()
        .eq(1)
        .find('label')
        .should('not.have.css', 'text-decoration-line', 'line-through');
    });

    it('should delete a todo', () => {
      cy.getBySel('todo-list')
        .children()
        .eq(1)
        .find('.destroy')
        .click({ force: true });

      cy.getBySel('todo-list').children().should('have.length', 2);
    });

    it('should edit a todo', () => {
      cy.getBySel('todo-list').children().eq(1).find('label').dblclick();

      cy.getBySel('todo-list')
        .children()
        .eq(1)
        .find('.edit')
        .type(' edited{enter}');

      cy.getBySel('todo-list')
        .children()
        .eq(1)
        .find('label')
        .should('have.text', 'todo 2 edited');
    });
  });

  context('Todo counter', () => {
    it('should show correct number of todos', () => {
      cy.createDefaultTodos();

      cy.getBySel('todo-count').should('have.text', '3 items left');

      cy.getBySel('todo-list').children().eq(1).find('.toggle').check();

      cy.getBySel('todo-count').should('have.text', '2 items left');

      cy.getBySel('todo-list').children().eq(1).find('.toggle').uncheck();

      cy.getBySel('todo-count').should('have.text', '3 items left');
    });
  });

  context('Mark all as completed', () => {
    beforeEach(cy.createDefaultTodos);

    const completeAllTodos = () => {
      cy.getBySel('toggle-all-label').click({ force: true });
    };

    it('should mark all todos as completed', () => {
      completeAllTodos();

      cy.getBySel('todo-list')
        .children()
        .each((todo) => {
          cy.wrap(todo)
            .find('label')
            .should('have.css', 'text-decoration-line', 'line-through');
        });
    });

    it('should update all checkbox status when todos are completed or cleared', () => {
      cy.getBySel('toggle-all-checkbox').should('not.be.checked');

      completeAllTodos();

      cy.getBySel('toggle-all-checkbox').should('be.checked');

      cy.getBySel('todo-list').children().eq(1).find('.toggle').uncheck();

      cy.getBySel('toggle-all-checkbox').should('not.be.checked');
    });
  });

  context('Clear completed button', () => {
    beforeEach(cy.createDefaultTodos);

    it('should show clear completed button when there are completed todos', () => {
      cy.getBySel('todo-list').children().eq(1).find('.toggle').check();
      cy.getBySel('todo-list').children().eq(2).find('.toggle').check();
      cy.getBySel('clear-completed')
        .should('be.visible')
        .contains('Clear completed');

      it('should clear completed todos when clicked', () => {
        cy.getBySel('todo-list').children().eq(1).find('.toggle').check();
        cy.getBySel('todo-list').children().eq(2).find('.toggle').check();

        cy.getBySel('clear-completed').click({ force: true });

        cy.getBySel('todo-list').children().should('have.length', 1);
      });
    });

    it('should not show clear completed button when there are no completed todos', () => {
      cy.getBySel('new-todo-input').type('todo 1{enter}');
      cy.getBySel('new-todo-input').type('todo 2{enter}');

      cy.getBySel('clear-completed').should('not.exist');
    });
  });

  context('Visibility filters', () => {
    beforeEach(cy.createDefaultTodos);

    it('should show all todos when all filter is clicked', () => {
      cy.getBySel('todo-list').children().should('have.length', 3);

      cy.getBySel('todo-list').children().eq(1).find('.toggle').check();

      cy.getBySel('todo-list').children().should('have.length', 3);

      cy.getBySel('todo-list').children().eq(1).find('.toggle').uncheck();

      cy.getBySel('todo-list').children().should('have.length', 3);
    });

    it('should highlight the active filter', () => {
      cy.getBySel('filters').within(function () {
        cy.contains('All').should('have.class', 'selected');
        cy.contains('Active').click().should('have.class', 'selected');
        cy.contains('Completed').click().should('have.class', 'selected');
      });
    });

    it('should allow me to display only completed items', () => {
      cy.getBySel('todo-list').children().eq(1).find('.toggle').check();
      cy.getBySel('todo-list').children().eq(2).find('.toggle').check();

      cy.getBySel('filters').within(function () {
        cy.contains('Completed').click();
      });

      cy.getBySel('todo-list').children().should('have.length', 2);
    });

    it('should allow me to display all items', () => {
      cy.getBySel('todo-list').children().eq(1).find('.toggle').check();
      cy.getBySel('todo-list').children().eq(2).find('.toggle').check();

      cy.getBySel('filters').within(function () {
        cy.contains('Completed').click();
      });

      cy.getBySel('filters').within(function () {
        cy.contains('All').click();
      });

      cy.getBySel('todo-list').children().should('have.length', 3);
    });
  });
});
