import React from "react";

interface Props {
  subject: string;
  time: string;
}

const UpcomingClassCard: React.FC<Props> = ({ subject, time }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="font-bold">{subject}</h3>
      <p>Time: {time}</p>
    </div>
  );
};

export default UpcomingClassCard;
