import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

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

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      const foundJob = DUMMY_JOBS.find(j => j.id === parseInt(jobId));
      if (foundJob) {
        setJob(foundJob);
      }
      setLoading(false);
    }, 500);

    // Real API implementation would look like:
    /*
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
    */
  }, [jobId]);

  const handleApply = async (jobId) => {
    // Implement apply logic here
    console.log(`Applied to job ${jobId}`);
    // After successful application, you might want to:
    // - Show success message
    // - Redirect to applications page
    // - etc.
  };

  const handleClose = () => {
    navigate('/'); // Navigate back to jobs listing
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-white/70">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-white/70">Job not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto backdrop-blur-xl bg-gray-900/80 rounded-2xl p-8 border border-white/10 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">{job.title}</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="text-white/70 hover:text-white" />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-300">{job.description}</p>
          <div className="flex flex-wrap gap-2">
            {job.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-white/5 text-sm text-white/70"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
            <p>Location: {job.location}</p>
            <p>Posted by: {job.postedBy}</p>
            <p>Department: {job.department}</p>
            <p>Experience Required: {job.experienceRequired}</p>
          </div>
        </div>
        
        <button
          onClick={() => handleApply(job.id)}
          className="w-full py-3 px-4 bg-blue-500/80 hover:bg-blue-500/90 rounded-xl font-medium text-white 
          transition-colors backdrop-blur-sm"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;