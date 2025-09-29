import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Student from "./pages/Students/Student";
import AdminProfile from "./profile/admin/AdminProfile";
import StudentList from "./pages/Students/StudentList";
import StudentProfile from "./pages/Students/StudentProfile";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/total-student" element={<StudentList />} />
        <Route path="/admin" element={<AdminProfile />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student-profile/:id" element={<StudentProfile />} />
        <Route path="/student-profile/:id" element={< />} />

          
      </Routes>
    </Router>
  );
}

export default App;
