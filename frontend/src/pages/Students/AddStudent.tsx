import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormDatePicker from '../../components/forms/FormDatePicker';

const classOptions = [
  { label: 'Class 1', value: '1' },
  { label: 'Class 2', value: '2' },
  { label: 'Class 3', value: '3' },
  { label: 'Class 4', value: '4' },
  { label: 'Class 5', value: '5' }
];

const AddStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !selectedClass || !dob) {
      setError('All fields are required');
      return;
    }

    // Mock submission
    console.log('Student added:', { name, email, selectedClass, dob });
    setError('');
    alert('Student added successfully!');
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Full Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            required
            error={!name && error ? error : ''}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter student email"
            required
            error={!email && error ? error : ''}
          />

          <FormSelect
            label="Class"
            name="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={classOptions}
            required
            error={!selectedClass && error ? error : ''}
          />

          <FormDatePicker
            label="Date of Birth"
            selectedDate={dob}
            onChange={setDob}
            required
            placeholder="dd/mm/yyyy"
          />

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Student
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddStudent;