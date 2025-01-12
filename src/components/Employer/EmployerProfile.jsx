import React from "react";
import WalletComponent from "../Wallet/Wallet";
const EmployerProfile = () => {
  const profile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Industries",
    website: "www.techcorp.com",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 flex items-center justify-center">
      {/* Gradient orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Profile Card */}
      <div className="relative w-full max-w-xl">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6 ">
            {/* Name and Email */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-gray-300">{profile.email}</p>
            </div>
            <div>
              {/* Company Info */}
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">
                  {profile.company}
                </p>
                <a
                  href={`https://${profile.website}`}
                  className="text-blue-300 hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.website}
                </a>
              </div>
              <WalletComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
