import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  AlertTriangle, 
  ClipboardCheck, 
  HelpCircle, 
  GraduationCap,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import SEO from '../components/SEO';

// Import Sub-Components

import RTOInfo from "../components/student/RTOInfo";
import MockTest from "../components/student/MockTest";
import FAQ from "../components/student/FAQ";
import DashboardTrainer from "../components/student/DashboardTrainer";
import TrafficFines from "../components/student/TrafficFines";
import DrivingSymbols from "../components/student/DrivingSymbols";

export default function StudentCornerPage() {
  const [activeSection, setActiveSection] = useState('rto');

  const menuItems = [
    {
      id: 'rto',
      title: 'RTO & License Info',
      icon: FileText,
      color: 'bg-blue-500',
      description: 'Process, fees, and documentation'
    },
    {
        id: 'learning-hub',
        title: 'Learning Hub',
        icon: BookOpen,
        color: 'bg-pink-500',
        description: 'Dashboard trainer & Traffic fines'
    },
    {
      id: 'symbols',
      title: 'Road Signs',
      icon: AlertTriangle,
      color: 'bg-amber-500',
      description: 'Mandatory, cautionary & informatory signs'
    },
    {
      id: 'mock-test',
      title: 'Mock Test',
      icon: ClipboardCheck,
      color: 'bg-green-500',
      description: 'Practice for your learner license exam'
    },
    {
      id: 'faq',
      title: 'Student FAQs',
      icon: HelpCircle,
      color: 'bg-purple-500',
      description: 'Common questions about learning'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'rto':
        return <RTOInfo />;
      case 'learning-hub':
        return (
          <div className="p-6 md:p-8 space-y-8 bg-slate-50/50">
             <div className="grid lg:grid-cols-2 gap-8">
                <DashboardTrainer />
                <TrafficFines />
             </div>
          </div>
        );
      case 'symbols':
        return <DrivingSymbols />;
      case 'mock-test':
        return <MockTest />;
      case 'faq':
        return <FAQ />;
      default:
        return <RTOInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEDE0] pt-24 pb-12">
      <SEO 
        title="Student Corner | Raj Ann Raj Driving School"
        description="Resources for driving students: RTO info, Road Signs, Mock Tests, and FAQs."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center mb-12 px-2">
          <div className="flex items-center justify-center mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100">
              <GraduationCap size={32} className="text-blue-700" />
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 text-center">
            <span className="text-slate-900">Student</span>
            <span className="text-amber-500 ml-2">Corner</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto text-center">
            <span className="text-[#1e293b]">Everything you need to pass confidently.</span>
            <span className="block sm:inline text-amber-600"> Access study materials, practice tests, and license information.</span>
          </p>
        </div>

        {/* GRID NAVIGATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative group overflow-hidden rounded-2xl p-4 md:p-6 text-left transition-all duration-300 border-2 ${
                  isActive 
                    ? 'bg-[#EFEDE0] border-blue-500 shadow-lg scale-[1.02]' 
                    : 'bg-[#EFEDE0] border-transparent hover:border-blue-200 shadow-md hover:shadow-xl'
                }`}
              >
                <div className={`absolute top-0 right-0 p-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-150 ${item.color}`} />
                
                <div className={`w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center mb-4 shadow-sm`}>
                  <Icon size={24} />
                </div>
                
                <h3 className={`text-lg font-bold mb-2 ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                  <span className={isActive ? 'text-blue-800' : 'text-[#1e293b]'}>{item.title}</span>
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  <span className="text-slate-700">{item.description}</span>
                </p>

                <div className={`flex items-center text-sm font-medium ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                  <span className={isActive ? 'text-blue-700' : 'text-slate-600 group-hover:text-blue-700'}>{isActive ? 'Viewing' : 'View Section'}</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* CONTENT AREA */}
        <div className="bg-[#EFEDE0] rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
