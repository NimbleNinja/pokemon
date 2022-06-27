import {
  GET_POKEMONS,
  CHANGE_PAGE,
  GET_POKEMON_BY_NAME,
  SET_POKEMON_PAGE,
  SET_TYPES,
  SET_CURRENT_TYPE,
  SET_TOTAL,
} from './pokemon.actions';

const initialState = {
  pokemons: [],
  currentPage: 1,
  rowsPerPage: 10,
  total: 0,
  types: [],
  currentType: '',
  pokemon: {
    currentPage: 1,
    rowsPerPage: 10,
    name: null,
    avatar: null,
    stats: [],
    moves: [],
  },
};

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS: {
      return {
        ...state,
        pokemons: [...action.payload.pokemonsList],
      };
    }

    case SET_TYPES: {
      return {
        ...state,
        types: [...action.payload.types],
      };
    }

    case SET_CURRENT_TYPE: {
      return {
        ...state,
        currentType: action.payload.type,
      };
    }

    case GET_POKEMON_BY_NAME: {
      const { name, sprites, stats, moves } = action.payload.pokemon;

      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          name,
          avatar: sprites.front_default,
          stats,
          moves,
        },
      };
    }

    case CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    }

    case SET_TOTAL: {
      return {
        ...state,
        total: Math.ceil(action.payload.total / 10),
      };
    }

    case SET_POKEMON_PAGE: {
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          currentPage: action.payload.pageNumber,
        },
      };
    }

    default: {
      return state;
    }
  }
};
