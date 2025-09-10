import { useState } from "react";

const ApplicationForm = () => {


  const [formData , setFormData] = useState (
  {
    fName : "",
    lName : "",
    dName : "",
    age : Number ,
  }
);

const formhandelar = (property: keyof typeof formData , value : any ) =>{
  setFormData(prevData =>(
    {
      ...prevData,
      [property] : value
    }
  ))
  
}



//   const [formObj, setForm] = useState({
//     fName: "",
//     lName: "",
//     roll: "",
//     gender: ""
//   });

//  const inputChange = (property: keyof typeof formObj, value: string) => {
//   setForm(prevObj => ({
//     ...prevObj,
//     [property]: value
//   }));
// };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formObj);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border-[2px] border-gray-300 rounded-md shadow-md">
//       <h1 className="text-center text-2xl font-semibold mb-6">Application Form</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           className="w-full px-4 py-2 border-[1px] border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="text"
//           placeholder="First Name"
//           value={formObj.fName}
//           onChange={(e) => inputChange("fName", e.target.value)}
//         />
//         <input
//           className="w-full px-4 py-2 border-[1px] border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="text"
//           placeholder="Last Name"
//           value={formObj.lName}
//           onChange={(e) => inputChange("lName", e.target.value)}
//         />

//         <select
//           className="w-full px-4 py-2 border-[1px] border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={formObj.roll}
//           onChange={(e) => inputChange("roll", e.target.value)}
//         >
//           <option value="">Your Roll</option>
//           <option value="Student">Student</option>
//           <option value="Teacher">Teacher</option>
//         </select>

//         <div className="flex items-center space-x-4">
//           <label>
//             <input
//               type="radio"
//               name="gender"
//               value="Male"
//               checked={formObj.gender === "Male"}
//               onChange={(e) => inputChange("gender", e.target.value)}
//             />
//             <span className="ml-1">Male</span>
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="gender"
//               value="Female"
//               checked={formObj.gender === "Female"}
//               onChange={(e) => inputChange("gender", e.target.value)}
//             />
//             <span className="ml-1">Female</span>
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
};

export default ApplicationForm;