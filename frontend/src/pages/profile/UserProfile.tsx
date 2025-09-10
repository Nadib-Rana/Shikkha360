import React from "react";

const UserProfile: React.FC = () => {
  // TODO: fetch user data from Redux or API
  const dummyUser = {
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    class: "10-A",
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Name:</strong> {dummyUser.name}</p>
      <p><strong>Email:</strong> {dummyUser.email}</p>
      <p><strong>Role:</strong> {dummyUser.role}</p>
      <p><strong>Class:</strong> {dummyUser.class}</p>
    </div>
  );
};

export default UserProfile;
