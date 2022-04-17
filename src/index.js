import React from 'react';
import ReactDOM from 'react-dom';
import Show from './screens/Show';
import Layout from './screens/Layout'
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path=":id" element={<Show />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);