import React, { useState } from 'react';
import { Calendar, Clock, Users, Star, Video, Check } from 'lucide-react';

const dummyMentorData = {
  mentorId: 1,
  expertise: ["React", "Node.js", "System Design", "Cloud Architecture", "DevOps"],
  user: {
    name: "John Doe",
    email: "john@example.com",
    bio: "Senior Software Engineer with 10+ years of experience specializing in full-stack development and distributed systems."
  },
  sessions: [
    {
      sessionId: 1,
      sessionStartTime: "2025-01-10T14:00:00",
      sessionEndTime: "2025-01-10T15:00:00",
      sessionType: "ONE_ON_ONE",
      sessionFee: 50.00,
      mentorId: 1,
      applicantId: 101,
      sessionLink: "meet.google.com/abc-defg-hij",
      status: "pending"
    },
    {
      sessionId: 2,
      sessionStartTime: "2025-01-11T16:00:00",
      sessionEndTime: "2025-01-11T17:00:00",
      sessionType: "ONE_ON_ONE",
      sessionFee: 50.00,
      mentorId: 1,
      applicantId: 102,
      sessionLink: "meet.google.com/xyz-uvw-rst",
      status: "accepted"
    }
  ],
  ratings: [
    {
      id: 1,
      rating: 5,
      comment: "Excellent mentor! Very knowledgeable and patient. Helped me understand complex system design concepts.",
      date: "2025-01-05"
    },
    {
      id: 2,
      rating: 4,
      comment: "Great session, very helpful insights on React performance optimization.",
      date: "2025-01-03"
    }
  ]
};

const MentorDashboard = () => {
  const [mentorData, setMentorData] = useState(dummyMentorData);
  const [activeTab, setActiveTab] = useState('profile');

  const handleAcceptSession = (sessionId) => {
    setMentorData(prev => ({
      ...prev,
      sessions: prev.sessions.map(session => 
        session.sessionId === sessionId 
          ? { ...session, status: 'accepted' }
          : session
      )
    }));
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] text-gray-100 p-4 md:p-6">
      <div className="pt-24 max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="backdrop-blur-xl bg-black/30 rounded-2xl p-6 mb-6 border border-gray-800">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {mentorData.user.name}
                </h1>
                <p className="text-gray-400">{mentorData.user.email}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {mentorData.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex overflow-x-auto mb-6 backdrop-blur-xl bg-black/30 rounded-xl border border-gray-800 p-1">
          {['Profile', 'Sessions', 'Ratings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                activeTab === tab.toLowerCase()
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="backdrop-blur-xl bg-black/30 rounded-2xl p-6 border border-gray-800">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-blue-400">About Me</h2>
                <p className="text-gray-300 leading-relaxed">{mentorData.user.bio}</p>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="grid gap-4">
              {mentorData.sessions.map((session) => (
                <div 
                  key={session.sessionId} 
                  className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-lg font-semibold text-blue-400">
                        <Video className="w-5 h-5" />
                        <span>Session #{session.sessionId}</span>
                      </div>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDateTime(session.sessionStartTime)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{formatDateTime(session.sessionEndTime)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>ID: {session.applicantId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {session.status === 'pending' ? (
                        <button
                          onClick={() => handleAcceptSession(session.sessionId)}
                          className="w-full md:w-auto bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-6 py-2 rounded-lg flex items-center justify-center space-x-2 border border-blue-500/20 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept</span>
                        </button>
                      ) : (
                        <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/20">
                          Accepted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="grid gap-4">
              {mentorData.ratings.map((rating) => (
                <div 
                  key={rating.id} 
                  className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(rating.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-2">{rating.comment}</p>
                  <p className="text-gray-500 text-sm">{rating.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;