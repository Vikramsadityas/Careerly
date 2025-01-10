import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  ChevronDown, X } from "lucide-react";
import WalletComponent from "./Wallet/Wallet";

// Decorative gradient orb component for background effects
const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} />
);

// Reusable modal component with animations
const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 border border-white/20 rounded-xl p-6 w-full max-w-md relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);



// Role selection modal with dynamic form fields based on selected role
const RoleModal = ({ isOpen, onClose, role }) => {
  const [formData, setFormData] = useState({
    expertise: "",
    yearsOfExperience: "",
    companyName: "",
    website: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={role === "mentor" ? "Become a Mentor" : "Register as Employer"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {role === "mentor" ? (
          <>
            <div>
              <label className="block text-sm text-white/60 mb-1">Expertise</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Years of Experience</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm text-white/60 mb-1">Company Name</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Website</label>
              <input
                type="url"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition-colors"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

const UserProfile = () => {
  // State management for profile data and UI controls
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const dummyData = {
      id: "APP12345",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1 234 567 890",
      address: "1234 Elm Street, Springfield, USA",
      skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
      education: "B.Sc. in Computer Science, XYZ University",
      experience: "2 years as a Frontend Developer at ABC Corp",
    };

    setTimeout(() => {
      setProfile(dummyData);
      setLoading(false);
    }, 500);

    // Backend Integration
    
  //   fetch("http://localhost:8080/applicants/profile")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch profile data.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setProfile(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
    
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
    setShowRoleModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    skills,
    education,
    experience,
  } = profile;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden p-4 md:p-8">
      {/* Background gradient orbs */}
      <GradientOrb className="w-96 h-96 bg-purple-500 left-0 top-0" />
      <GradientOrb className="w-96 h-96 bg-blue-500 right-0 bottom-0" />
      <GradientOrb className="w-64 h-64 bg-pink-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-6xl">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-3xl p-4 md:p-6 shadow-2xl border border-white/20">
          {/* Header with Role Dropdown and Wallet - Moved to top right */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Applicant Profile
            </h1>
            
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors w-full md:w-auto"
                >
                  <span>Select Role</span>
                  <ChevronDown size={16} />
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg overflow-hidden z-10"
                    >
                      <button
                        onClick={() => handleRoleSelect("mentor")}
                        className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors"
                      >
                        Become a Mentor
                      </button>
                      <button
                        onClick={() => handleRoleSelect("employer")}
                        className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors"
                      >
                        Register as Employer
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <WalletComponent/>
            </div>
          </div>

          {/* Profile content - Made responsive */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
              <div className="mb-6">
                <p className="text-gray-400 text-sm">ID: {id}</p>
              </div>
              
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="font-medium text-white/80">Name:</span>{" "}
                  {firstName} {lastName}
                </p>
                <p>
                  <span className="font-medium text-white/80">Email:</span>{" "}
                  {email}
                </p>
                <p>
                  <span className="font-medium text-white/80">Phone:</span>{" "}
                  {phoneNumber}
                </p>
                <p>
                  <span className="font-medium text-white/80">Address:</span>{" "}
                  {address}
                </p>
              </div>
            </div>

            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:px-6">
              <h2 className="text-xl font-semibold mb-4 text-white/90">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 md:pl-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-white/90">Education</h2>
                <p className="text-gray-300">{education}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-white/90">Experience</h2>
                <p className="text-gray-300">{experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RoleModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        role={selectedRole}
      />
    </div>
  )
};

export default UserProfile;