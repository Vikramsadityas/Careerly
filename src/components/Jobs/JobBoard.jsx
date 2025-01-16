import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Auth/ApiClient';

const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} />
);
const JobCard = ({ job, onClick }) => (
  <button
    onClick={onClick}
    className="w-full backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-white/10 
    hover:border-white/20 transition-all shadow-lg mb-4 text-left group"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{job.description}</p>
      </div>
      <ChevronRight className="text-white/50 group-hover:text-white/80 transition-colors" />
    </div>

    <div className="flex flex-wrap gap-2 mb-3">
      {job.skillsRequired && job.skillsRequired.length > 0 ? (
        job.skillsRequired.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/70"
          >
            {skill}
          </span>
        ))
      ) : (
        <span className="text-sm text-white/50">No skills specified</span>
      )}
    </div>

    <div className="flex justify-between items-center text-sm text-white/60">
      <span>Posted by: {job.company || 'Unknown'}</span>
      <span>{job.location || 'No location specified'}</span>
      <span
        className={`px-2 py-1 rounded-full ${
          job.jobStatus === 'Active'
            ? 'bg-green-500/20 text-green-300'
            : 'bg-yellow-500/20 text-yellow-300'
        }`}
      >
        {job.jobStatus || 'Unknown'}
      </span>
    </div>
  </button>
);

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          `http://localhost:8080/public/jobs`,
          {
            params: {
              pageOffset: page,
              pageSize: 10,
              search: searchQuery,
            },
          }
        );

        if (response.data?.data) {
          const { content, totalPages } = response.data.data;
          setJobs(content || []);
          setTotalPages(totalPages || 0);
        } else {
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, searchQuery]);

  const handleJobClick = (job) => {
    navigate(`/jobs/${job.jobId}`);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-20 relative overflow-hidden">
      <GradientOrb className="w-96 h-96 bg-purple-500 left-0 top-0" />
      <GradientOrb className="w-96 h-96 bg-blue-500 right-0 bottom-0" />
      <GradientOrb className="w-64 h-64 bg-pink-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Job Board
            </h1>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              onClick={() => navigate('/addJob')}
            >
              <Plus size={20} />
              <span>Post Job</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11
              focus:outline-none focus:border-white/20 transition-colors text-white placeholder-white/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-white/70">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center text-white/70">No jobs found</div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.jobId} job={job} onClick={() => handleJobClick(job)} />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === index
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
