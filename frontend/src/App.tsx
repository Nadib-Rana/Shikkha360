import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import ExamCard from "./components/Exams/ExamCard";
import ExamList from "./components/Exams/ExamList";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
