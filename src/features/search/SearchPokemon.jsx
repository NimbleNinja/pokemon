import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemonByName } from '../../store/pokemon.actions';

const SearchPokemon = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const searchHandler = () => {
    if (!value) {
      return;
    }

    dispatch(fetchPokemonByName(value));
    setValue('');
  };

  return (
    <Paper sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
      <InputBase
        value={value}
        onChange={e => setValue(e.target.value)}
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search by name of number"
      />
      <IconButton onClick={searchHandler}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchPokemon;
