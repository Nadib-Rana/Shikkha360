import React, { useEffect, useState } from "react";
import axios from "axios";
import ExamCard from "./ExamCard";
import ExamDetails from "./ExamDetails";
import ExamForm from "./ExamForm";

interface ExamListProps {
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

const ExamList: React.FC<ExamListProps> = ({
  canCreate = false,
  canEdit = false,
  canDelete = false,
}) => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [examToEdit, setExamToEdit] = useState<any>(null);

  // Filters
  const [filterClass, setFilterClass] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterType, setFilterType] = useState("");

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/exams`);
      setExams(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Apply filters
  const filteredExams = exams.filter((exam) => {
    return (
      (!filterClass || exam.classId?.gradeLevel === filterClass) &&
      (!filterSubject || exam.subjectId?.name === filterSubject) &&
      (!filterType || exam.type === filterType)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Exam List ({filteredExams.length})
        </h2>
        {canCreate && (
          <button
            onClick={() => {
              setExamToEdit(null);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Exam
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          placeholder="Filter by Class"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Filter by Subject"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="midterm">Midterm</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="final">Final</option>
          <option value="quiz">Quiz</option>
        </select>
        <button
          onClick={() => {
            setFilterClass("");
            setFilterSubject("");
            setFilterType("");
          }}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>

      {/* Exam Cards */}
      {loading ? (
        <div>Loading exams...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredExams.map((exam) => (
            <ExamCard
              key={exam._id}
              exam={exam}
              canEdit={canEdit}
              canDelete={canDelete}
              onView={() => setSelectedExam(exam)}
              onEdit={(exam) => {
                setExamToEdit(exam);
                setShowForm(true);
              }}
              onDeleted={fetchExams}
            />
          ))}
        </div>
      )}

      {/* Exam Details */}
      {selectedExam && (
        <ExamDetails
          examId={selectedExam._id}
          onClose={() => setSelectedExam(null)}
        />
      )}

      {/* Exam Form */}
      {showForm && (
        <ExamForm
          examToEdit={examToEdit}
          onClose={() => setShowForm(false)}
          onSuccess={fetchExams}
        />
      )}
    </div>
  );
};

export default ExamList;
