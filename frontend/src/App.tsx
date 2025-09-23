import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';

const App = () => {
  return (
    <Login />
  );
};

export default App;