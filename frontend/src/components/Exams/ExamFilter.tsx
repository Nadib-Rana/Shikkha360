import React from "react";

interface Option {
  value: string;
  label: string;
}

interface ExamFilterProps {
  filterClass: string;
  filterSubject: string;
  filterType: string;
  classOptions: Option[];
  subjectOptions: Option[];
  typeOptions: Option[];
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

const ExamFilter: React.FC<ExamFilterProps> = ({
  filterClass,
  filterSubject,
  filterType,
  classOptions,
  subjectOptions,
  typeOptions,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      {/* Class Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Class</label>
        <select
          value={filterClass}
          onChange={(e) => onFilterChange("filterClass", e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">All Classes</option>
          {classOptions.map((cls) => (
            <option key={cls.value} value={cls.value}>
              {cls.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Subject</label>
        <select
          value={filterSubject}
          onChange={(e) => onFilterChange("filterSubject", e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">All Subjects</option>
          {subjectOptions.map((subj) => (
            <option key={subj.value} value={subj.value}>
              {subj.label}
            </option>
          ))}
        </select>
      </div>

      {/* Type Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Type</label>
        <select
          value={filterType}
          onChange={(e) => onFilterChange("filterType", e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">All Types</option>
          {typeOptions.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded h-fit"
      >
        Reset
      </button>
    </div>
  );
};

export default ExamFilter;