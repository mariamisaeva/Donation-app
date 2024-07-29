import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import './App.css';
import { PageProvider } from './components/PageContext';
import Status from './components/Status';

const App = () => {
  return (
    <Router>
      <PageProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/payment/status" element={<Status />} />
        </Routes>
      </PageProvider>
    </Router>
  );
};

export default App;




