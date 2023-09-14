import React from 'react';
import MainSection from './MainSection';

const setup = (
  propOverrides: Partial<React.ComponentProps<typeof MainSection>>
) => {
  const props = Object.assign(
    {
      todosCount: 2,
      completedCount: 1,
      actions: {
        editTodo: cy.stub().as('edit'),
        deleteTodo: cy.stub().as('delete'),
        completeTodo: cy.stub().as('complete'),
        completeAllTodos: cy.stub().as('completeAll'),
        clearCompleted: cy.stub().as('clearCompleted'),
      },
    },
    propOverrides
  );

  cy.mountWithRedux(<MainSection {...props} />);
};

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      setup({});
      cy.get('section').should('have.class', 'main');
    });

    describe('toggle all input', () => {
      it('should render', () => {
        setup({});
        cy.get('input[type=checkbox]')
          .should('have.class', 'toggle-all')
          .and('not.be.checked');
      });

      it('should be checked if all todos completed', () => {
        setup({
          completedCount: 2,
        });
        cy.get('input[type=checkbox]').should('be.checked');
      });

      it('should call completeAllTodos on change', () => {
        setup({});
        cy.get('input[type=checkbox]').click({ force: true });
        cy.get('@completeAll').should('be.called');
      });
    });

    describe('footer', () => {
      it('should render', () => {
        setup({});
        cy.get('footer').contains('1 item left');
      });

      it('onClearCompleted should call clearCompleted', () => {
        setup({});
        cy.contains('button', 'Clear completed').click();
        cy.get('@clearCompleted').should('have.been.called');
      });
    });

    describe('visible todo list', () => {
      it('should render', () => {
        setup({});
        cy.get('li').should('have.length', 3);
      });
    });

    describe('toggle all input and footer', () => {
      it('should not render if there are no todos', () => {
        setup({
          todosCount: 0,
          completedCount: 0,
        });
        cy.get('li').should('have.length', 0);
      });
    });
  });
});
