import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import FormSelect from '../../components/forms/FormSelect';

const classOptions = [
  { label: 'Class 1', value: '1' },
  { label: 'Class 2', value: '2' },
  { label: 'Class 3', value: '3' },
  { label: 'Class 4', value: '4' },
  { label: 'Class 5', value: '5' }
];

const subjectOptions = [
  { label: 'Mathematics', value: 'math' },
  { label: 'English', value: 'english' },
  { label: 'Science', value: 'science' },
  { label: 'Bangla', value: 'bangla' },
  { label: 'ICT', value: 'ict' }
];

const AssignSubjects = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubjectToggle = (value: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClass || selectedSubjects.length === 0) {
      setError('ক্লাস এবং অন্তত একটি বিষয় নির্বাচন করুন');
      return;
    }

    // Mock submission
    console.log('Assigned subjects:', { selectedClass, selectedSubjects });
    alert('Subjects assigned successfully!');
    setError('');
  };

  return (

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Assign Subjects to Class</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormSelect
            label="Select Class"
            name="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={classOptions}
            required
            error={!selectedClass && error ? error : ''}
          />

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Select Subjects <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {subjectOptions.map((subject) => (
                <label key={subject.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={subject.value}
                    checked={selectedSubjects.includes(subject.value)}
                    onChange={() => handleSubjectToggle(subject.value)}
                    className="accent-blue-600"
                  />
                  {subject.label}
                </label>
              ))}
            </div>
            {selectedSubjects.length === 0 && error && (
              <div className="text-sm text-red-500 mt-1">{error}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Assign Subjects
          </button>
        </form>
      </div>
    
  );
};

export default AssignSubjects;