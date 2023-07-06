import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactPage from './components/ContactPage';
import ChartsPage from './components/ChartsPage';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <nav className="w-64 bg-gray-200">
          <ul className="p-4 space-y-2">
            <li>
              <Link to="/" className="block font-bold"><button className='mt-4 mb-4 bg-gray-800 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-md'>ContactPage</button></Link>
            </li>
            <li>
              <Link to="/charts" className="block font-bold"><button className='mt-4 mb-4 bg-gray-800 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-md'>ChartsPage</button></Link>
            </li>
          </ul>
        </nav>
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<ContactPage />} />
            <Route path="/charts" element={<ChartsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
