import axios from 'axios';

const url = 'https://pokeapi.co/api/v2';

export const getPokemons = page => {
  return axios
    .get(`${url}/pokemon`, {
      params: {
        offset: page * 10 - 10,
        limit: 10,
      },
    })
    .then(response => response.data);
};

export const getPokemonsByType = type => {
  return axios.get(`${url}/type/${type}`).then(response => response.data);
};

export const getPokemonByName = name => {
  return axios.get(`${url}/pokemon/${name}`).then(response => {
    return response.data;
  });
};

export const getTypes = () => {
  return axios.get(`${url}/type`).then(response => response.data.results);
};
