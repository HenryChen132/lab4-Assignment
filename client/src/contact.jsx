// client/src/contact.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./controlled.css";
import { useAuth } from "./AuthContext";
import apiBase from "./apiBase";

export default function Contact() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState("");

  // Admin：加载所有 contact 记录
  useEffect(() => {
    const fetchContacts = async () => {
      if (!isAdmin) return;
      try {
        const res = await fetch(`${apiBase}/contacts`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setContacts(data);
        }
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    fetchContacts();
  }, [isAdmin]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      message: formData.message,
    };

    try {
      const res = await fetch(`${apiBase}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatus("Failed to send message.");
        return;
      }

      setStatus("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        message: "",
      });

      // Admin 当前页也刷新列表
      if (isAdmin) {
        const data = await fetch(`${apiBase}/contacts`, {
          credentials: "include",
        }).then((r) => r.json());
        setContacts(data);
      }

      navigate("/"); // 老师如果希望留在本页，把这行删掉即可
    } catch (err) {
      console.error("Submit contact failed:", err);
      setStatus("Error sending message.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      const res = await fetch(`${apiBase}/contacts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="home">
      <div className="overlay-box">
        <div className="contact-panel">
          <h2
            style={{
              color: "white",
              backgroundColor: "black",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            Contact Information
          </h2>
          <p>
            <strong>Email:</strong> haoxuanchen@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (647) 123-4567
          </p>
          <p>
            <strong>Location:</strong> Toronto, ON, Canada
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/haoxuan-chen-217353383/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/haoxuan-chen-217353383
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/HenryChen132"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/HenryChen132
            </a>
          </p>
        </div>

        <hr />

        <h2
          style={{
            color: "white",
            backgroundColor: "black",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          Information Box
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input
            type="text"
            name="contactNumber"
            placeholder="Phone Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <div>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  firstName: "",
                  lastName: "",
                  contactNumber: "",
                  email: "",
                  message: "",
                })
              }
            >
              Reset
            </button>
            <button type="submit">Send</button>
          </div>
        </form>

        {status && <p style={{ marginTop: "10px" }}>{status}</p>}

        {isAdmin && (
          <>
            <hr />
            <h3>Contact Messages (Admin)</h3>
            {contacts.length === 0 && <p>No contact messages yet.</p>}
            {contacts.map((c) => (
              <div
                key={c._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              >
                <p>
                  <b>
                    {c.firstname} {c.lastname}
                  </b>{" "}
                  ({c.email})
                </p>
                {c.contactNumber && <p>Phone: {c.contactNumber}</p>}
                {c.message && <p>Message: {c.message}</p>}
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </div>
            ))}
          </>
        )}
      </div>
      <footer style={{ textAlign: "center", color: "lightblue" }}>
        Copyright © 2025 Haoxuan Chen
      </footer>
    </div>
  );
}
