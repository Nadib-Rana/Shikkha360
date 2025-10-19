import React from 'react';

interface Props {
  search: string;
  roleFilter: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

const FilterControls: React.FC<Props> = ({ search, roleFilter, onSearchChange, onRoleChange }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    <input
      type="text"
      placeholder="Search by name or email"
      value={search}
      onChange={e => onSearchChange(e.target.value)}
      className="p-2 border rounded w-full md:w-1/2"
    />
    <select
      value={roleFilter}
      onChange={e => onRoleChange(e.target.value)}
      className="p-2 border rounded w-full md:w-1/4"
    >
      <option value="">All Roles</option>
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
      <option value="parent">Parent</option>
      <option value="admin">Admin</option>
    </select>
  </div>
);

export default FilterControls;