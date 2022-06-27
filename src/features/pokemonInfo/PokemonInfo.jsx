import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPagePokemonInfoAction } from '../../store/pokemon.actions';

const PokemonInfo = () => {
  const dispatch = useDispatch();

  const { name, avatar, stats, moves, currentPage, rowsPerPage } = useSelector(
    state => state.pokemon
  );

  const changePageHandler = (e, pageNumber) => {
    dispatch(setPagePokemonInfoAction(pageNumber));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const movesToRender = moves.slice(startIndex, endIndex);

  if (!name) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6">Choise pokemon</Typography>
      </Paper>
    );
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ backgroundColor: '#F0E68C' }} src={avatar} />}
        title={<Typography variant="h6">{name}</Typography>}
        subheader={
          <Stack sx={{ flexWrap: 'wrap', gap: '3px' }} direction="row">
            {stats.map(({ base_stat, stat }) => {
              return (
                <Chip key={stat.name} label={`${stat.name}: ${base_stat} `} />
              );
            })}
          </Stack>
        }
      />
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Move</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movesToRender.map(({ move }) => {
              return (
                <TableRow
                  key={move.url}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{move.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          siblingCount={0}
          page={currentPage}
          onChange={changePageHandler}
          count={Math.ceil(moves.length / rowsPerPage)}
        />
      </CardContent>
    </Card>
  );
};

export default PokemonInfo;
