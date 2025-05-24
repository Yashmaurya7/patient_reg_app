import { useState } from "react";

interface SqlQueryProps {
  onExecute: (query: string) => Promise<any>;
}

export default function SqlQuery({ onExecute }: SqlQueryProps) {
  const [query, setQuery] = useState("SELECT * FROM patients");
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async () => {
    try {
      const result = await onExecute(query);
      setResults(Array.isArray(result) ? result : [result]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setResults(null);
    }
  };

  return (
    <div className="space-y-4 border-b">
      <h2 className="text-4xl font-semibold text-teal-600">SQL Query</h2>
      <div className="flex space-x-2">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm p-2 border h-20"
        />
        <button
          onClick={handleExecute}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-green-700 h-20"
        >
          Execute
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Error: {error}
        </div>
      )}

      {results && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {results.length > 0 && Object.keys(results[0]).map((key) => (
                  <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((value, j) => (
                    <td key={j} className="px-6 py-4 whitespace-nowrap">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

