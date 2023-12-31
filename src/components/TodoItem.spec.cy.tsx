import React from 'react';
import TodoItem from './TodoItem';

const setup = (editing = false) => {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false,
    },
    editTodo: cy.stub().as('edit'),
    deleteTodo: cy.stub().as('delete'),
    completeTodo: cy.stub().as('completeTodo'),
  };

  cy.mountWithRedux(<TodoItem {...props} />);

  if (editing) {
    cy.get('label').dblclick();
  }
};

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      setup();

      cy.get('li')
        .should('have.class', 'todo')
        .find('div')
        .should('have.class', 'view');

      cy.get('input[type=checkbox]')
        .should('have.class', 'toggle')
        .and('not.be.checked');

      cy.contains('label', 'Use Redux');
      cy.get('button').should('have.class', 'destroy');
    });

    it('input onChange should call completeTodo', () => {
      setup();
      cy.get('input').check();
      cy.get('@completeTodo').should('have.been.calledWith', 0);
    });

    it('button onClick should call deleteTodo', () => {
      setup();
      // button only becomes visible on hover
      cy.get('.destroy').click({ force: true });
      cy.get('@delete').should('have.been.calledWith', 0);
    });

    it('label onDoubleClick should put component in edit state', () => {
      setup();
      cy.get('label').dblclick();
      cy.get('li').should('have.class', 'editing');
    });

    it('edit state render', () => {
      setup(true);
      cy.get('li').should('have.class', 'editing');
      cy.get('input').should('be.visible').and('have.value', 'Use Redux');
    });

    it('TodoTextInput onSave should call editTodo', () => {
      setup(true);
      cy.focused().type('{enter}');
      cy.get('@edit').should('have.been.calledWith', 0, 'Use Redux');
    });

    it('TodoTextInput onSave should call deleteTodo if text is empty', () => {
      setup(true);
      cy.focused().clear().type('{enter}');
      cy.get('@delete').should('have.been.calledWith', 0);
    });

    it('TodoTextInput onSave should exit component from edit state', () => {
      setup(true);
      cy.get('li').should('have.class', 'editing');
      cy.focused().type('{enter}');
      cy.get('li').should('not.have.class', 'editing');
    });
  });
});
