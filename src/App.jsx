import './App.css';
import Head from './components/Head';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WatchList from './components/WatcheListe';
import ShoppingCard from './components/ShoppingCard';
import Navbar from './components/Navbar';
import Slide from './components/Slide'
import Loading from './components/Loader'
import { useEffect, useState } from 'react'; 

export default function App() {
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 3000);
  }, [])
  return ( 
    <Router>
      {isShow ? (
        <>
          <Head />
          <Navbar />
          <Slide />
          <ShoppingCard />
          <Routes>
            <Route path="/watchListe" element={<WatchList />} />
            <Route path="/ShoppingCard" element={<ShoppingCard />} />
          </Routes>
        </>
      ) : (
        <Loading />
      )}
    </Router>

  )
};
