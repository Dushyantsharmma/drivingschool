import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  FileText,
  CreditCard,
  AlertCircle,
  ExternalLink,
  User,
  FileBadge,
  Info,
  Map,
  ChevronRight,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import SEO from "../SEO";

const RTOInfo = () => {
  const [activeTab, setActiveTab] = useState('karsog-rto');

  const karsogRTO = {
    code: "HP-30",
    name: "Registering & Licensing Authority (SDM) Karsog",
    address: "Mini Secretariat, SDM Office, Karsog, Distt. Mandi, Himachal Pradesh - 175011",
    phone: "01907-222236",
    email: "sdm-kar-hp@nic.in",
    timings: "10:00 AM - 05:00 PM (Lunch: 1:30-2:00 PM)",
    jurisdiction: "Karsog Tehsil & Nearby Areas"
  };

  const sidebarItems = [
    { id: 'karsog-rto', label: 'Karsog RTO', icon: Building2 },
    { id: 'services', label: 'RTO Services', icon: Briefcase },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'test-route', label: 'Test Route', icon: Map }
  ];

  const processSteps = [
    { title: "Online Application", desc: "Visit parivahan.gov.in > Drivers/Learners License > Select State (HP). Fill Form 4.", time: "Day 1" },
    { title: "Upload Documents", desc: "Upload Age Proof, Address Proof, and Photo/Signature.", time: "Day 1" },
    { title: "Fee Payment", desc: "Pay the LL Test fee online via the portal.", time: "Day 1" },
    { title: "Slot Booking", desc: "Book a slot for the Scrutiny (Document Verification) at HP-30 RTO.", time: "Day 1" },
    { title: "Visit RTO", desc: "Go to SDM Office Karsog with original documents for verification.", time: "Appointment Day" },
    { title: "Computer Test", desc: "Take the LL test on the computer. (10/15 marks required to pass).", time: "Same Day" },
    { title: "Download LL", desc: "If passed, the Learning License is generated instantly. Download it online.", time: "Instant" }
  ];

  const documents = {
    ll: [
      { title: "Age Proof", desc: "Birth Certificate / 10th Certificate / Aadhaar / Passport" },
      { title: "Address Proof", desc: "Aadhaar Card / Voter ID / LIC Policy / Ration Card" },
      { title: "Passport Photos", desc: "2 Recent colored photographs (white background)" },
      { title: "Medical (Form 1A)", desc: "Required only for Transport Vehicles or applicants > 40 years." }
    ],
    dl: [
      { title: "Valid Learner's License", desc: "Original LL (Must be at least 30 days old)" },
      { title: "Online Application", desc: "Printout of DL Application Form (Form 4)" },
      { title: "Vehicle Registration", desc: "RC of the vehicle used for the driving test" },
      { title: "Insurance & PUC", desc: "Valid Insurance & Pollution Certificate of the vehicle" },
      { title: "Driving School Cert.", desc: "Form 5 (If applicable/trained from school)" }
    ]
  };

  const fees = [
    { type: "Learner's License (New)", cost: "₹150", note: "Application Fee" },
    { type: "LL Test Fee", cost: "₹50", note: "Per attempt" },
    { type: "Driving License (New)", cost: "₹200", note: "Issuance Fee" },
    { type: "DL Smart Card Fee", cost: "₹200", note: "Card printing charges" },
    { type: "Driving Test Fee", cost: "₹300", note: "Per class of vehicle" },
    { type: "LL Validity", cost: "6 Months", note: "Cannot be renewed" },
    { type: "DL Validity", cost: "20 Years", note: "Or up to age 40" }
  ];

  return (
    <div id="rto-info" className="bg-[#EFEDE0] overflow-hidden p-6 md:p-8">
      <SEO
        title="Karsog RTO (HP-30) Details & License Process"
        description="Address, fees, and document checklist for Karsog RTO (HP-30). Practice free RTO mock tests for your Learning License."
        canonical="https://rajannrajdrivingschool.com/#rto-info"
      />

      <div className="max-w-full mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-navy tracking-tight">
            RTO & License <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Guide</span>
          </h2>
          <p className="text-gray-500 mt-2 text-base">
            Navigating the rules at <span className="font-bold text-navy">HP-30 Karsog</span> made simple.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${isActive
                        ? 'bg-navy text-white shadow-lg'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={isActive ? 'text-gold' : 'text-gray-400'} />
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={16} className="text-gold" />}
                  </button>
                );
              })}
            </div>

            {/* RTO Contact Card (Moved from Right) */}
            <div className="bg-navy/5 rounded-xl p-5 border border-navy/10 hidden lg:block">
              <h4 className="font-bold text-navy mb-3 flex items-center gap-2 text-sm">
                <Building2 size={16} className="text-gold" /> Contact RTO
              </h4>
              <div className="space-y-3 text-xs text-gray-600">
                <p className="leading-relaxed"><span className="font-semibold text-navy">Address:</span><br />{karsogRTO.address}</p>
                <p><span className="font-semibold text-navy">Phone:</span><br />{karsogRTO.phone}</p>
                <p><span className="font-semibold text-navy">Timings:</span><br />{karsogRTO.timings}</p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="lg:col-span-9">
            <div className="bg-[#EFEDE0] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
              <AnimatePresence mode='wait'>

                {/* 1. KARSOG RTO TAB (Timeline Only) */}
                {activeTab === 'karsog-rto' && (
                  <motion.div
                    key="karsog-rto"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                        <FileText className="text-gold" size={24} /> Application Process Timeline
                      </h3>
                      <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                        Step-by-Step
                      </span>
                    </div>

                    {/* Mobile Contact Info (Visible only on small screens) */}
                    <div className="lg:hidden bg-navy/5 rounded-xl p-4 mb-6 border border-navy/10">
                      <h4 className="font-bold text-navy mb-2 text-sm flex items-center gap-2">
                        <Building2 size={14} className="text-gold" /> Contact RTO
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">{karsogRTO.address}</p>
                      <div className="flex gap-4 text-xs text-gray-600">
                        <span>{karsogRTO.phone}</span>
                        <span>{karsogRTO.timings.split('(')[0]}</span>
                      </div>
                    </div>

                    <div className="space-y-6 relative pl-4 border-l-2 border-dashed border-gray-200 ml-3">
                      {processSteps.map((step, idx) => (
                        <div key={idx} className="relative pl-6">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 bg-[#EFEDE0] border-4 border-navy rounded-full"></div>
                          <div className="bg-gray-50 rounded-xl p-4 glow-card transition-colors group">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-navy text-sm group-hover:text-blue-700 transition-colors">{step.title}</h4>
                              <span className="text-[10px] font-bold bg-[#EFEDE0] px-2 py-0.5 rounded border border-gray-200 text-gray-600 whitespace-nowrap">{step.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2. SERVICES TAB */}
                {activeTab === 'services' && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                        <Briefcase className="text-gold" /> Services Offered by RTO
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Any Regional Transport Office (RTO) across various cities, states or union territories in India is deemed to carry out specific functions. The main functions of an RTO are three-fold:
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-1">
                        {[
                          "To ensure that the provisions of all the rules and regulations stated under the Motor Vehicles Act, 1988, the Central Motor Vehicles Rules, 1989 and the state motor vehicles guidelines are properly enforced.",
                          "To levy and collect tax according to the provisions of the Motor Vehicles Act, 1988.",
                          "To facilitate the development and growth of road transportation by managing respective permits."
                        ].map((func, i) => (
                          <li key={i} className="flex gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-50">
                            <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={16} />
                            <span className="text-xs md:text-sm text-navy font-medium leading-relaxed">{func}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h4 className="font-bold text-navy mb-4 border-b border-gray-200 pb-2">Primary Activities</h4>
                      <div className="grid gap-6 md:grid-cols-2">
                        {[
                          {
                            id: 'mvr',
                            title: 'Motor Vehicle Registration',
                            desc: 'Issuing and renewing registration certificates, transfer of ownership, change in registration details, hypothecation removal and issuing fitness certificate.'
                          },
                          {
                            id: 'mvtc',
                            title: 'Motor Vehicle Tax Collection',
                            desc: 'Collection of Motor Vehicle Tax/Road Tax as per MV Act 1988, conducting motor department action cases and vehicle inspection fee collection.'
                          },
                          {
                            id: 'idl',
                            title: 'Issuance of Driving Licence',
                            desc: 'Issuing learner’s permit & driving licence, conducting driving tests, renewal/duplication of licence, and issuing licenses for instructors/conductors.'
                          },
                          {
                            id: 'vmi',
                            title: 'Vehicle Mechanical Inspection',
                            desc: 'Inspection for fitness certification, clearance for accidental vehicles, and validity checks for insurance and PUC certificates.'
                          },
                          {
                            id: 'ip',
                            title: 'Issuance of Permits',
                            desc: 'Issuing tourist and transportation permits, inter-state/national permits for commercial vehicles, and All India Tourist Vehicle Authorisation.',
                            full: true
                          }
                        ].map((service) => (
                          <div key={service.id} className={`bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-md transition-all ${service.full ? 'md:col-span-2' : ''}`}>
                            <div className="w-10 h-10 bg-navy/5 text-navy rounded-lg flex items-center justify-center font-bold text-xs mb-3 uppercase tracking-wider">
                              {service.id}
                            </div>
                            <h5 className="font-bold text-navy mb-2">{service.title}</h5>
                            <p className="text-xs text-gray-500 leading-relaxed">{service.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. DOCUMENTS TAB */}
                {activeTab === 'documents' && (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-navy mb-6">Required Documents</h3>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-navy flex items-center gap-2 border-b-2 border-gold/20 pb-2">
                          <User size={20} className="text-gold" /> For Learner's License
                        </h4>
                        <ul className="space-y-3">
                          {documents.ll.map((doc, i) => (
                            <li key={i} className="bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                              <p className="font-bold text-navy text-sm mb-1">{doc.title}</p>
                              <p className="text-xs text-gray-500">{doc.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-navy flex items-center gap-2 border-b-2 border-green-500/20 pb-2">
                          <FileBadge size={20} className="text-green-600" /> For Permanent DL
                        </h4>
                        <ul className="space-y-3">
                          {documents.dl.map((doc, i) => (
                            <li key={i} className="bg-green-50/50 p-4 rounded-xl border border-green-50">
                              <p className="font-bold text-navy text-sm mb-1">{doc.title}</p>
                              <p className="text-xs text-gray-500">{doc.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. FEES TAB */}
                {activeTab === 'fees' && (
                  <motion.div
                    key="fees"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                      <CreditCard className="text-gold" /> Official Fee Structure
                    </h3>
                    <div className="overflow-hidden rounded-xl border border-gray-200 mb-6 shadow-sm">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                          <tr>
                            <th className="px-5 py-3 font-bold uppercase text-xs tracking-wider">Service</th>
                            <th className="px-5 py-3 font-bold uppercase text-xs tracking-wider">Fee</th>
                            <th className="px-5 py-3 font-bold uppercase text-xs tracking-wider hidden sm:table-cell">Note</th>
                          </tr>
                        </thead>
                          <tbody className="divide-y divide-gray-100 bg-[#EFEDE0]">
                          {fees.map((fee, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-3.5 font-medium text-navy">{fee.type}</td>
                              <td className="px-5 py-3.5 text-green-700 font-bold">{fee.cost}</td>
                              <td className="px-5 py-3.5 text-gray-600 text-xs hidden sm:table-cell">{fee.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* 4. TEST ROUTE TAB */}
                {activeTab === 'test-route' && (
                  <motion.div
                    key="test-route"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                      <Map className="text-gold" /> Driving Test Route
                    </h3>
                    <div className="bg-[#EFEDE0] rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                      <img
                        src={`${import.meta.env.BASE_URL}symbols/Driving Test Route.png`}
                        alt="Driving Test Route Diagram"
                        className="w-full h-auto object-contain p-4"
                      />
                      <p className="text-center text-sm text-gray-500 pb-4 italic">
                        Official test track layout for Karsog RTO
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RTOInfo;