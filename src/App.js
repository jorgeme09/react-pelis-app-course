import { GlobalStyle } from './GlobalStyle';
import Header from './components/Header'
import Home from './components/Home'
import Movie from './components/Movie';
import NotFound from './components/NotFound';
//Routing
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<Movie />} />
      <Route path />
    </Routes>
    <GlobalStyle />
  </Router>
);

export default App;
