import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();
  const handlementor=()=>{
    navigate('/mentors')
  }
  const handlejobs=()=>{
    navigate('/jobs')
  }
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* <Wallet/> */}
      {/* Dynamic Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 to-black opacity-80" />
      
      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-delay" />
        <div className="absolute bottom-0 left-1/3 w-88 h-88 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-long" />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Shape Tomorrow's Career
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover your potential through AI-powered career guidance and mentorship
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered('start')}
                onMouseLeave={() => setIsHovered(null)}
                onClick={handlejobs}
              >
                Get Started
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered('mentor')}
                onMouseLeave={() => setIsHovered(null)}
                onClick={handlementor}
              >
                Find a Mentor
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI-Powered Matching",
                  description: "Our advanced algorithms connect you with the perfect opportunities",
                  gradient: "from-blue-600 to-cyan-600"
                },
                {
                  title: "Elite Mentorship",
                  description: "Learn from industry leaders who've walked your path",
                  gradient: "from-purple-600 to-pink-600"
                },
                {
                  title: "Real-time Growth",
                  description: "Track your progress with interactive learning experiences",
                  gradient: "from-orange-600 to-red-600"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-3xl"
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl transition-all duration-500 group-hover:bg-white/10" />
                  <div className="relative p-8">
                    <div className={`w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${feature.gradient} p-4 backdrop-blur-3xl`} />
                    <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { number: "000", label: "Active Opportunities" },
                { number:"4", label: "Expert Mentors" },
                { number: "000", label: "Success Stories" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/5 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="p-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {stat.number}
                    </h2>
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-3xl" />
              <div className="relative p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Define Your Future?
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join the next generation of leaders shaping tomorrow's industries
                </p>
                <button className="px-8 py-4 bg-white text-black rounded-2xl hover:scale-105 transition-all duration-300">
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative py-16 mt-20">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "Success Stories"]
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Contact"]
                },
                {
                  title: "Resources",
                  links: ["Blog", "Support", "Guides"]
                },
                {
                  title: "Legal",
                  links: ["Privacy", "Terms", "Security"]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400">
              © 2025 Team ARC. All rights to WAQF Board.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;