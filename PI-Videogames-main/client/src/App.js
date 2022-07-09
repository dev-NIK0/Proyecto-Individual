import './App.css';

import {BrowserRouter as Router , Route , Routes } from 'react-router-dom';

import LandingPage from './components/LadingPage';
import Home from './components/Home';
import DetailVideoGame from './components/DetailVideoGame';
import CreateVideoGame from './components/CreateVideoGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = '/' element = {<LandingPage/>}/>
        <Route exact path = '/home' element = {<Home/>}/>
        <Route path = '/home/:id' element = {<DetailVideoGame/>}/>
        <Route path = '/home/crear-juego' element = {<CreateVideoGame/>}/>
      </Routes>
    </Router>
  );
}

export default App;
// <div className="App"> 
//       <h1>Videogames</h1>
//     </div>