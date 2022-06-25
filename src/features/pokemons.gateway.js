import axios from 'axios';

export const getPokemons = page => {
  return axios
    .get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        offset: page * 10 - 10,
        limit: 10,
      },
    })
    .then(response => response.data);
};

export const getPokemonByName = name => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      return response.data;
    });
};
