import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import NavbarComponent from './components/NavbarComponent'
import ErrorPage from './components/ErrorPage'
import About from './components/About'


function App() {

  const [mode, setmode] = useState('light');
  const [bgColor, setbgColor] = useState('#E6E9EA')
  document.body.style.backgroundColor = bgColor;
  
  const toggleMode = () => {
    if(mode==='dark') {
      setmode('light');
      setbgColor('#E6E9EA');
    }
    else {
      setmode('dark');
      setbgColor('#000124');
    }
  }
  return (
    <>
      <NavbarComponent mode={mode} toggleMode={toggleMode}/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/*' element={<ErrorPage/>}/>
      </Routes>
    </>
  );
}

export default App;
