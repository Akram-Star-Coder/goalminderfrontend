import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes,  Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';


function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
