import { useState } from "react";
import type { Patient } from "../types";

interface PatientFormProps {
  onSubmit: (patient: Patient) => Promise<void>;
}

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const [patient, setPatient] = useState<Patient>({
    name: "",
    age: 0,
    gender: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(patient);
    setPatient({
      name: "",
      age: 0,
      gender: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
    
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={patient.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

 
      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          name="age"
          value={patient.age}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

 
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

 
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={patient.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

       
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={patient.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

 
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={patient.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
        />
      </div>

 
      <button
        type="submit"
        className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
      >
        Register Patient
      </button>
    </form>
  );
}
