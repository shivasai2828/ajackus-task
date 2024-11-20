import React, { useState, useEffect } from "react";
import "./Model.css";

const Modal = ({ mode, user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: user?.id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "create" ? "Add User" : "Edit User"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="ID"
            required
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          {/* new user */}
          <input
            type="Email"
            name="Email"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="Department"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Department"
            required
          />
          <button type="submit">{mode === "create" ? "Add" : "Update"}</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
