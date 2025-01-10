import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} />
);

// Dummy data
const DUMMY_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    description: "We're looking for an experienced Frontend Developer proficient in React and modern JavaScript frameworks. The ideal candidate will have strong experience with responsive design and modern web technologies.",
    postedBy: "Tech Department",
    skillsRequired: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    location: "San Francisco, CA",
    status: "Active",
    department: "Engineering",
    experienceRequired: "5+ years"
  },
  {
    id: 2,
    title: "Backend Engineer",
    description: "Seeking a Backend Engineer to develop scalable server-side applications. Experience with microservices architecture and cloud platforms is required.",
    postedBy: "Engineering Team",
    skillsRequired: ["Java", "Spring Boot", "MySQL", "AWS"],
    location: "New York, NY",
    status: "Active",
    department: "Engineering",
    experienceRequired: "3+ years"
  },
  {
    id: 3,
    title: "Product Designer",
    description: "Looking for a creative Product Designer to join our UX team. Should have experience with modern design tools and user-centered design principles.",
    postedBy: "Design Team",
    skillsRequired: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    location: "Remote",
    status: "Active",
    department: "Design",
    experienceRequired: "4+ years"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    description: "Experienced DevOps Engineer needed to improve and maintain our CI/CD pipelines and cloud infrastructure.",
    postedBy: "Infrastructure Team",
    skillsRequired: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    location: "Seattle, WA",
    status: "Active",
    department: "Operations",
    experienceRequired: "3+ years"
  }
];

const JobCard = ({ job, onClick }) => {
  const navigate=useNavigate();
  const handleJob=()=>{
    navigate(`/jobs/${job.id}`)
  }
  return (
  <button
    onClick={handleJob}
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
      {job.skillsRequired.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/70"
        >
          {skill}
        </span>
      ))}
    </div>
    
    <div className="flex justify-between items-center text-sm text-white/60">
      <span>Posted by: {job.postedBy}</span>
      <span>{job.location}</span>
      <span className={`px-2 py-1 rounded-full ${
        job.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
      }`}>
        {job.status}
      </span>
    </div>
  </button>
)};



const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setJobs(DUMMY_JOBS);
      setTotalPages(1);
      setLoading(false);
    }, 500);

    // Commented out actual API implementation for future use
    /*
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          http://localhost:8080/employers/job-applications?pageOffset=${page}&pageSize=10&search=${searchQuery}
        );
        const data = await response.json();
        setJobs(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
    */
  }, [page, searchQuery]);

  const handleApply = async (jobId) => {
    // Simulate successful application
    console.log(`Applied to job ${jobId}`);
    setSelectedJob(null);

    // Commented out actual API implementation for future use
    /*
    try {
      const response = await fetch(http://localhost:8080/employers/applicants/${jobId}, {
        method: 'GET'
      });
      if (response.ok) {
        setSelectedJob(null);
        // Show success message
      }
    } catch (error) {
      console.error('Error applying for job:', error);
    }
    */
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-24 relative overflow-hidden">
      {/* Gradient Orbs */}
      <GradientOrb className="w-96 h-96 bg-purple-500 left-0 top-0" />
      <GradientOrb className="w-96 h-96 bg-blue-500 right-0 bottom-0" />
      <GradientOrb className="w-64 h-64 bg-pink-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header and Search */}
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Job Board
            </h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
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

        {/* Job Listings */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-white/70">Loading...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center text-white/70">No jobs found</div>
          ) : (
            filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)}
              />
            ))
          )}
        </div>

        {/* Pagination */}
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

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApply}
        />
      )}
    </div>
  );
};

export default JobBoard;