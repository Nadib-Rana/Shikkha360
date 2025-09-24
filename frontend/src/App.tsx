
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Auth/Login';

// Placeholder components for other routes (replace with actual components)
const Dashboard = () => <div>Dashboard Page</div>;
const Students = () => <div>Students Page</div>;
const Teachers = () => <div>Teachers Page</div>;
const Settings = () => <div>Settings Page</div>;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that use the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<Dashboard />} /> {/* Default route */}
        </Route>
        {/* Login route without Layout */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
