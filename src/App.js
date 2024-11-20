import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import UserList from "./components/UserList/UserList";
import Modal from "./components/Modal/Model";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer.js/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); // User list

  const toggleModal = (mode, user = null) => {
    setModalMode(mode);
    setCurrentUser(user);
    setModalOpen(!modalOpen);
  };

  const handleSaveUser = (user) => {
    if (modalMode === "create") {
      setUsers([...users, { ...user, id: users.length + 1 }]); // Add new user
    } else if (modalMode === "edit") {
      setUsers(users.map((u) => (u.id === user.id ? user : u))); // Update existing user
    }
    setModalOpen(false); // Close modal
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <UserList
                users={users}
                onEdit={(user) => toggleModal("edit", user)}
                onCreate={() => toggleModal("create")}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {modalOpen && (
        <Modal
          mode={modalMode}
          user={currentUser}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
