import React, { useState } from 'react';
import { User, X } from "lucide-react";
import {  useNavigate } from 'react-router-dom';

const MentorLoginForm = () => {
  const [formData, setFormData] = useState({
    bio: '',
    expertise: []
  });
  const navigate=useNavigate();
  const [expertiseInput, setExpertiseInput] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleAddExpertise = (e) => {
    e.preventDefault();
    if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, expertiseInput.trim()]
      }));
      setExpertiseInput('');
      if (errors.expertise) {
        setErrors(prev => ({ ...prev, expertise: '' }));
      }
    }
  };

  const handleRemoveExpertise = (skill) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(item => item !== skill)
    }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 100) {
      newErrors.bio = 'Bio should be at least 100 characters';
    }

    if (formData.expertise.length === 0) {
      newErrors.expertise = 'Please add at least one area of expertise';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      navigate(`/mentor-profile/${formData.id}`);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient" />
            <div className="relative p-8 md:p-12 text-center space-y-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center animate-scale-in">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white animate-slide-up">Mentor Profile</h1>
              <p className="text-gray-300 md:text-lg animate-slide-up">Share your expertise and inspire others</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-8">
            {/* Bio Section */}
            <div className="space-y-4 animate-slide-up">
              <label className="block text-lg font-medium text-white">Professional Bio</label>
              <textarea
                placeholder="Share your story, experience, and teaching approach..."
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full min-h-[200px] rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
              />
              {errors.bio && <p className="text-red-400 text-sm animate-shake">{errors.bio}</p>}
              <p className="text-gray-400 text-sm">{formData.bio.length}/500 characters</p>
            </div>

            {/* Expertise Section */}
            <div className="space-y-4 animate-slide-up">
              <label className="block text-lg font-medium text-white">Areas of Expertise</label>
              <div className="relative">
                <form onSubmit={handleAddExpertise} className="flex gap-2">
                  <input
                    type="text"
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    placeholder="Add your skills (e.g., 'React', 'Python')"
                    className="flex-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                  <button
                    onClick={handleAddExpertise}
                    type="submit"
                    className="px-6 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-300"
                  >
                    Add
                  </button>
                </form>
              </div>
              {errors.expertise && <p className="text-red-400 text-sm animate-shake">{errors.expertise}</p>}
              
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.expertise.map((skill, index) => (
                  <span
                    key={skill}
                    className="group px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center gap-2 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveExpertise(skill)}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl font-medium transition-all duration-300 animate-slide-up"
            >
              Create Profile
            </button>
          </form>

          {/* Preview Section */}
          <div className="border-t border-white/10 p-6 md:p-12 animate-slide-up">
            <h3 className="text-xl font-semibold text-white mb-6">Profile Preview</h3>
            <div className="space-y-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <p className="text-gray-300"><span className="text-white font-medium">Bio:</span> {formData.bio || 'Not provided'}</p>
              <p className="text-gray-300"><span className="text-white font-medium">Expertise:</span> {formData.expertise.length > 0 ? formData.expertise.join(', ') : 'Not selected'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your global CSS or Tailwind config
const style = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
`;

export default MentorLoginForm;