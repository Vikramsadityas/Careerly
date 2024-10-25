//Cards on job page
import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { X, ChevronDown, ChevronUp, DollarSign, Building2, MapPin, Upload } from "lucide-react";

const jobListings = [
  {
    id: 1,
    companyName: "Apple Inc.",
    handle: "@appleinc",
    letter: "A",
    position: "Senior Frontend Developer",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$120k - $180k/year",
    description: "Frontend developer and UI/UX enthusiast. Join us on this coding adventure!",
    requirements: [
      "5+ years of React experience",
      "Strong TypeScript skills",
      "Experience with modern frontend tooling",
      "UI/UX design sensibility"
    ],
    responsibilities: [
      "Build scalable frontend applications",
      "Work with design team",
      "Optimize application performance",
      "Mentor junior developers"
    ]
  },
  {
    id: 2,
    companyName: "Microsoft",
    handle: "@microsoft",
    letter: "M",
    position: "Frontend Engineer",
    location: "Redmond, WA",
    type: "Full-time",
    salary: "$110k - $160k/year",
    description: "Join our cloud platform team and help build the future of web applications.",
    requirements: [
      "4+ years of web development",
      "Experience with React/Angular",
      "Knowledge of Azure services",
      "Strong CS fundamentals"
    ],
    responsibilities: [
      "Develop cloud-based applications",
      "Implement responsive designs",
      "Write clean, maintainable code",
      "Collaborate with cross-functional teams"
    ]
  }
];

// Mock user profile with skills
const userProfile = {
  skills: [
    "React",
    "TypeScript",
    "UI/UX design",
    "Frontend development",
    "Azure services",
    "Responsive design"
  ]
};

const JobCard = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null
  });

  // Extract and match skills
  useEffect(() => {
    const jobSkills = job.requirements.map(req => 
      req.replace(/\d+\+?\s*years?\s*(of\s*)?/, '').toLowerCase()
    );
    const matches = userProfile.skills.filter(skill =>
      jobSkills.some(jobSkill => jobSkill.includes(skill.toLowerCase()))
    );
    setMatchedSkills(matches);
    setSelectedSkills(matches);
  }, [job]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", {
      ...formData,
      selectedSkills
    });
    setShowForm(false);
  };

  return (
    <Card className="w-full max-w-2xl mb-4">
      {/* Card Header */}
      <div className="p-4 flex justify-between items-start border-b">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-semibold text-blue-600">{job.letter}</span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-gray-800">{job.companyName}</h4>
            <span className="text-sm text-gray-500">{job.handle}</span>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Apply Now
        </Button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{job.position}</h3>
          <div className="flex gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {job.type}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.salary}
            </span>
          </div>
          <p className="text-gray-600">{job.description}</p>
        </div>

        {/* Skill Match Section */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">Skill Match</h4>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        <div className="border-t pt-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            {showDetails ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show More
              </>
            )}
          </button>

          {showDetails && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-600">{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Apply for {job.position}</h3>
              <button onClick={() => setShowForm(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full"
                  placeholder="Enter years of experience"
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume
                </label>
                <div className="flex items-center justify-center">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formData.resume ? formData.resume.name : "Upload your resume"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <Textarea
                  required
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                  className="w-full h-32"
                  placeholder="Tell us why you're interested in this position"
                />
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Relevant Skills</h4>
                <div className="space-y-2">
                  {userProfile.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`skill-${skill}`}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor={`skill-${skill}`}
                        className={`text-sm ${
                          matchedSkills.includes(skill)
                            ? "text-green-600 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {skill}
                        {matchedSkills.includes(skill) && " (Matched)"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};

const JobListings = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
      {jobListings.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;