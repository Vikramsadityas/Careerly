import React from 'react';
import { Card } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {  useNavigate } from 'react-router-dom';
import { Github, Linkedin, Instagram, Code2, Trophy } from "lucide-react";

const MentorProfile = () => {
  const navigate=useNavigate()
  const profile = {
    name: "Sarah Johnson",
    avatar: "/api/placeholder/150/150",
    title: "Senior Software Engineer",
    education: "MS Computer Science, Stanford University",
    experience: [
      "Lead Developer at Tech Corp (2020-Present)",
      "Software Engineer at StartupX (2018-2020)"
    ],
    skills: ["React", "Node.js", "Python", "AWS", "Docker", "GraphQL"],
    social: {
      leetcode: "sarahjohnson",
      hackerrank: "sarahj_dev",
      github: "sarahjdev",
      linkedin: "sarahjohnson",
      instagram: "sarahj.codes"
    }
  };

  return (
    <>
      <Card className="w-full p-6 bg-gray-100">
        <div className="flex flex-row gap-8 ml-20 align-middle">
          {/* Left side - Avatar and Social Links */}
          <div className="flex flex-col gap-4">
            <Avatar className="w-32 h-32">
              <img src={profile.avatar} alt="Profile" />
            </Avatar>
            {/* Social Links under Avatar */}
            <div className="flex flex-col gap-2">
              <a href={`https://www.linkedin.com/in/${profile.social.linkedin}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
                <Linkedin className="h-4 w-4" />
                <span>@{profile.social.linkedin}</span>
              </a>
              <a href={`https://github.com/${profile.social.github}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
                <Github className="h-4 w-4" />
                <span>@{profile.social.github}</span>
              </a>
              <a href={`https://leetcode.com/${profile.social.leetcode}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
                <Code2 className="h-4 w-4" />
                <span>LeetCode: {profile.social.leetcode}</span>
              </a>
              <a href={`https://www.hackerrank.com/${profile.social.hackerrank}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
                <Trophy className="h-4 w-4" />
                <span>HackerRank: {profile.social.hackerrank}</span>
              </a>
              <a href={`https://www.instagram.com/${profile.social.instagram}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
                <Instagram className="h-4 w-4" />
                <span>@{profile.social.instagram}</span>
              </a>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <Button 
                color="primary" 
                variant="flat"
                className="w-full"
                onClick={() => navigate("/jobs")}
              >
                Be a Employer
              </Button>
              <Button 
                color="secondary" 
                variant="flat"
                className="w-full"
                onClick={() => console.log("Mentor action")}
              >
                Be a Mentor
              </Button>
            </div>
          </div>
          {/* Right side - Info */}
          <div className="flex flex-col gap-6 flex-grow ml-40">
            {/* Name and Title */}
            <div className="text-left">
              <h2 className="text-2xl font-bold leading-none mb-2">{profile.name}</h2>
              <p className="text-gray-500">{profile.title}</p>
            </div>
            {/* Education */}
            <div className="text-left">
              <h3 className="text-md font-semibold mb-2">Education</h3>
              <p className="text-gray-500">{profile.education}</p>
            </div>
            {/* Experience */}
            <div className="text-left">
              <h3 className="text-md font-semibold mb-2">Experience</h3>
              <ul className="list-disc ml-4 text-gray-500">
                {profile.experience.map((exp, index) => (
                  <li key={index} className="mb-1">{exp}</li>
                ))}
              </ul>
            </div>
            {/* Skills */}
            <div className="text-left">
              <h3 className="text-md font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full border border-gray-300 text-sm hover:border-blue-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default MentorProfile;