import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, X, User, BookOpen, Award } from 'lucide-react';

// Visual component for creating gradient background effects
const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} />
);

// Mock data structure - replace with actual API data in production
const DUMMY_MENTOR = {
  mentorId: 1,
  expertise: ["React", "JavaScript", "System Design", "Career Guidance"],
  user: {
    name: "Dr. Sarah Wilson",
    title: "Senior Software Architect",
    email: "sarah.wilson@example.com",
    bio: "15+ years of experience in software development and architecture. Passionate about mentoring and helping others grow in their tech careers.",
    company: "Tech Giants Inc.",
    imageUrl: null
  },
  sessions: [
    {
      id: 1,
      title: "One-on-One Mentorship",
      duration: "60 min",
      price: 150.00,
      type: "ONE_ON_ONE"
    },
    {
      id: 2,
      title: "Code Review Session",
      duration: "45 min",
      price: 120.00,
      type: "ONE_ON_ONE"
    }
  ]
};

// Modal component for session booking
const BookingModal = ({ session, onClose, onSubmit }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...bookingData, sessionId: session.id });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl backdrop-blur-xl bg-gray-900/80 rounded-2xl p-8 border border-white/10 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">Book Session</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X className="text-white/70 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 mb-2">Date</label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2">Time</label>
            <input
              type="time"
              value={bookingData.time}
              onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2">Notes</label>
            <textarea
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 text-white h-32 resize-none"
              placeholder="Any specific topics you'd like to discuss?"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-500/80 hover:bg-blue-500/90 rounded-xl font-medium text-white transition-colors backdrop-blur-sm"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl font-medium text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MentorProfile = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setMentor(DUMMY_MENTOR);
      setLoading(false);
    }, 500);

    // Actual API call (commented out)
    /*
    const fetchMentorProfile = async () => {
      try {
        const response = await fetch(http://localhost:8080/mentor/profile/${id});
        const data = await response.json();
        setMentor(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mentor profile:', error);
        setLoading(false);
      }
    };
    fetchMentorProfile();
    */
  }, []);

  const handleBookSession = async (bookingData) => {
    // Simulate API call
    console.log('Booking session:', bookingData);
    setSelectedSession(null);

    // Actual API call (commented out)
    /*
    try {
      const response = await fetch(http://localhost:8080/applicants/sessions/${bookingData.sessionId}/request, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      if (response.ok) {
        // Handle success
        setSelectedSession(null);
      }
    } catch (error) {
      console.error('Error booking session:', error);
    }
    */
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 relative overflow-hidden">
      {/* Decorative gradient background */}
      <GradientOrb className="w-96 h-96 bg-purple-500 -left-48 -top-48" />
      <GradientOrb className="w-96 h-96 bg-blue-500 -right-48 -bottom-48" />

      <div className="max-w-7xl mx-auto relative">
        {/* Main content container with responsive layout */}
        <div className="pt-24 flex flex-col lg:flex-row gap-6">
          {/* Profile Section */}
          <div className="flex-1">
            <div className="backdrop-blur-xl bg-gray-900/30 rounded-2xl p-6 md:p-8 border border-white/10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={48} className="text-white/50" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {mentor.user.name}
                  </h1>
                  <p className="text-xl text-white/80 mb-2">{mentor.user.title}</p>
                  <p className="text-white/60">{mentor.user.company}</p>
                </div>
              </div>

              {/* Expertise Section */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="text-white/70" />
                    <span>Expertise</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="text-white/70" />
                    <span>About</span>
                  </h2>
                  <p className="text-white/70 leading-relaxed">{mentor.user.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Booking Section */}
          <div className="lg:w-96">
            <div className="backdrop-blur-xl bg-gray-900/30 rounded-2xl p-6 border border-white/10 lg:sticky lg:top-6">
              <h2 className="text-2xl font-semibold mb-6">Book a Session</h2>
              <div className="space-y-4">
                {mentor.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">{session.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {session.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video size={16} />
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">${session.price}</span>
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-4 py-2 bg-blue-500/80 hover:bg-blue-500/90 rounded-xl font-medium transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedSession && (
        <BookingModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          onSubmit={handleBookSession}
        />
      )}
    </div>
  );
};

export default MentorProfile;