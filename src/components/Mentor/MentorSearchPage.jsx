import React, { useState, useEffect } from "react";
import { Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Auth/ApiClient";

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();
  const handleMentor = () => {
    navigate(`/mentor-profile/${mentor.mentorId}`);
  };

  return (
    <div className="relative group bg-white/5 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:bg-white/10">
      <div className="relative p-6 rounded-2xl overflow-hidden flex flex-col">
        <h3 className="text-2xl font-semibold text-white mb-2">
          {mentor.user.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.expertise.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < Math.round(mentor.averageRating)
                    ? "text-yellow-400"
                    : "text-gray-600"
                }`}
                fill={
                  index < Math.round(mentor.averageRating) ? "currentColor" : "none"
                }
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm">
            {mentor.averageRating.toFixed(1)} / 5
          </span>
        </div>

        <button
          className="w-full py-2.5 rounded-xl bg-purple-500/20 text-white font-medium transition-all duration-300 hover:bg-purple-500/30"
          onClick={handleMentor}
        >
          Schedule Session
        </button>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="relative animate-pulse">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl" />
        <div className="relative p-6 rounded-2xl h-40">
          <div className="space-y-4">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-5/6" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-12">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
      <svg
        className="w-8 h-8 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">
      Failed to load mentors
    </h3>
    <p className="text-gray-400 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
    >
      Try Again
    </button>
  </div>
);

const MentorSearchPage = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get("/public/mentors");
        const mentorsData = response.data.data.content;
        setMentors(mentorsData);
        setFilteredMentors(mentorsData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch mentors. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const filtered = mentors.filter(
      (mentor) =>
        mentor.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredMentors(filtered);
  }, [searchQuery, mentors]);

  return (
    <div className="min-h-screen bg-black pt-10">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Connect with Expert Mentors
          </h1>
          <p className="text-gray-400">
            Find the right mentor to guide you on your journey
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-xl" />
            <div className="relative flex items-center p-2 rounded-xl">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 px-4 py-2"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={() => window.location.reload()} />
          ) : filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.mentorId} mentor={mentor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No mentors found
              </h3>
              <p className="text-gray-400">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorSearchPage;
