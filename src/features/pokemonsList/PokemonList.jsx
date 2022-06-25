import { Pagination, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonByName, fetchPokemons } from '../../store/pokemon.actions';

const PokemonList = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);
  const pokemons = useSelector(state => state.pokemons);

  useEffect(() => {
    dispatch(fetchPokemons(currentPage));
  }, []);

  const changePageHandler = (e, page) => {
    dispatch(fetchPokemons(page));
  };

  return (
    <Box component={Paper}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5">Pokemons</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons.map(({ name }) => (
              <TableRow
                onClick={() => dispatch(fetchPokemonByName(name))}
                key={name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          size="small"
          count={10}
          page={currentPage}
          onChange={changePageHandler}
        />
      </TableContainer>
    </Box>
  );
};

export default PokemonList;
