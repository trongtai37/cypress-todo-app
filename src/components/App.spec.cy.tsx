import App from './App';
import { addTodo, completeTodo } from '../actions';
import { getStore } from '../store';

const store = getStore();

describe('components', () => {
  const setup = () => {
    cy.mountWithRedux(<App />);
  };

  it('should render', () => {
    setup();
    cy.get('header').should('be.visible');
    cy.get('.main').should('exist');
  });

  it('should render a couple todos', () => {
    // use application code to interact with store
    store.dispatch(addTodo('write app code'));
    store.dispatch(addTodo('test components using Cypress'));
    store.dispatch(completeTodo(1));
    setup();

    // make sure the list of items is correctly checked
    cy.get('.todo').should('have.length', 2);
    cy.contains('.todo', 'write app code').should(
      'not.have.class',
      'completed'
    );
    cy.contains('.todo', 'test components using Cypress').should(
      'have.class',
      'completed'
    );
  });
});
