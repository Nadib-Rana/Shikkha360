import React from "react";

interface ExamFilterProps {
  filterClass: string;
  filterSubject: string;
  filterType: string;
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

const ExamFilter: React.FC<ExamFilterProps> = ({
  filterClass,
  filterSubject,
  filterType,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="flex gap-3 mb-4 flex-wrap">
      <input
        placeholder="Filter by Class"
        value={filterClass}
        onChange={(e) => onFilterChange("filterClass", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Filter by Subject"
        value={filterSubject}
        onChange={(e) => onFilterChange("filterSubject", e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={filterType}
        onChange={(e) => onFilterChange("filterType", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Types</option>
        <option value="midterm">Midterm</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="final">Final</option>
        <option value="quiz">Quiz</option>
      </select>
      <button onClick={onReset} className="bg-gray-300 px-3 py-1 rounded">
        Reset
      </button>
    </div>
  );
};

export default ExamFilter;
