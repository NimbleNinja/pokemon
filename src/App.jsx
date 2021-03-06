import {
  AppBar,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PokemonInfo from './features/pokemonInfo/PokemonInfo';
import PokemonList from './features/pokemonsList/PokemonList';
import './styles/App.scss';
import SearchPokemon from './features/search/SearchPokemon';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e8e8e8',
      }}
    >
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Pokemon</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 1, pb: 2 }}>
        <Box>
          <Grid container spacing={1} direction={{ xs: 'column', sm: 'row' }}>
            <Grid item xs={12}>
              <SearchPokemon />
            </Grid>
            <Grid item xs={5}>
              <PokemonList />
            </Grid>
            <Grid item xs={7}>
              <PokemonInfo />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
