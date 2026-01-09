import { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSignature, X, User, Phone, MapPin, Send, Loader2, 
  CalendarDays, WifiOff, CheckCircle2, Clock, Gauge, Users, Lock
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

// Use your latest script URL here
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwHuW54HrmmrB6WiJAU_9uujwDHsy-qUC_EFJRFGU0wrCK13AujMM7rsW8z1ddAenQT/exec";

// --- SUB-COMPONENTS ---

const GenderPill = ({ label, value, colorClass, currentValue, onClick }) => {
  const isSelected = currentValue === value;
  return (
    <button
      type="button"
      onClick={() => onClick('gender', value)}
      className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border flex-1 text-center whitespace-nowrap ${
        isSelected
          ? `${colorClass} shadow-[0_0_15px_rgba(0,0,0,0.2)] scale-[1.02] border-transparent ring-1 ring-white/20`
          : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="gender-highlight"
          className="absolute inset-0 rounded-xl bg-white/10"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

const SkillPill = ({ label, value, colorClass, currentValue, onClick }) => {
  const isSelected = currentValue === value;
  return (
    <button
      type="button"
      onClick={() => onClick('skillLevel', value)}
      className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border flex-1 sm:flex-none text-center whitespace-nowrap ${
        isSelected
          ? `${colorClass} shadow-[0_0_15px_rgba(0,0,0,0.2)] scale-[1.02] border-transparent ring-1 ring-white/20`
          : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="skill-highlight"
          className="absolute inset-0 rounded-xl bg-white/10"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

const TimePill = ({ label, value, colorClass, currentValue, onClick, isFull }) => {
  const isSelected = currentValue === value;
  
  if (isFull) {
    return (
      <div className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold bg-slate-900/30 border border-slate-800 text-slate-600 cursor-not-allowed opacity-70">
        <span className="flex items-center gap-3">
          <Lock size={16} />
          {label}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold text-red-900/50 bg-red-500/10 px-2 py-1 rounded">Full</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick('timeSlot', value)}
      className={`group relative w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 border ${
        isSelected
          ? `${colorClass} shadow-lg translate-x-1 border-transparent ring-1 ring-white/10`
          : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      <span className="flex items-center gap-3">
        {isSelected ? <CheckCircle2 size={16} /> : <div className="w-4" />}
        {label}
      </span>
      {isSelected && (
        <motion.div
          layoutId="time-highlight"
          className="absolute right-4 w-2 h-2 rounded-full bg-white animate-pulse"
        />
      )}
    </button>
  );
};

// --- MAIN COMPONENT ---

const EnquiryFab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('form'); 
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [error, setError] = useState('');
  
  const [availability, setAvailability] = useState({
    "Morning (8 AM - 11 AM)": true,
    "Afternoon (12 PM - 4 PM)": true,
    "Evening (5 PM - 7 PM)": true
  });

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    gender: 'Male',
    dateOfBirth: '',
    skillLevel: 'Beginner (Never Driven)',
    timeSlot: 'Morning (8 AM - 11 AM)',
    pickupLocation: '',
    website_honey: '' 
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(WEBHOOK_URL);
        const data = await res.json();
        if (data.status === "success" && data.availability) {
          setAvailability(data.availability);
        }
      } catch (e) {
        console.warn("Could not fetch availability", e);
      }
    };
    
    if (isOpen) fetchAvailability();
  }, [isOpen]);

  // ✅ UPDATED HANDLER: Enforce 10-digit limit
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobileNumber') {
      // Allow only numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, ''); 
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (error) setError('');
  };

  const handlePillChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // ✅ UPDATED VALIDATION: Must be exactly 10 digits
  const validatePhone = (phone) => {
    return phone.length === 10;
  };

  const triggerWhatsApp = () => {
    const RAJ_NUMBER = "919882034930";
    const text = 
`*Driving School Enquiry* 🚗
------------------
👤 *Name:* ${formData.fullName}
🚻 *Gender:* ${formData.gender}
📱 *Mobile:* ${formData.mobileNumber}
🎂 *DOB:* ${formData.dateOfBirth}
🎓 *Skill:* ${formData.skillLevel}
⏰ *Time:* ${formData.timeSlot}
📍 *Location:* ${formData.pickupLocation}
------------------
Please confirm if this slot is available.`;

    window.open(`https://wa.me/${RAJ_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Honeypot Check
    if (formData.website_honey) {
      setStep('success'); 
      return; 
    }

    if (!validatePhone(formData.mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setStep('submitting');
    setIsOfflineMode(false);

    const payload = {
      fullName: formData.fullName,
      mobile: formData.mobileNumber,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      skillLevel: formData.skillLevel,
      timeSlot: formData.timeSlot,
      pickupLocation: formData.pickupLocation,
      honeypot: formData.website_honey 
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      setStep('success');

    } catch (err) {
      console.warn("Submission failed (likely network):", err);
      setIsOfflineMode(true);
      setStep('success');
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center justify-center h-14 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 rounded-full shadow-[0_8px_30px_rgb(251,191,36,0.4)] pr-6 pl-4 gap-3 border-2 border-white/20 backdrop-blur-md"
        >
          <div className="relative">
            <span className="absolute inset-0 bg-white/40 rounded-full animate-ping opacity-75" />
            <FileSignature size={24} className="relative z-10" />
          </div>
          <span className="font-bold text-sm tracking-wide uppercase text-[#0f172a]">Book Slot</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-slate-800/60 sm:rounded-3xl rounded-t-3xl shadow-2xl shadow-black/50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-500/10 text-amber-500 p-1.5 rounded-lg">
                      <Gauge size={18} />
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight">Driving Admission</h2>
                  </div>
                  <p className="text-xs font-medium text-slate-400 ml-1">Secure your training slot today</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0f172a] to-[#020617]">
                {step === 'form' && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    <input 
                      type="text" 
                      name="website_honey" 
                      value={formData.website_honey}
                      onChange={handleChange}
                      style={{ display: 'none', position: 'absolute', left: '-9999px' }} 
                      tabIndex={-1} 
                      autoComplete="off"
                    />

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                          <User size={12} /> Candidate Name
                        </label>
                        <div className="relative group">
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all placeholder:text-slate-600 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* ✅ UPDATED MOBILE INPUT */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                            <Phone size={12} /> WhatsApp
                          </label>
                          <div className="relative group">
                            <input
                              type="tel"
                              name="mobileNumber"
                              required
                              maxLength={10} // HTML Constraint
                              inputMode="numeric" // Mobile Keyboard
                              pattern="[0-9]{10}" // iOS Hints
                              value={formData.mobileNumber}
                              onChange={handleChange}
                              className={`w-full bg-slate-800/40 border ${error ? 'border-red-500/50 ring-2 ring-red-500/10' : 'border-slate-700/60'} text-white rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all placeholder:text-slate-600 font-medium tracking-wider`}
                            />
                          </div>
                          {error && <p className="text-red-400 text-xs ml-1 font-medium animate-pulse">{error}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                            <CalendarDays size={12} /> Birth Date
                          </label>
                          <div className="relative group">
                            <input
                              type="date"
                              name="dateOfBirth"
                              required
                              max={new Date().toISOString().split("T")[0]}
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all [color-scheme:dark] font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                          <Users size={12} /> Gender
                        </label>
                        <div className="flex gap-3">
                          <GenderPill label="Male" value="Male" currentValue={formData.gender} onClick={handlePillChange} colorClass="bg-blue-500/20 text-blue-400 border-blue-500/50" />
                          <GenderPill label="Female" value="Female" currentValue={formData.gender} onClick={handlePillChange} colorClass="bg-pink-500/20 text-pink-400 border-pink-500/50" />
                          <GenderPill label="Other" value="Other" currentValue={formData.gender} onClick={handlePillChange} colorClass="bg-purple-500/20 text-purple-400 border-purple-500/50" />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent w-full" />

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                          <Gauge size={12} /> Experience Level
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <SkillPill label="Beginner" value="Beginner (Never Driven)" currentValue={formData.skillLevel} onClick={handlePillChange} colorClass="bg-emerald-900/40 text-emerald-400 border-emerald-500/50" />
                          <SkillPill label="Learner" value="Some Experience" currentValue={formData.skillLevel} onClick={handlePillChange} colorClass="bg-lime-900/40 text-lime-400 border-lime-500/50" />
                          <SkillPill label="Refresher" value="Refresher (Long Break)" currentValue={formData.skillLevel} onClick={handlePillChange} colorClass="bg-cyan-900/40 text-cyan-400 border-cyan-500/50" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                          <Clock size={12} /> Preferred Time
                        </label>
                        <div className="space-y-3">
                          <TimePill 
                            label="Morning (8 AM - 11 AM)" 
                            value="Morning (8 AM - 11 AM)" 
                            currentValue={formData.timeSlot}
                            onClick={handlePillChange}
                            colorClass="bg-blue-900/40 text-blue-300 border-blue-500/50"
                            isFull={!availability["Morning (8 AM - 11 AM)"]}
                          />
                          <TimePill 
                            label="Afternoon (12 PM - 4 PM)" 
                            value="Afternoon (12 PM - 4 PM)" 
                            currentValue={formData.timeSlot}
                            onClick={handlePillChange}
                            colorClass="bg-indigo-900/40 text-indigo-300 border-indigo-500/50"
                            isFull={!availability["Afternoon (12 PM - 4 PM)"]}
                          />
                          <TimePill 
                            label="Evening (5 PM - 7 PM)" 
                            value="Evening (5 PM - 7 PM)" 
                            currentValue={formData.timeSlot}
                            onClick={handlePillChange}
                            colorClass="bg-violet-900/40 text-violet-300 border-violet-500/50"
                            isFull={!availability["Evening (5 PM - 7 PM)"]}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                          <MapPin size={12} /> Pickup Location
                        </label>
                        <div className="relative group">
                          <input
                            type="text"
                            name="pickupLocation"
                            required
                            value={formData.pickupLocation}
                            onChange={handleChange}
                            className="w-full bg-slate-800/40 border border-slate-700/60 text-white rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all placeholder:text-slate-600 font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#0f172a] font-extrabold py-4 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 group"
                    >
                      <span>Confirm Booking</span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}

                {step === 'submitting' && (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full" />
                      <Loader2 size={64} className="text-amber-400 animate-spin relative z-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">Saving Registration...</h3>
                      <p className="text-slate-400 text-sm">Please wait while we record your details securely.</p>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="flex flex-col items-center justify-center py-10 text-center space-y-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-2xl ${
                        isOfflineMode 
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                          : 'bg-green-500/10 border-green-500/30 text-green-500'
                      }`}
                    >
                      {isOfflineMode ? <WifiOff size={40} /> : <FaWhatsapp size={48} />}
                    </motion.div>
                    
                    <div className="space-y-3 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 w-full">
                      <h3 className={`text-2xl font-bold ${isOfflineMode ? 'text-amber-400' : 'text-green-400'}`}>
                        {isOfflineMode ? "Connection Weak" : "Registration Saved!"}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {isOfflineMode 
                          ? "We couldn't reach the server, but your data is safe. Please click below to send the details directly via WhatsApp." 
                          : "We have received your details in our system. Please click below to send the final confirmation via WhatsApp."}
                      </p>
                    </div>
                    
                    <div className="w-full space-y-4">
                      <button
                        onClick={triggerWhatsApp}
                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                      >
                        <FaWhatsapp size={24} />
                        <span>Open WhatsApp Now</span>
                      </button>

                      <button 
                        onClick={() => setIsOpen(false)}
                        className="text-slate-500 text-sm font-medium hover:text-slate-300 transition-colors py-2"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnquiryFab;