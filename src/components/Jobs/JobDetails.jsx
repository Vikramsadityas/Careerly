import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const GradientOrb = ({ className, delay = 0 }) => (
  <motion.div 
    className={`absolute rounded-full blur-3xl opacity-0 ${className}`}
    animate={{ 
      opacity: [0, 0.2],
      scale: [0.8, 1],
    }}
    transition={{ 
      duration: 1.5,
      delay,
      ease: "easeOut"
    }}
  />
);

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const foundJob = DUMMY_JOBS.find(j => j.id === parseInt(jobId));
      if (foundJob) {
        setJob(foundJob);
      }
      setLoading(false);
    }, 500);
  }, [jobId]);

  const handleApply = async (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/70"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/70"
        >
          Job not found
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        {/* Gradient Orbs */}
        <GradientOrb className="w-96 h-96 bg-blue-500/30 -top-48 -left-48" delay={0.2} />
        <GradientOrb className="w-96 h-96 bg-purple-500/30 -bottom-48 -right-48" delay={0.4} />
        <GradientOrb className="w-64 h-64 bg-pink-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={0.6} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-6 lg:p-8 shadow-2xl"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4"
          >
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {job.title}
            </h1>
            <p className="text-white/60 mt-2 text-base">{job.department} • {job.location}</p>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-base text-white/80 leading-relaxed">{job.description}</p>
            
            <div>
              <h2 className="text-lg text-white/90 font-medium mb-2">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    className="px-4 py-1.5 rounded-full bg-white/5 text-white/80 border border-white/10 
                    hover:bg-white/10 transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-white/70">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <h2 className="text-lg text-white/90 font-medium mb-1">Posted by</h2>
                <p className="text-base">{job.postedBy}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <h2 className="text-lg text-white/90 font-medium mb-1">Experience</h2>
                <p className="text-base">{job.experienceRequired}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Apply Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleApply(job.id)}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 
              hover:to-blue-700 rounded-xl font-medium text-white transition-all duration-300 
              shadow-lg hover:shadow-blue-500/25 text-base"
            >
              Apply for this Position
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;