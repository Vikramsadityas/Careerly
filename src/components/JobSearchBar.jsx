import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Filter } from 'lucide-react';

const JobSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      searchTerm,
      location,
      jobType,
      experienceLevel,
      salaryRange
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search job titles, keywords, or companies"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Job Type Filter */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
              >
                <option value="">Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            {/* Experience Level Filter */}
            <div className="relative">
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
              >
                <option value="">Experience Level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="executive">Executive</option>
              </select>
            </div>

            {/* Salary Range Filter */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
              >
                <option value="">Salary Range</option>
                <option value="0-50k">$0 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-150k">$100,000 - $150,000</option>
                <option value="150k+">$150,000+</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobSearchBar;