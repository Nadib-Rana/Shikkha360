import React, { useEffect, useState } from "react";
import axios from "axios";
import ExamCard from "./ExamCard";
import ExamDetails from "./ExamDetails";
import ExamForm from "./ExamForm";
import ExamFilter from "./ExamFilter";

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

  const token = localStorage.getItem("authToken");

  const fetchExams = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get<any[]>(
        `${import.meta.env.VITE_API_URL}/exams`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExams(res.data || []);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "filterClass") setFilterClass(value);
    if (key === "filterSubject") setFilterSubject(value);
    if (key === "filterType") setFilterType(value);
  };

  const handleResetFilters = () => {
    setFilterClass("");
    setFilterSubject("");
    setFilterType("");
  };

  // ✅ Filtering logic
  const filteredExams = exams.filter((exam) => {
    const classLabel = `${exam.classId?.gradeLevel}${exam.classId?.section ? `-${exam.classId.section}` : ""}`;
    const subjectLabel = `${exam.subjectId?.name}${exam.subjectId?.code ? ` (${exam.subjectId.code})` : ""}`;
    const typeLabel = exam.type;

    const classMatch = !filterClass || classLabel === filterClass;
    const subjectMatch = !filterSubject || subjectLabel === filterSubject;
    const typeMatch = !filterType || typeLabel === filterType;

    return classMatch && subjectMatch && typeMatch;
  });

  // ✅ Extract dropdown options
  const classOptions = [
    ...new Map(
      exams.map((e) => [
        e.classId._id,
        {
          value: `${e.classId.gradeLevel}${e.classId.section ? `-${e.classId.section}` : ""}`,
          label: `${e.classId.gradeLevel}${e.classId.section ? ` (${e.classId.section})` : ""}`,
        },
      ])
    ).values(),
  ];

  const subjectOptions = [
    ...new Map(
      exams.map((e) => [
        e.subjectId._id,
        {
          value: `${e.subjectId.name}${e.subjectId.code ? ` (${e.subjectId.code})` : ""}`,
          label: `${e.subjectId.name}${e.subjectId.code ? ` (${e.subjectId.code})` : ""}`,
        },
      ])
    ).values(),
  ];

  const typeOptions = Array.from(new Set(exams.map((e) => e.type))).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Exam List ({filteredExams.length})
        </h2>
        {canCreate && (
          <button
            onClick={() => {
              setExamToEdit(null);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Exam
          </button>
        )}
      </div>

      {/* Filters */}
      <ExamFilter
        filterClass={filterClass}
        filterSubject={filterSubject}
        filterType={filterType}
        classOptions={classOptions}
        subjectOptions={subjectOptions}
        typeOptions={typeOptions}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Exam Cards */}
      {loading ? (
        <div className="text-gray-500 mt-4">Loading exams...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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

      {/* Exam Details Modal */}
      {selectedExam && (
        <ExamDetails
          examId={selectedExam._id}
          onClose={() => setSelectedExam(null)}
        />
      )}

      {/* Exam Form Modal */}
      {showForm && (
        <ExamForm
          {...({
            examToEdit,
            onClose: () => setShowForm(false),
            onSuccess: fetchExams,
            classOptions,
            subjectOptions,
          } as any)}
        />
      )}
    </div>
  );
};

export default ExamList;