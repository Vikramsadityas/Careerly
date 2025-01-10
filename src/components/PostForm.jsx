import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, FileText, Briefcase, Tag, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function JobPostForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            location: "",
            skillsRequired: [],
            jobStatus: "OPEN",
            company: ""
        }
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setError(null);
        // try {
        //     const response = await fetch("http://localhost:8080/employers/jobs", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             ...data,
        //             skillsRequired: data.skillsRequired.split(',').map(skill => skill.trim())
        //         })
        //     });

        //     if (!response.ok) throw new Error("Failed to create job post");
        //     const result = await response.json();
        //     navigate(`/jobs/${result.jobId}`);
        // } catch (err) {
        //     setError(err.message);
        // }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-4 sm:p-6 lg:p-8 ">
            <div className="max-w-4xl mx-auto mt-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-4">
                        <Briefcase className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Create Job Posting
                    </h1>
                    <p className="text-slate-400">
                        Fill in the details below to create a new job opportunity
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <div className="flex-1 text-red-400">{error}</div>
                        <button 
                            onClick={() => setError(null)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Job Title */}
                        <div className="col-span-2">
                            <label className="block">
                                <span className="inline-flex items-center text-sm font-medium text-slate-300 mb-2">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Job Title
                                </span>
                                <input
                                    type="text"
                                    {...register("title", { required: "Job title is required" })}
                                    className="w-full px-4 py-3 bg-slate-950/50 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-white placeholder-slate-500"
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                                {errors.title && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.title.message}</span>
                                )}
                            </label>
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block">
                                <span className="inline-flex items-center text-sm font-medium text-slate-300 mb-2">
                                    <Building2 className="w-4 h-4 mr-2" />
                                    Company
                                </span>
                                <input
                                    type="text"
                                    {...register("company", { required: "Company name is required" })}
                                    className="w-full px-4 py-3 bg-slate-950/50 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-white placeholder-slate-500"
                                    placeholder="Your company name"
                                />
                                {errors.company && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.company.message}</span>
                                )}
                            </label>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block">
                                <span className="inline-flex items-center text-sm font-medium text-slate-300 mb-2">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Location
                                </span>
                                <input
                                    type="text"
                                    {...register("location", { required: "Location is required" })}
                                    className="w-full px-4 py-3 bg-slate-950/50 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-white placeholder-slate-500"
                                    placeholder="e.g. Remote, New York, London"
                                />
                                {errors.location && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.location.message}</span>
                                )}
                            </label>
                        </div>

                        {/* Required Skills */}
                        <div className="col-span-2">
                            <label className="block">
                                <span className="inline-flex items-center text-sm font-medium text-slate-300 mb-2">
                                    <Tag className="w-4 h-4 mr-2" />
                                    Required Skills
                                </span>
                                <input
                                    type="text"
                                    {...register("skillsRequired", { required: "At least one skill is required" })}
                                    className="w-full px-4 py-3 bg-slate-950/50 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-white placeholder-slate-500"
                                    placeholder="e.g. React, Node.js, TypeScript (comma separated)"
                                />
                                {errors.skillsRequired && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.skillsRequired.message}</span>
                                )}
                            </label>
                        </div>

                        {/* Job Description */}
                        <div className="col-span-2">
                            <label className="block">
                                <span className="inline-flex items-center text-sm font-medium text-slate-300 mb-2">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Job Description
                                </span>
                                <textarea
                                    {...register("description", { required: "Job description is required" })}
                                    className="w-full px-4 py-3 bg-slate-950/50 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-white placeholder-slate-500 min-h-[200px] resize-y"
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                />
                                {errors.description && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.description.message}</span>
                                )}
                            </label>
                        </div>

                        {/* Job Status */}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating Post...
                                    </>
                                ) : (
                                    'Create Job Post'
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}