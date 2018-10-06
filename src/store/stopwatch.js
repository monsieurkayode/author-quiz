/**
 * These can also be seen as action types
 * in the redux sense of things. Here we declare
 * the intents(actions) as constants that our state
 * container will use to modify the model(application) state
 * which is in turn used by the function that renders the view
 * to make the applied updates
 */
const intents = {
	TICK: 'TICK',
  START: 'START',
  STOP: 'STOP',
  RESET: 'RESET'
}

/**
 * This is the reducer for modify the model state
 * Here we pass in the initial state of the model
 * to the update function and an intent(action) that
 * identifies what kind of changes to be made based
 * on the state and intent type (action type)
 * 
 * @function update
 * 
 * @param {object} model 
 * @param {string} intent 
 */
const update = (model = { running: false, time: 0 }, intent) => {
  /**
   * updates here can also be seen as the action creator which
   * return a plain object when invoked which in this case
   * is the modified state based on the intent
   */
	const updates = {
  	TICK: () => ({...model, time: model.time + (model.running ? 1 : 0) }),
    START: () => ({...model, running: true }),
    STOP: () => ({...model, running: false }),
    RESET: () => ({...model, time: 0 }),
  }
  
  return (updates[intent] || (() => model))(model);
}

/**
 * Receives the model as an argument to output
 * the user interface representing the state.
 * The view is where intents are generated to change
 * the model which is then passed back to the view
 * to be rendered
 * 
 * @function view
 *
 * @param {object} m 
 */
const view = (m) => {
	const minutes = Math.floor(m.time / 60);
  const seconds = m.time - (minutes * 60);
  const formattedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`;

  let handler = (event) => {
  	container.dispatch(m.running ? 'STOP' : 'START');
  };
  
	return(
  	<div>
  		<p>{minutes}:{formattedSeconds}</p>
      <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
      <button onClick={() => container.dispatch('RESET')}>Reset</button>
  	</div>)
}

/**
 * Here is our single source of truth, the store
 * It converts our current state and intent to a new updated state
 * This contains three methods,
 * dispatch - a new intent(action)
 * getState - get the current state of the model
 * subscribe - holds a callback to be called when the application
 * state held within the store changes
 * an intent is dispatched.
 * 
 * @function createStore
 * 
 * @param {function} reducer 
 */
const createStore = (reducer) => {
	let internalState;
  let handlers = [];
	return {
  	dispatch: (intent) => {
  		internalState = reducer(internalState, intent);
      handlers.forEach(handler => { handler(); });
  	},
    subscribe: (handler) => handlers.push(handler),
    getState: () => internalState
  }
}

// This is the custom state container
let container = createStore(update); 

const render = () => {
	ReactDOM.render(view(container.getState()), mountNode)
}
container.subscribe(render);

setInterval(() => {
	container.dispatch('TICK');
}, 1000); 