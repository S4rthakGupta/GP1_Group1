import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing custom components used in the application
import Navbar from './components/Navbar';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeCreate from './components/EmployeeCreate';

// This below is our main app component.
const App = () => {
  return (
    <Router>
      <Navbar />

      {/* Routes component defines different routes and associates them with specific components */}
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="/create" element={<EmployeeCreate />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
};

// Exporting the App component to be rendered by the React application
export default App;