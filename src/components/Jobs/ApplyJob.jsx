import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobApplicationForm = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');

  const addSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const addLocation = () => {
    if (currentLocation.trim()) {
      setLocations([...locations, currentLocation.trim()]);
      setCurrentLocation('');
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const removeLocation = (indexToRemove) => {
    setLocations(locations.filter((_, index) => index !== indexToRemove));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleLocationKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLocation();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const tagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen w-full p-8 pt-20 bg-black bg-opacity-90 flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Orbs */}
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        animate={{ 
          x: ["-50%", "-45%", "-50%"],
          y: ["-50%", "-55%", "-50%"]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"
      />
      <motion.div
        initial={{ x: "50%", y: "50%" }}
        animate={{ 
          x: ["50%", "45%", "50%"],
          y: ["50%", "55%", "50%"]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"
      />
      
      {/* Form Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl backdrop-blur-xl bg-white bg-opacity-10 rounded-3xl p-8 shadow-2xl border border-white border-opacity-20"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Job Application
        </motion.h1>
        
        <form className="space-y-6">
          {/* Resume Upload */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="block text-white text-sm font-medium">Resume</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 border border-white border-opacity-10"
              />
            </div>
          </motion.div>

          {/* Skills Input */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="block text-white text-sm font-medium">Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                placeholder="Add a skill"
                className="flex-1 px-4 py-3 bg-white bg-opacity-5 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 border border-white border-opacity-10"
              />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                type="button"
                onClick={addSkill}
                className="p-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </motion.button>
            </div>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              <AnimatePresence>
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill + index}
                    variants={tagVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                    className="px-3 py-1 bg-white bg-opacity-10 rounded-full text-white text-sm flex items-center gap-1"
                  >
                    {skill}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Preferred Locations */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <label className="block text-white text-sm font-medium">Preferred Locations</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                onKeyPress={handleLocationKeyPress}
                placeholder="Add a location"
                className="flex-1 px-4 py-3 bg-white bg-opacity-5 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 border border-white border-opacity-10"
              />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                type="button"
                onClick={addLocation}
                className="p-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Location Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              <AnimatePresence>
                {locations.map((location, index) => (
                  <motion.span
                    key={location + index}
                    variants={tagVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                    className="px-3 py-1 bg-white bg-opacity-10 rounded-full text-white text-sm flex items-center gap-1"
                  >
                    {location}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeLocation(index)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Submit Application
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default JobApplicationForm;