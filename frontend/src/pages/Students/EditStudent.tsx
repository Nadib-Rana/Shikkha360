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

// Mock student data (can be fetched from backend)
const initialStudent = {
  name: 'Ayesha Rahman',
  email: 'ayesha@student.com',
  class: '3',
  dob: new Date('2015-04-12')
};

const EditStudent = () => {
  const [name, setName] = useState(initialStudent.name);
  const [email, setEmail] = useState(initialStudent.email);
  const [selectedClass, setSelectedClass] = useState(initialStudent.class);
  const [dob, setDob] = useState<Date | null>(initialStudent.dob);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !selectedClass || !dob) {
      setError('সব তথ্য পূরণ করতে হবে');
      return;
    }

    // Mock update logic
    console.log('Student updated:', { name, email, selectedClass, dob });
    alert('Student updated successfully!');
    setError('');
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Student</h2>
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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Update Student
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditStudent;