import React from "react";

interface Props {
  studentName: string;
  attendance: number;
}

const AttendanceCard: React.FC<Props> = ({ studentName, attendance }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="font-bold text-lg">{studentName}</h3>
      <p>Attendance: {attendance}%</p>
    </div>
  );
};

export default AttendanceCard;
