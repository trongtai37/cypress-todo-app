import React from 'react';
import Footer from './Footer';

const setup = (propOverrides: Partial<React.ComponentProps<typeof Footer>>) => {
  const props = Object.assign(
    {
      completedCount: 0,
      activeCount: 0,
      onClearCompleted: cy.stub().as('clear'),
    },
    propOverrides
  );

  cy.mountWithRedux(<Footer {...props} />);
};

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      setup({});
      cy.contains('footer', 'No items left').should('have.class', 'footer');
    });

    it('should display active count when above 0', () => {
      setup({ activeCount: 1 });
      cy.contains('1 item left');
    });

    it('should render filters', () => {
      setup({});
      cy.get('footer li')
        .should('have.length', 3)
        .should((li) => {
          expect(li[0]).to.have.text('All');
          expect(li[1]).to.have.text('Active');
          expect(li[2]).to.have.text('Completed');
        });
    });

    it("shouldn't show clear button when no completed todos", () => {
      setup({ completedCount: 0 });
      cy.contains('button', 'Clear completed').should('not.exist');
    });

    it('should render clear button when completed todos', () => {
      setup({ completedCount: 1 });
      cy.contains('button', 'Clear completed').should(
        'have.class',
        'clear-completed'
      );
    });

    it('should call onClearCompleted on clear button click', () => {
      setup({ completedCount: 1 });
      cy.contains('button', 'Clear completed').click();
      cy.get('@clear').should('have.been.called');
    });
  });
});
