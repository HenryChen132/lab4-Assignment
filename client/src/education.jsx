// client/src/education.jsx
import React, { useEffect, useState } from "react";
import "./controlled.css";
import { useAuth } from "./AuthContext";
import apiBase from "./apiBase";

export default function Education() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  // 加载所有 qualification
  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const res = await fetch(`${apiBase}/qualifications`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (err) {
        console.error("Fetch qualifications failed:", err);
      }
    };
    fetchQualifications();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      email: item.email || "",
      completion: item.completion ? item.completion.substring(0, 10) : "",
      description: item.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      const res = await fetch(`${apiBase}/qualifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== id));
      }
    } catch (err) {
      console.error("Delete qualification failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    setStatus("");
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${apiBase}/qualifications/${editingId}`
      : `${apiBase}/qualifications`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus(data.message || "Save failed");
        return;
      }

      if (editingId) {
        setItems((prev) => prev.map((i) => (i._id === editingId ? data : i)));
        setStatus("Record updated.");
      } else {
        setItems((prev) => [...prev, data]);
        setStatus("Record created.");
      }

      setEditingId(null);
      setFormData({
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        completion: "",
        description: "",
      });
    } catch (err) {
      console.error("Save qualification failed:", err);
      setStatus("Error saving record.");
    }
  };

  return (
    <div className="home">
      <div className="overlay-box">
        <h1>Education / Qualifications</h1>
        <hr />

        {items.length === 0 && <p>No qualifications yet.</p>}

        {items.map((q) => (
          <div
            key={q._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                color: "white",
                backgroundColor: "black",
                border: "1px solid black",
                borderRadius: "10px",
              }}
            >
              {q.title}
            </h2>
            <p>
              {q.firstname} {q.lastname} ({q.email})
            </p>
            {q.completion && (
              <p>
                Completion: {new Date(q.completion).toLocaleDateString()}
              </p>
            )}
            <p>{q.description}</p>

            {isAdmin && (
              <div style={{ marginTop: "8px" }}>
                <button onClick={() => handleEdit(q)}>Edit</button>{" "}
                <button onClick={() => handleDelete(q._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}

        {isAdmin && (
          <>
            <hr />
            <h2>Manage Qualifications (Admin)</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Program Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <input
                type="date"
                name="completion"
                value={formData.completion}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <button type="submit">
                {editingId ? "Update" : "Create"}
              </button>
            </form>
            {status && <p style={{ marginTop: "10px" }}>{status}</p>}
          </>
        )}
      </div>
      <footer style={{ textAlign: "center", color: "lightblue" }}>
        Copyright © 2025 Haoxuan Chen
      </footer>
    </div>
  );
}
