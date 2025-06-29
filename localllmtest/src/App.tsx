import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WebLLMPage } from './pages/WebLLMPage';
import { PicoLLMPage } from './pages/PicoLLMPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/webllm" element={<WebLLMPage />} />
          <Route path="/picollm" element={<PicoLLMPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
