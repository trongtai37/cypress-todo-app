import React from 'react';
import Header from './Header';

describe('components', () => {
  describe('Header', () => {
    beforeEach(() => {
      const props = {
        addTodo: cy.stub().as('addTodo'),
      };

      cy.mountWithRedux(<Header {...props} />);
    });

    it('should render correctly', () => {
      cy.get('header').should('have.class', 'header').contains('h1', 'todos');
      cy.get('header input').should(
        'have.attr',
        'placeholder',
        'What needs to be done?'
      );
    });

    it('should call addTodo if length of text is greater than 0', () => {
      cy.get('header input').type('{enter}');
      cy.get('@addTodo').should('not.have.been.called');

      cy.get('header input').type('Use Redux{enter}');
      cy.get('@addTodo').should('have.been.called');
    });
  });
});
