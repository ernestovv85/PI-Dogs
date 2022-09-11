import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/LandingPage/landingPage';
import Home from '../components/Home/home';
import DogDetail from '../components/DogDetail/dogDetails';
import DogCreate from '../components/CreateDog/dogCreation';
import './App.css';

function App() {
  return (
      <div className='App'>
        <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/home/:id' element={<DogDetail/>}/>
        <Route exact path='/home/createDog' element={<DogCreate/>}/>
        <Route path='*' element={
              <main>
                <p>No se encontro la ruta buscada</p>
              </main>
            } />
        </Routes>
      </div>
  );
}

export default App;
