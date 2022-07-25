import React, { Reducer } from 'react';

type ActionType = 'increment' | 'decrement' | 'set';
type Action = { type: ActionType, payload?: number };
type State = { count: number };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'set':
      return { count: action.payload || 0 };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const useCount = (initialCount = 0) => {
  const [{ count }, dispatch] = React.useReducer(reducer, { count: initialCount });

  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });
  const set = (count: number) => dispatch({ type: 'set', payload: count });

  return { count, increment, decrement, set };
};

const Count = ({ initialCount = 0 }) => {
  const { count, increment, decrement, set } = useCount(initialCount);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="number"
          value={count}
          onChange={e => {
            set(parseInt(e.currentTarget.value));
          }}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Count initialCount={10} />
    </div>
  );
}

export default App;
