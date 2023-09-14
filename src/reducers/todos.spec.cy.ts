import todosReducer from './todos';
import * as types from '../constants/ActionTypes';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todosReducer(undefined, {} as any)).to.deep.equal([]);
  });

  it('should handle ADD_TODO', () => {
    expect(
      todosReducer([], {
        type: types.ADD_TODO,
        text: 'Run the tests',
      })
    ).to.deep.equal([
      {
        text: 'Run the tests',
        completed: false,
        id: 0,
      },
    ]);

    expect(
      todosReducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.ADD_TODO,
          text: 'Run the tests',
        }
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
      },
    ]);

    expect(
      todosReducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
        ],
        {
          type: types.ADD_TODO,
          text: 'Fix the tests',
        }
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Fix the tests',
        completed: false,
        id: 2,
      },
    ]);
  });

  it('should handle DELETE_TODO', () => {
    expect(
      todosReducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
        ],
        {
          type: types.DELETE_TODO,
          id: 1,
        }
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ]);
  });

  it('should handle EDIT_TODO', () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.EDIT_TODO,
          text: 'Fix the tests',
          id: 1,
        }
      )
    ).to.deep.equal([
      {
        text: 'Fix the tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ]);
  });

  it('should handle COMPLETE_TODO', () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: false,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.COMPLETE_TODO,
          id: 1,
        }
      )
    ).to.deep.equal([
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ]);
  });

  it('should handle COMPLETE_ALL_TODOS', () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.COMPLETE_ALL_TODOS,
        }
      )
    ).to.deep.equal([
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: true,
        id: 0,
      },
    ]);

    // Unmark if all todos are currently completed
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: true,
            id: 0,
          },
        ],
        {
          type: types.COMPLETE_ALL_TODOS,
        }
      )
    ).to.deep.equal([
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ]);
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todosReducer(
        [
          {
            text: 'Run the tests',
            completed: true,
            id: 1,
          },
          {
            text: 'Use Redux',
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.CLEAR_COMPLETED,
        }
      )
    ).to.deep.equal([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
      },
    ]);
  });

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [
        {
          type: types.COMPLETE_TODO,
          id: 0,
        },
        {
          type: types.CLEAR_COMPLETED,
        },
        {
          type: types.ADD_TODO,
          text: 'Write more tests',
        },
        // @ts-ignore
      ].reduce(todosReducer, [
        {
          id: 0,
          completed: false,
          text: 'Use Redux',
        },
        {
          id: 1,
          completed: false,
          text: 'Write tests',
        },
      ])
    ).to.deep.equal([
      {
        text: 'Write tests',
        completed: false,
        id: 1,
      },
      {
        text: 'Write more tests',
        completed: false,
        id: 2,
      },
    ]);
  });
});
