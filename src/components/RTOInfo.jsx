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
  HelpCircle,
  Info
} from 'lucide-react';
import SEO from './SEO';

const RTOInfo = () => {
  const [activeTab, setActiveTab] = useState('process');

  const karsogRTO = {
    code: "HP-30",
    name: "Registering & Licensing Authority (SDM) Karsog",
    address: "Mini Secretariat, SDM Office, Karsog, Distt. Mandi, Himachal Pradesh - 175011",
    phone: "01907-222236",
    email: "sdm-kar-hp@nic.in",
    timings: "10:00 AM - 05:00 PM (Lunch: 1:30-2:00 PM)",
    jurisdiction: "Karsog Tehsil & Nearby Areas"
  };

  const tabs = [
    { id: 'process', label: 'Application Process' },
    { id: 'documents', label: 'Documents Needed' },
    { id: 'fees', label: 'Fees & Charges' }
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
    <section id="rto-info" className="py-16 bg-gray-50 overflow-hidden">
      <SEO
        title="Karsog RTO (HP-30) Details & License Process"
        description="Address, fees, and document checklist for Karsog RTO (HP-30). Practice free RTO mock tests for your Learning License."
        canonical="https://rajannrajdrivingschool.com/#rto-info"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight">
            RTO & License <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Guide</span>
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Navigating the rules at <span className="font-bold text-navy">HP-30 Karsog</span> made simple.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: RTO DASHBOARD (Sticky) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-navy text-white rounded-3xl p-6 shadow-xl lg:sticky lg:top-24 overflow-hidden relative"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/10 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none"></div>
            
            {/* RTO Identity */}
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
              <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center text-gold border border-gold/30 shadow-inner">
                <Building2 size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight">Karsog RTO</h3>
                <div className="inline-flex items-center gap-1.5 mt-1 bg-gold/20 px-2 py-0.5 rounded text-xs font-bold text-gold border border-gold/20">
                  <Info size={10} /> CODE: {karsogRTO.code}
                </div>
              </div>
            </div>

            {/* Info List */}
            <div className="space-y-5 text-sm text-gray-300">
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <MapPin className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">Address</p>
                  <p className="leading-relaxed">{karsogRTO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Clock className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">Working Hours</p>
                  <p>{karsogRTO.timings}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Phone className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">Helpline</p>
                  <p className="font-mono text-white tracking-wide">{karsogRTO.phone}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a 
              href="https://parivahan.gov.in/" 
              target="_blank" 
              rel="noreferrer"
              className="mt-8 flex items-center justify-center gap-2 w-full bg-gold hover:bg-yellow-400 text-navy font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-95"
            >
              Parivahan Sewa Portal <ExternalLink size={16} />
            </a>
          </motion.div>


          {/* RIGHT COLUMN: INTERACTIVE TABS */}
          <div className="lg:col-span-8">
            
            {/* Tabs Header */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                    activeTab === tab.id 
                    ? 'bg-navy text-white border-navy shadow-md' 
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Container */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
              <AnimatePresence mode='wait'>
                
                {/* 1. PROCESS TAB */}
                {activeTab === 'process' && (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                      <FileText className="text-gold" /> Step-by-Step Timeline
                    </h3>
                    <div className="space-y-6 relative pl-4 border-l-2 border-dashed border-gray-200 ml-3">
                      {processSteps.map((step, idx) => (
                        <div key={idx} className="relative pl-6">
                          {/* Dot */}
                          <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-4 border-navy rounded-full"></div>
                          
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gold/30 transition-colors group">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-navy text-sm group-hover:text-blue-700 transition-colors">{step.title}</h4>
                              <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-600 whitespace-nowrap">{step.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2. DOCUMENTS TAB */}
                {activeTab === 'documents' && (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-8">
                      {/* LL Docs */}
                      <div className="space-y-4">
                        <h3 className="font-bold text-navy flex items-center gap-2 border-b-2 border-gold/20 pb-2">
                          <User size={20} className="text-gold" /> For Learner's License
                        </h3>
                        <ul className="space-y-3">
                          {documents.ll.map((doc, i) => (
                            <li key={i} className="bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                              <p className="font-bold text-navy text-sm mb-1">{doc.title}</p>
                              <p className="text-xs text-gray-500">{doc.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* DL Docs */}
                      <div className="space-y-4">
                        <h3 className="font-bold text-navy flex items-center gap-2 border-b-2 border-green-500/20 pb-2">
                          <FileBadge size={20} className="text-green-600" /> For Permanent DL
                        </h3>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
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
                        <tbody className="divide-y divide-gray-100 bg-white">
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

                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-start">
                      <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-bold text-orange-800 text-sm">Fee Disclaimer</h4>
                        <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                          Fees shown are estimated based on standard HP Transport Department rates. 
                          Actual fees may vary slightly including service charges or Smart Card fees.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RTOInfo;