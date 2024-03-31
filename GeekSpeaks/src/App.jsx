// src/App.js
import React from 'react';
import { BrowserRouter as Router,  Routes ,Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import ArticlesPage from './pages/ArticlesPage';
import QuestionsPage from './pages/QuestionsPage';
import kitty from './assets/loadingkitty.png'

function App() {
  return (
    <Router>
      <div>
        <Navbar /><br /><br /><br />

        <div style={{padding:'20px 30px',borderRadius:'30px',backgroundColor:'lavender',position: 'absolute', top: '200px',left:'500px', zIndex:0}}>
          <img src={kitty} style={{width: '200px'}} alt="loading kitty" />
          <h2>Loading</h2>
        </div>
        <Routes>
          <Route path="/" exact element={<ArticlesPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

