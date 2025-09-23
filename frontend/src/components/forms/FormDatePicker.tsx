import React from 'react';
import DatePicker from 'react-datepicker';

interface FormDatePickerProps {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  required?: boolean;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label = 'Select Date',
  selectedDate,
  onChange,
  placeholder = 'dd/mm/yyyy',
  required = false
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormDatePicker;