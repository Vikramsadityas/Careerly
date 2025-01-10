import React, { useEffect, useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  User2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  XCircle,
  Users,
} from "lucide-react";

// Background gradient orb component
const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} />
);

// Status badge component
const StatusBadge = ({ status }) => {
  const colors = {
    OPEN: "bg-green-500/20 text-green-500 border-green-500/20",
    CLOSED: "bg-red-500/20 text-red-500 border-red-500/20",
    APPLIED: "bg-blue-500/20 text-blue-500 border-blue-500/20",
    WITHDRAWN: "bg-gray-500/20 text-gray-500 border-gray-500/20",
    ACCEPTED: "bg-green-500/20 text-green-500 border-green-500/20",
    SHORTLISTED: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20",
    REJECTED: "bg-red-500/20 text-red-500 border-red-500/20",
    ACTIVE: "bg-green-500/20 text-green-500 border-green-500/20",
    CLOSED_JOB: "bg-gray-500/20 text-gray-500 border-gray-500/20",
    DRAFT: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm border ${
        colors[status] || colors.OPEN
      }`}
    >
      {status}
    </span>
  );
};

// JobCard component (if needed in the future)
const JobCard = ({ job, onViewApplications, onToggleStatus }) => (
  <div className="border border-white/20 rounded-xl p-4">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-white">{job.title}</h3>
      <StatusBadge status={job.status} />
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Users size={18} className="text-gray-400" />
        <span className="text-sm text-gray-400">
          {job.applicationCount} applicants
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onViewApplications(job)}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
        >
          View Applications
        </button>
        <button
          onClick={() => onToggleStatus(job.id)}
          className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            job.status === "OPEN"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {job.status === "OPEN" ? "Close Job" : "Reopen Job"}
        </button>
      </div>
    </div>
  </div>
);

const EmployerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(5);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);
  const pageSize = 10;

  // Fetch employer profile
  useEffect(() => {
    const dummyProfile = {
      employerId: 1,
      companyName: "Tech Innovators Inc.",
      companyWebsite: "www.techinnovators.com",
      user: {
        id: 1,
        name: "John Smith",
        email: "john.smith@techinnovators.com",
        roles: ["ROLE_EMPLOYER"],
      },
    };

    setTimeout(() => {
      setProfile(dummyProfile);
      setLoading(false);
    }, 500);
  }, []);

  // Fetch jobs
  useEffect(() => {
    const dummyJobs = Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      title: [
        "Senior Frontend Developer",
        "Backend Engineer",
        "UI/UX Designer",
        "Product Manager",
        "DevOps Engineer",
        "Full Stack Developer",
      ][index],
      status: index % 2 === 0 ? "OPEN" : "CLOSED",
      createdAt: new Date(2024, 0, index + 1).toISOString(),
      applicationCount: Math.floor(Math.random() * 50) + 1,
    }));

    setTimeout(() => {
      setJobs(dummyJobs);
      setLoading(false);
    }, 500);
  }, [currentPage]);

  const handleViewApplications = (job) => {
    setSelectedJob(job);

    // Dummy applications data
    const dummyApplications = Array.from(
      { length: job.applicationCount },
      (_, index) => ({
        id: index + 1,
        applicantName: `Applicant ${index + 1}`,
        status: ["APPLIED", "WITHDRAWN", "ACCEPTED", "SHORTLISTED", "REJECTED"][
          index % 5
        ],
      })
    );

    setApplications(dummyApplications);
    setIsApplicationsModalOpen(true);
  };

  const handleToggleJobStatus = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, status: job.status === "OPEN" ? "CLOSED" : "REOPEN" }
          : job
      )
    );
  };

  const handleToggleApplicationStatus = (applicationId) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId
          ? { ...app, status: toggleStatus(app.status) }
          : app
      )
    );
  };

  const toggleStatus = (currentStatus) => {
    const statusFlow = {
      APPLIED: "SHORTLISTED",
      SHORTLISTED: "ACCEPTED",
      ACCEPTED: "CLOSED",
      REJECTED: "WITHDRAWN",
      WITHDRAWN: "APPLIED",
      OPEN: "CLOSED",
      CLOSED: "OPEN",
    };
    return statusFlow[currentStatus] || "APPLIED";
  };

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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden p-4 md:p-8">
      {/* Background effects */}
      <GradientOrb className="w-96 h-96 bg-purple-500 left-0 top-0" />
      <GradientOrb className="w-96 h-96 bg-blue-500 right-0 bottom-0" />
      <GradientOrb className="w-64 h-64 bg-pink-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-3xl p-6 border border-white/20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Employer Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building2 className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Company Name</p>
                  <p className="text-lg font-medium">{profile?.companyName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Website</p>
                  <p className="text-lg font-medium">
                    {profile?.companyWebsite}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User2 className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Contact Person</p>
                  <p className="text-lg font-medium">{profile?.user.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg font-medium">{profile?.user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Briefcase className="text-gray-400" />
              <h2 className="text-xl font-semibold">My Job Listings</h2>
            </div>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm font-medium">
              Post New Job
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="text-left py-3 px-4 text-sm font-medium">
                    Job Title
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium">
                    Applicants
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-800">
                    <td className="py-3 px-4">{job.title}</td>
                    <td className="py-3 px-4">{job.applicationCount}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleViewApplications(job)}
                        className="px-4 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        View Applications
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleJobStatus(job.id);
                        }}
                        className={`px-4 py-1 rounded-lg transition-colors text-sm cursor-pointer font-medium ${
                          job.status === "OPEN"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {job.status === "OPEN" ? "Close Job" : "Reopen Job"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-400">
              Showing {jobs.length} of {totalPages * pageSize} jobs
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
                }
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next Page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Applications Modal */}
        {isApplicationsModalOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="applications-modal-title"
          >
            <div
              className="bg-gray-900 border-white/20 text-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto"
              role="document"
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  id="applications-modal-title"
                  className="text-xl font-semibold"
                >
                  Applications for {selectedJob?.title}
                </h2>
                <button
                  onClick={() => setIsApplicationsModalOpen(false)}
                  className="text-white/50 hover:text-white"
                  aria-label="Close Modal"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Applicant</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {applications.map((application) => (
                      <tr key={application.id} className="hover:bg-white/5">
                        <td className="py-3 px-4">
                          {application.applicantName}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={application.status} />
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            className="px-4 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() =>
                              alert(
                                `Viewing details for ${application.applicantName}`
                              )
                            }
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              handleToggleApplicationStatus(application.id)
                            }
                            className={`px-4 py-1 rounded-lg transition-colors text-sm font-medium ${getApplicationStatusColor(
                              application.status
                            )}`}
                          >
                            {getNextStatus(application.status)}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions for application status
const getApplicationStatusColor = (status) => {
  const colors = {
    APPLIED: "bg-blue-500 hover:bg-blue-600",
    WITHDRAWN: "bg-gray-500 hover:bg-gray-600",
    ACCEPTED: "bg-green-500 hover:bg-green-600",
    SHORTLISTED: "bg-yellow-500 hover:bg-yellow-600",
    REJECTED: "bg-red-500 hover:bg-red-600",
  };
  return colors[status] || "bg-blue-500 hover:bg-blue-600";
};

const getNextStatus = (currentStatus) => {
  const statusFlow = {
    APPLIED: "Shortlist",
    SHORTLISTED: "Accept",
    ACCEPTED: "Close",
    REJECTED: "Withdraw",
    WITHDRAWN: "Apply",
  };
  return statusFlow[currentStatus] || "Apply";
};

export default EmployerDashboard;
