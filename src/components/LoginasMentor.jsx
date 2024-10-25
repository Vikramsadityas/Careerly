import React, { useState } from 'react';
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Star, User } from "lucide-react";

const MentorLoginForm = () => {
  const [formData, setFormData] = useState({
    bio: '',
    expertise: [],
    hourlyRate: '',
    rating: '5'
  });

  const [errors, setErrors] = useState({});
  const expertiseAreas = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'DevOps',
    'Cloud Computing',
    'Cybersecurity',
    'Blockchain',
    'Digital Marketing'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleExpertiseChange = (area) => {
    setFormData(prev => {
      const newExpertise = prev.expertise.includes(area)
        ? prev.expertise.filter(item => item !== area)
        : [...prev.expertise, area];
      
      return {
        ...prev,
        expertise: newExpertise
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 100) {
      newErrors.bio = 'Bio should be at least 100 characters';
    }

    if (formData.expertise.length === 0) {
      newErrors.expertise = 'Please select at least one area of expertise';
    }

    if (!formData.hourlyRate) {
      newErrors.hourlyRate = 'Hourly rate is required';
    } else if (isNaN(formData.hourlyRate) || formData.hourlyRate < 0) {
      newErrors.hourlyRate = 'Please enter a valid hourly rate';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Add your form submission logic here
    } else {
      setErrors(newErrors);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="space-y-2 text-center">
          <User className="w-12 h-12 mx-auto text-gray-400" />
          <h1 className="text-2xl font-bold">Mentor Profile</h1>
          <p className="text-gray-500">Complete your mentor profile to start teaching</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bio Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Professional Bio</label>
            <Textarea
              placeholder="Share your professional experience and teaching approach..."
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="min-h-[150px]"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            <p className="text-gray-400 text-sm">{formData.bio.length}/500 characters</p>
          </div>

          {/* Expertise Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Areas of Expertise</label>
            <div className="grid grid-cols-2 gap-2">
              {expertiseAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox 
                    id={area}
                    checked={formData.expertise.includes(area)}
                    onCheckedChange={() => handleExpertiseChange(area)}
                  />
                  <label 
                    htmlFor={area}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {area}
                  </label>
                </div>
              ))}
            </div>
            {errors.expertise && <p className="text-red-500 text-sm">{errors.expertise}</p>}
          </div>

          {/* Hourly Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Hourly Rate (USD)</label>
            <Input
              type="number"
              placeholder="Enter your hourly rate"
              value={formData.hourlyRate}
              onChange={(e) => handleChange('hourlyRate', e.target.value)}
              min="0"
              step="0.01"
              className="w-full"
            />
            {errors.hourlyRate && <p className="text-red-500 text-sm">{errors.hourlyRate}</p>}
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Expected Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleChange('rating', rating.toString())}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      rating <= parseInt(formData.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Mentor Profile
          </Button>
        </form>

        {/* Preview Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Profile Preview</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Bio:</strong> {formData.bio || 'Not provided'}</p>
            <p><strong>Expertise:</strong> {formData.expertise.length > 0 ? formData.expertise.join(', ') : 'Not selected'}</p>
            <p><strong>Hourly Rate:</strong> ${formData.hourlyRate || '0'}/hour</p>
            <p><strong>Expected Rating:</strong> {formData.rating} stars</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MentorLoginForm;