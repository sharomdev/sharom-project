import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Select() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/select")
      .then(res => setData(res.data))
      .catch(() => alert("Select failed"));
  }, []);

  return (
    <div className="p-4 shadow rounded-2xl mt-6">
      <h2 className="text-xl font-bold mb-3">SELECT DATA</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Names</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.names}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
