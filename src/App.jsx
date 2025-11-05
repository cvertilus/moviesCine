import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashword from "./components/page/Dashword"
import UpComing from './components/page/UpComing';
import TopRated from './components/page/TopRated';
import Popular from './components/page/Popular';
import MovieRepresentation  from './components/page/movieRepresentation';
import Discovery from './components/page/Discovery';
import SearchComponent from './components/page/SearchComponent';
import NavBar from './components/navBar';
import VerPelicula from './components/VerPelicula';
import Footer from './components/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
       <NavBar />
        <Routes>
          <Route path="/" element={<Dashword />}/>
          <Route path="/dashword" element={<Dashword />}/>
          <Route path='/upcoming' element={<UpComing />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/TopRated' element={<TopRated />} />
          <Route path='/discovery' element={<Discovery />} />
          <Route path='/movieDetail/:id' element={<MovieRepresentation />} />
          <Route path="/result" element={<SearchComponent />}/>
          <Route path="verPelicula/:id" element={<VerPelicula/>}/>
          <Route path="*" element={<Dashword/>}/>
        </Routes>
        <Footer/>
       </Router>
     

     
    </>
  )
}

export default App
