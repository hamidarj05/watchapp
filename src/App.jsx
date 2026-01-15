import './App.css';
import Head from './components/Head';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Loading from './components/Loader'
import { useEffect, useState } from 'react';  
import Home from './Pages/Home';  
import WatchList from './Pages/WatcheListe';
import ShoppingCard from './Pages/ShoppingCard';
import Admin from './Pages/Admin';
import Login from './components/Login';
import useAuth from './Hook/useAuth';

export default function App() {
  const { isAUth, login, logout, isAdmin } = useAuth();
  const [isShow, setShow] = useState(false) 

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 3000);
  }, [])
  return ( 
    <Router>
      {isShow ? (
        isAUth ? ( 
          isAdmin ? <Admin /> : (
        <>
          <Head />
          <Home logout = {logout} />
          <Routes>
            <Route path="/watchListe" element={<WatchList />} />
            
            <Route path="/ShoppingCard" element={<ShoppingCard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </> )
        ) : (
          <Login login = {login} />
        )
      ) : (
        <Loading />
      )}
    </Router>

  )
};
