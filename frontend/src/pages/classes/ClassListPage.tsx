import React from "react";

const ClassListPage: React.FC = () => {
  const dummyClasses = [
    { subject: "Math", teacher: "Mr. A", time: "09:00 AM" },
    { subject: "Science", teacher: "Mrs. B", time: "10:30 AM" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Teacher</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {dummyClasses.map((c, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{c.subject}</td>
              <td className="border px-4 py-2">{c.teacher}</td>
              <td className="border px-4 py-2">{c.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassListPage;
