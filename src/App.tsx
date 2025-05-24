import { useState, useEffect } from "react";

import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import SqlQuery from "./components/SQLQuery"; 

import { number } from "./services/db";

import type { Patient } from "./types";

console.log(number);
import { PGliteWorker } from "@electric-sql/pglite/worker";


export default function App() {
   const [db, setDb] = useState<PGliteWorker | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const initDb = async () => {
      try {
         const worker = new Worker(
        new URL("./services/db.ts", import.meta.url),
        { type: "module" }
      );
      const db = new PGliteWorker(worker);
      console.log("db",db)
      await db.waitReady;
       setDb(db);
      
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize database");
        console.log(error)
      }
    };

    initDb();
      return () => {
      
    };
  }, []);

  console.log(db);
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    if (!db) return;
    try {
      const result = await db.query(`SELECT * FROM patients ORDER BY created_at DESC`) as any;
      console.log(result);
      setPatients(result.rows);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    }
  };

  const handleRegisterPatient = async (patient: Patient) => {
    if (!db) return;
    try {
      await db.query(
        "INSERT INTO patients (name, age, gender, email, phone, address) VALUES ($1, $2, $3, $4, $5, $6)",
        [patient.name, patient.age, patient.gender, patient.email, patient.phone, patient.address]
      );
      await fetchPatients();
    } catch (err) {
      console.error("Failed to register patient:", err);
    }
  };

  const handleExecuteQuery = async (query: string) => {
    if (!db) return;
    const result = await db.query(query);
    return result.rows;
  };

  useEffect(() => {
    if (db) {
      fetchPatients();
    }
  }, [db]);

  if (!db) {
    return <div className="p-4">Loading database...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-teal-600">Patient Registration</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <PatientForm onSubmit={handleRegisterPatient} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            
            <PatientList patients={patients}  onRefresh={fetchPatients} />
            
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <SqlQuery onExecute={handleExecuteQuery} />
        </div>
      </div>
    </div>
  );
}