import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({ names: "", email: "", location: "" });
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // INSERT
  const insertData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/insert", form);
      alert(res.data.message);
      setForm({ names: "", email: "", location: "" });
    } catch (err) {
      alert("Insert failed");
    }
  };

  // UPDATE
  const updateData = async () => {
    if (!updateId) return alert("Enter ID to update");
    try {
      const res = await axios.put(`http://localhost:3000/update/${updateId}`, form);
      alert("Updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  // DELETE
  const deleteData = async () => {
    if (!deleteId) return alert("Enter ID to delete");
    try {
      const res = await axios.delete(`http://localhost:3000/delete/${deleteId}`);
      alert("Deleted successfully");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Pacific Frontend (React CRUD)</h1>

      {/* FORM */}
      <div className="space-y-3 p-4 rounded-2xl shadow">
        <input
          type="text"
          name="names"
          placeholder="Names"
          value={form.names}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 rounded border"
        />

        <button onClick={insertData} className="px-4 py-2 rounded bg-blue-500 text-white">
          INSERT
        </button>
      </div>

      {/* UPDATE */}
      <div className="space-y-3 p-4 rounded-2xl shadow">
        <input
          type="number"
          placeholder="ID to Update"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
          className="w-full p-2 rounded border"
        />
        <button onClick={updateData} className="px-4 py-2 rounded bg-green-600 text-white">
          UPDATE
        </button>
      </div>

      {/* DELETE */}
      <div className="space-y-3 p-4 rounded-2xl shadow">
        <input
          type="number"
          placeholder="ID to Delete"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          className="w-full p-2 rounded border"
        />
        <button onClick={deleteData} className="px-4 py-2 rounded bg-red-600 text-white">
          DELETE
        </button>
      </div>
    </div>
  );
}


// SELECT
import { useEffect, useState } from "react";

function SelectData() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/select");
      setData(res.data);
    } catch (err) {
      alert("Select failed");
    }
  };

  useEffect(() => {
    fetchData();
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
