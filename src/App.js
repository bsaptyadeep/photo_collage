import './App.css';
import Home from './components/Home/home';
import Temp1 from './components/temp1/temp1';
import Temp2 from './components/temp2/temp2';
import Temp5 from './components/temp5/temp5'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/temp1" element={<Temp1 />} />
          <Route exact path="/temp2" element={<Temp2 />} />
          <Route exact path="/temp5" element={<Temp5 />} />
          <Route exact path="/photo_collage" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
