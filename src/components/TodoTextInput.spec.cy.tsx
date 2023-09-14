import React from 'react';
import TodoTextInput from './TodoTextInput';

const setup = (
  propOverrides: Partial<React.ComponentProps<typeof TodoTextInput>>
) => {
  const props = Object.assign(
    {
      onSave: cy.stub().as('onSave'),
      text: 'Use Redux',
      placeholder: 'What needs to be done?',
      editing: false,
      newTodo: false,
    },
    propOverrides
  );

  return cy.mount(<TodoTextInput {...props} />);
};

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      setup({
        newTodo: true,
      });
      cy.getBySel('new-todo-input').should('have.value', 'Use Redux');
    });

    it('should render correctly when editing=true', () => {
      setup({ editing: true });
      cy.getBySel('edit-todo-input').should('have.have.class', 'edit');
    });

    it('should call onSave on return key press', () => {
      setup({});
      cy.getBySel('edit-todo-input').clear().type('Use Redux{enter}');
      cy.get('@onSave').should('have.been.calledWith', 'Use Redux');
    });

    it('should reset state on return key press if newTodo', () => {
      setup({ newTodo: true });
      cy.getBySel('new-todo-input').type('Use Redux{enter}');
      cy.getBySel('new-todo-input').should('have.value', '');
    });

    it('should call onSave on blur', () => {
      setup({
        editing: true,
      });
      cy.getBySel('edit-todo-input').clear().type('Use Redux').blur();
      cy.get('@onSave').should('have.been.calledWith', 'Use Redux');
    });

    it("shouldn't call onSave on blur if newTodo", () => {
      setup({ newTodo: true });
      cy.getBySel('new-todo-input').clear().type('Use Redux').blur();
      cy.get('@onSave').should('not.have.been.called');
    });
  });
});
