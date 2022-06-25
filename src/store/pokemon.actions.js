import { getPokemons, getPokemonByName } from '../features/pokemons.gateway';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SET_POKEMON_PAGE = 'SET_POKEMON_PAGE';

export const getPokemonsAction = pokemonsList => {
  return {
    type: GET_POKEMONS,
    payload: {
      pokemonsList,
    },
  };
};

export const getPokemonByNameAction = pokemon => {
  return {
    type: GET_POKEMON_BY_NAME,
    payload: {
      pokemon,
    },
  };
};

export const changePageAction = page => {
  return {
    type: CHANGE_PAGE,
    payload: {
      currentPage: page,
    },
  };
};

export const setPagePokemonInfoAction = page => {
  return {
    type: SET_POKEMON_PAGE,
    payload: {
      pageNumber: page,
    },
  };
};

export function fetchPokemons(page) {
  return function (dispatch) {
    getPokemons(page).then(pokemons => {
      dispatch(getPokemonsAction(pokemons.results));
      dispatch(changePageAction(page));
    });
  };
}

export function fetchPokemonByName(name) {
  return function (dispatch, getState) {
    getPokemonByName(name).then(pokemon => {
      dispatch(getPokemonByNameAction(pokemon));
      dispatch(setPagePokemonInfoAction(1));
    });
  };
}
