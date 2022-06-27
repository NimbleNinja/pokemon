import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPokemonByName,
  fetchPokemons,
  initAction,
  setCurrentType,
} from '../../store/pokemon.actions';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { currentPage, currentType, types, pokemons, total, rowsPerPage } =
    useSelector(state => state);

  useEffect(() => {
    dispatch(initAction());
  }, []);

  const changePageHandler = (e, page) => {
    dispatch(fetchPokemons(page, currentType));
  };

  const changeTypeHandler = e => {
    dispatch(fetchPokemons(1, e.target.value));
    dispatch(setCurrentType(e.target.value));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const pokemonsToRender = currentType
    ? pokemons.slice(startIndex, endIndex)
    : pokemons;

  return (
    <Box component={Paper} sx={{ p: 1 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    value={currentType}
                    label="Type"
                    onChange={changeTypeHandler}
                  >
                    {/* type items */}
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {types.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonsToRender.map(({ name }) => (
              <TableRow
                onClick={() => dispatch(fetchPokemonByName(name))}
                key={name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell colSpan={2} component="th" scope="row">
                  {name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          size="small"
          count={total}
          page={currentPage}
          onChange={changePageHandler}
        />
      </TableContainer>
    </Box>
  );
};

export default PokemonList;
