import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from './Pages/HomePage'
import NavBar from './Components/NavBar';
import GenresPage from './Pages/GenresPage'

function App() {
 

  return <>
      <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
      <Route  path='/' element={<HomePage></HomePage>}> </Route>
      <Route  path='/genres' element={<GenresPage></GenresPage>}> </Route>   {/* sur l'url quand après le / on écrit genres, on tombe sur la page GenreP*/}

      </Routes>
      </BrowserRouter>
    </>
  }

export default App
