import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage'
import NavBar from './Components/NavBar';
import GenresPage from './Pages/GenresPage'
import MovieDetailsPage from './Pages/MovieDetailsPage';
import './App.css'

function App() {
 

  return <>
      <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
      <Route  path='/' element={<HomePage></HomePage>}> </Route>
      <Route  path='/genres' element={<GenresPage></GenresPage>}> </Route>   {/* sur l'url quand après le / on écrit genres, on tombe sur la page GenreP*/}
      <Route  path='/movie/:id' element={<MovieDetailsPage></MovieDetailsPage>}> </Route>  {/* : id, il change l'id du film*/}
      </Routes>
      </BrowserRouter>
    </>
  }

export default App
