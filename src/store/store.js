import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { pokemonsReducer } from './pokemon.reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(pokemonsReducer, composedEnhancer);

export default store;
