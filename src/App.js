import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';
import Movies from './components/Form';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Watchlist from './components/Watchlist';
import { Outlet } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#1D2D44';
    } else {
      setMode('light');
      document.body.style.backgroundColor = '#ffffff';
    }
  }

  return (
    <>
     <BrowserRouter>
        <Navbar title="React-App" mode={mode} toggleMode={toggleMode} />
        <div className="container my-5">
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route path="/" element={<Movies heading="Enter text here" mode={mode} />} />
              <Route path="watchlist" element={<Watchlist mode={mode}/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
