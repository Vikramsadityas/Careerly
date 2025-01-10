import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Settings, Bell, Search, UserCog, X, Component } from "lucide-react";
import WalletComponent from "../Wallet/Wallet";

// Reusable Modal component
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

// Settings Modal Component
const SettingsModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Admin Settings">
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-white/60 mb-1">Notification Preferences</label>
        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white">
          <option value="all">All Notifications</option>
          <option value="important">Important Only</option>
          <option value="none">None</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-1">Email Reports</label>
        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition-colors">
        Save Settings
      </button>
    </div>
  </Modal>
);

const AdminDashboard = () => {
  // State management
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch admin data on component mount
  useEffect(() => {
    const dummyData = {
      adminId: "ADM001",
      name: "Sarah Johnson",
      role: "Senior Administrator",
      department: "User Management",
      recentActivity: [
        { id: 1, action: "User Approved", timestamp: "2024-01-10 14:30" },
        { id: 2, action: "Profile Updated", timestamp: "2024-01-10 13:15" },
        { id: 3, action: "Account Suspended", timestamp: "2024-01-10 11:45" }
      ],
      metrics: {
        totalUsers: 1250,
        activeUsers: 890,
        pendingApprovals: 25,
        recentReports: 15
      }
    };

    setTimeout(() => {
      setAdminData(dummyData);
      setLoading(false);
    }, 500);

    // Backend integration code preserved as commented
    /*
    fetch("http://localhost:8080/admin/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }
        return response.json();
      })
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    */
  }, []);

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

  const { adminId, name, role, department, recentActivity, metrics } = adminData;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 ">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mt-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">{role} - {department}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={16} />
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Settings size={24} />
            </button>
            <WalletComponent/>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Metrics Cards */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900/30 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white/60">Total Users</h3>
                <Users size={20} className="text-blue-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{metrics.totalUsers}</p>
            </div>
            <div className="bg-gray-900/30 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white/60">Active Users</h3>
                <UserCog size={20} className="text-green-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{metrics.activeUsers}</p>
            </div>
            <div className="bg-gray-900/30 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white/60">Pending Approvals</h3>
                <Bell size={20} className="text-yellow-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{metrics.pendingApprovals}</p>
            </div>
            <div className="bg-gray-900/30 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white/60">Recent Reports</h3>
                <Settings size={20} className="text-purple-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{metrics.recentReports}</p>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="md:col-span-4">
            <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-white/60">ID:</span> {adminId}</p>
                <p><span className="text-white/60">Name:</span> {name}</p>
                <p><span className="text-white/60">Role:</span> {role}</p>
                <p><span className="text-white/60">Department:</span> {department}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-12">
            <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span>{activity.action}</span>
                    <span className="text-sm text-white/60">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default AdminDashboard;