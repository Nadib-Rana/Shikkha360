import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';

const classOptions = [
  { label: 'Class 1', value: '1' },
  { label: 'Class 2', value: '2' },
  { label: 'Class 3', value: '3' },
  { label: 'Class 4', value: '4' },
  { label: 'Class 5', value: '5' }
];

// Mock subject data (can be fetched from backend)
const initialSubject = {
  name: 'Mathematics',
  code: 'MATH101',
  class: '3'
};

const EditSubject = () => {
  const [name, setName] = useState(initialSubject.name);
  const [code, setCode] = useState(initialSubject.code);
  const [selectedClass, setSelectedClass] = useState(initialSubject.class);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !code || !selectedClass) {
      setError('All fields are required');
      return;
    }

    // Mock update logic
    console.log('Subject updated:', { name, code, selectedClass });
    alert('Subject updated successfully!');
    setError('');
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Subject Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subject name"
            required
            error={!name && error ? error : ''}
          />

          <FormInput
            label="Subject Code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter subject code"
            required
            error={!code && error ? error : ''}
          />

          <FormSelect
            label="Assigned Class"
            name="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={classOptions}
            required
            error={!selectedClass && error ? error : ''}
          />

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Update Subject
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditSubject;