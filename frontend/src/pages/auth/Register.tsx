import React, { useState } from "react";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registrationId: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    className: "",
    section: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    parentName: "",
    parentContact: "",
    profileImage: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, profileImage: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "address") {
        studentData.append("address", JSON.stringify(value));
      } else if (key === "profileImage" && value) {
        studentData.append("profileImage", value);
      } else {
        studentData.append(key, String(value));
      }
    });
    console.log("Student signup data:", formData);
    // Send `studentData` to your backend API (POST /api/students/register)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl grid grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="col-span-2 text-2xl font-bold text-center mb-4">
          Student Registration
        </h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="registrationId"
          placeholder="Registration ID"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="className"
          placeholder="Class"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        {/* Address Section */}
        <input
          type="text"
          name="address.street"
          placeholder="Street Address"
          className="border p-2 rounded col-span-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.city"
          placeholder="City"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.state"
          placeholder="State"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.postalCode"
          placeholder="Postal Code"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.country"
          placeholder="Country"
          className="border p-2 rounded col-span-2"
          onChange={handleChange}
          required
        />

        {/* Parent Info */}
        <input
          type="text"
          name="parentName"
          placeholder="Parent Name"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="parentContact"
          placeholder="Parent Contact"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        {/* Profile Image */}
        <input
          type="file"
          name="profileImage"
          className="border p-2 rounded col-span-2"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
