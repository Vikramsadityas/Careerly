import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Globe, Phone, Info } from "lucide-react";

const EmployerLoginForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    industry: '',
    website: '',
    contactNo: ''
  });

  const [errors, setErrors] = useState({});

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Media & Entertainment',
    'Real Estate',
    'Transportation',
    'Energy',
    'Consulting',
    'Hospitality',
    'Agriculture',
    'Construction',
    'Telecommunications'
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

  const validateForm = () => {
    const newErrors = {};
    
    // Company name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Company description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }

    // Industry validation
    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    // Website validation
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!formData.website.trim()) {
      newErrors.website = 'Website URL is required';
    } else if (!urlRegex.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
    }

    // Contact number validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contactNo)) {
      newErrors.contactNo = 'Please enter a valid contact number';
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
          <Building2 className="w-12 h-12 mx-auto text-gray-400" />
          <h1 className="text-2xl font-bold">Employer Registration</h1>
          <p className="text-gray-500">Create your employer account to start hiring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <div className="relative">
              <Input
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="pl-10"
              />
              <Building2 className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>

          {/* Company Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Description</label>
            <div className="relative">
              <Textarea
                placeholder="Tell us about your company..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="min-h-[150px] pl-10"
              />
              <Info className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            <p className="text-gray-400 text-sm">{formData.description.length}/500 characters</p>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select
              value={formData.industry}
              onValueChange={(value) => handleChange('industry', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Website</label>
            <div className="relative">
              <Input
                placeholder="https://your-company.com"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="pl-10"
              />
              <Globe className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Number</label>
            <div className="relative">
              <Input
                placeholder="+1 (555) 000-0000"
                value={formData.contactNo}
                onChange={(e) => handleChange('contactNo', e.target.value)}
                className="pl-10"
              />
              <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.contactNo && <p className="text-red-500 text-sm">{errors.contactNo}</p>}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Employer Account
          </Button>
        </form>

        {/* Preview Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Company Profile Preview</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Company:</strong> {formData.companyName || 'Not provided'}</p>
            <p><strong>Industry:</strong> {formData.industry || 'Not selected'}</p>
            <p><strong>Website:</strong> {formData.website || 'Not provided'}</p>
            <p><strong>Contact:</strong> {formData.contactNo || 'Not provided'}</p>
            <p><strong>Description:</strong> {formData.description || 'Not provided'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmployerLoginForm;