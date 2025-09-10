import React from "react";

const SubmitAssignmentPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Submit Assignment</h1>
      <form className="flex flex-col gap-4">
        <input type="file" className="border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default SubmitAssignmentPage;
