import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Student from "./pages/Students/Student";
import Register from "./pages/Auth/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/auth/reg" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
