 
import Navbar from '../components/Navbar';
import Slide from '../components/Slide';
import WatchCards from '../components/WatchCards';  

export default function Home({logout}) {  
  return (  
        <> 
          <Navbar logout={logout} />
          <Slide />
          <WatchCards /> 
        </>  

  )
};
