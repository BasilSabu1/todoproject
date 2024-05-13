
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { isAuthTokenContext } from './Contexts/ContextShare';
import Todo from './components/Todo';

function App() {
  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
  return (
    <div>

    <Routes>
      <Route path='/' element={<Home/>} />

      <Route path='/login' element={<Auth/>} />

      <Route path='/register' element={<Auth register/>} />

      <Route path='/dashboard' element={isAuthToken?<Dashboard  />:<Home/>} />

      <Route path='/project' element={<Project/>} />
      
      <Route path='/todo' element={<Todo/>}/>
    </Routes>

    <Footer/>

    </div>
  );
}

export default App;