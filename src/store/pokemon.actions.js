import {
  getPokemons,
  getPokemonByName,
  getPokemonsByType,
  getTypes,
} from '../features/pokemons.gateway';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SET_POKEMON_PAGE = 'SET_POKEMON_PAGE';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_TYPES = 'SET_TYPES';
export const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';

export const setPokemonsAction = pokemonsList => {
  return {
    type: GET_POKEMONS,
    payload: {
      pokemonsList,
    },
  };
};

export const setPokemonByNameAction = pokemon => {
  return {
    type: GET_POKEMON_BY_NAME,
    payload: {
      pokemon,
    },
  };
};

export const setPageAction = page => {
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

export const setTotalPokemons = total => {
  return {
    type: SET_TOTAL,
    payload: {
      total,
    },
  };
};

export const setTypes = types => {
  return {
    type: SET_TYPES,
    payload: {
      types,
    },
  };
};

export const setCurrentType = type => {
  return {
    type: SET_CURRENT_TYPE,
    payload: {
      type,
    },
  };
};

export const initAction = () => {
  return function (dispatch, getState) {
    const pokemons = getPokemons(getState().currentPage);
    const types = getTypes();

    Promise.all([pokemons, types]).then(data => {
      dispatch(setTotalPokemons(data[0].count));
      dispatch(setPokemonsAction(data[0].results));

      console.log(data[1]);
      dispatch(setTypes(data[1]));
    });
  };
};

export function fetchPokemons(page, type) {
  return function (dispatch, useState) {
    if (!type) {
      getPokemons(page).then(pokemons => {
        dispatch(setPokemonsAction(pokemons.results));
        dispatch(setPageAction(page));
        dispatch(setTotalPokemons(pokemons.count));
      });
    }

    if (type === useState().currentType) {
      dispatch(setPageAction(page));
      return;
    }

    if (type) {
      getPokemonsByType(type).then(data => {
        const pokemonsList = data.pokemon.map(item => {
          return {
            name: item.pokemon.name,
          };
        });

        dispatch(setPokemonsAction(pokemonsList));
        dispatch(setPageAction(page));
        dispatch(setTotalPokemons(data.pokemon.length));
      });
    }
  };
}

export function fetchPokemonByName(name) {
  return function (dispatch, getState) {
    getPokemonByName(name).then(pokemon => {
      dispatch(setPokemonByNameAction(pokemon));
      dispatch(setPagePokemonInfoAction(1));
    });
  };
}
