import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import Home from './pages/Home';
import Agents from './pages/Agents';
import Navbar from './components/Navbar';
import theme from './theme';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          background: 'linear-gradient(135deg, #181a20 0%, #23263a 100%)',
          minHeight: '100vh',
        },
        '.glow': {
          textShadow: '0 0 8px #2196f3, 0 0 16px #9c27b0',
        },
      }} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agents />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 