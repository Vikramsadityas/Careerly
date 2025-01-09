import React, { useEffect, useState } from "react";

const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} />
);

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    // Uncomment when connecting to the backend
    /*
    fetch("http://localhost:8080/applicants/profile")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
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
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
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
    <div className="h-screen bg-black text-white flex items-center justify-center relative overflow-hidden p-8">
      {/* Gradient Orbs */}
      <GradientOrb className="w-96 h-96 bg-purple-500 left-0 top-0" />
      <GradientOrb className="w-96 h-96 bg-blue-500 right-0 bottom-0" />
      <GradientOrb className="w-64 h-64 bg-pink-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-6xl">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-3xl p-6 shadow-2xl border border-white/20">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Header & Personal Details */}
            <div className="col-span-4 border-r border-white/10 pr-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Applicant Profile
                </h1>
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

            {/* Middle Column - Skills */}
            <div className="col-span-4 border-r border-white/10 px-6">
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

            {/* Right Column - Education & Experience */}
            <div className="col-span-4 pl-6">
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
    </div>
  );
};

export default UserProfile;