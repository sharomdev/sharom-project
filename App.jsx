import React, { useState, useEffect } from "react";
import axios from "axios";
import './app.css';

function Navbar() {
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="p-4 bg-black text-white flex justify-center gap-6 rounded-2xl mb-8 shadow-lg">
      <button onClick={() => handleNavClick("insert")} className="px-4 py-2 rounded hover:bg-white hover:text-black transition">Insert</button>
      <button onClick={() => handleNavClick("update")} className="px-4 py-2 rounded hover:bg-white hover:text-black transition">Update</button>
      <button onClick={() => handleNavClick("delete")} className="px-4 py-2 rounded hover:bg-white hover:text-black transition">Delete</button>
      <button onClick={() => handleNavClick("select")} className="px-4 py-2 rounded hover:bg-white hover:text-black transition">Select</button>
    </nav>
  );
}

function SelectData() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/select");
      setData(res.data);
    } catch {
      alert("Select failed");
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="p-4 shadow-lg rounded-2xl mt-6 bg-white" id="select">
      <h2 className="text-2xl font-bold mb-4 text-black">SELECT DATA</h2>
      <table className="w-full border-collapse border border-black">
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
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border p-2 text-center">{item.id}</td>
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

export default function App() {
  const [form, setForm] = useState({ names: "", email: "", location: "" });
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const insertData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/insert", form);
      alert(res.data.message);
      setForm({ names: "", email: "", location: "" });
    } catch {
      alert("Insert failed");
    }
  };

  const updateData = async () => {
    if (!updateId) return alert("Enter ID to update");
    try {
      await axios.put(`http://localhost:3000/update/${updateId}`, form);
      alert("Updated successfully");
    } catch {
      alert("Update failed");
    }
  };

  const deleteData = async () => {
    if (!deleteId) return alert("Enter ID to delete");
    try {
      await axios.delete(`http://localhost:3000/delete/${deleteId}`);
      alert("Deleted successfully");
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 bg-black min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-black">SIMPLE APP</h1>

      <Navbar />

      {/* INSERT FORM */}
      <div className="space-y-4 p-6 rounded-2xl shadow-lg bg-gray" id="insert">
        <input type="text" name="names" placeholder="Names" value={form.names} onChange={handleChange} className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black" />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black" />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black" />
        <button onClick={insertData} className="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 transition">INSERT</button>
      </div>

      {/* UPDATE FORM */}
      <div className="space-y-4 p-6 rounded-2xl shadow-lg bg-white" id="update">
        <input type="number" placeholder="ID to Update" value={updateId} onChange={(e) => setUpdateId(e.target.value)} className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black" />
        <button onClick={updateData} className="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 transition">UPDATE</button>
      </div>

      {/* DELETE FORM */}
      <div className="space-y-4 p-6 rounded-2xl shadow-lg bg-white" id="delete">
        <input type="number" placeholder="ID to Delete" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black" />
        <button onClick={deleteData} className="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 transition">DELETE</button>
      </div>

      <SelectData />
    </div>
  );
}