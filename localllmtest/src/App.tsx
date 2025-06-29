import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WebLLMPage } from './pages/WebLLMPage';
import { PicoLLMPage } from './pages/PicoLLMPage';
import { TransformersPage } from './pages/TransformersPage';

function App() {
  console.log('App.tsx')
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/webllm" element={<WebLLMPage />} />
          <Route path="/picollm" element={<PicoLLMPage />} />
          <Route path="/transformers" element={<TransformersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
