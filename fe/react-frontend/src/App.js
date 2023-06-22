import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListVeBanComponent from './components/ListVeBanComponent';
import SanBayComponent from './components/SanBayComponent';
import AddVeComponent from './components/AddVeComponent';
import Nav from './components/Nav';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/' element={<Nav />} />  
          <Route path='/veban' element={<ListVeBanComponent />} />
          <Route path='/sanbay' element={<SanBayComponent />} />
          <Route path='/themve' element={<AddVeComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

