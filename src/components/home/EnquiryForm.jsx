import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature } from 'lucide-react';
import { 
  FaUser, 
  FaPhone, 
  FaWhatsapp, 
  FaClock, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPaperPlane,
  FaTimes,
  FaCalendarAlt
} from 'react-icons/fa';

// --- Sub-Component for the Form Fields ---
const FormContent = ({ 
  handleSubmit, 
  formData, 
  handleChange, 
  submitting, 
  phoneError, 
  message,
  idPrefix = ''
}) => {
  const fieldId = (suffix) => `${idPrefix}${suffix}`;

  return (
  <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold/80">Start today</p>
          <h3 className="text-xl font-semibold text-white">Quick enrolment</h3>
          <p className="text-sm text-white/70">60-second form · instant WhatsApp follow-up</p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10">100% secure</span>
      </div>

      {/* Full Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <label htmlFor={fieldId('fullName')} className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-gold"><FaUser /></span>
          Full Name
          <span className="text-red-200">*</span>
        </label>
        <input
          id={fieldId('fullName')}
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          autoComplete="off"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
          placeholder="Full name"
        />
      </motion.div>

      {/* Mobile Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <label htmlFor={fieldId('mobileNumber')} className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-gold"><FaWhatsapp /></span>
          Mobile Number (WhatsApp)
          <span className="text-red-200">*</span>
        </label>
        <input
          id={fieldId('mobileNumber')}
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          autoComplete="off"
          className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-white placeholder-white/50 focus:ring-2 transition-all ${
            phoneError 
              ? 'border-red-400 focus:border-red-400 focus:ring-red-500/50' 
              : 'border-white/10 focus:border-gold focus:ring-gold/50'
          }`}
          placeholder="Mobile number"
        />
        {phoneError && (
          <p className="text-red-300 text-sm mt-1">{phoneError}</p>
        )}
      </motion.div>

      {/* Date of Birth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <label htmlFor={fieldId('dateOfBirth')} className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-gold"><FaCalendarAlt /></span>
          Date of Birth
          <span className="text-red-200">*</span>
        </label>
        <div className="relative">
          <input
            id={fieldId('dateOfBirth')}
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all cursor-pointer hover:bg-white/10"
            style={{
              colorScheme: 'dark',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          />
        </div>
      </motion.div>

      {/* Skill Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <label htmlFor={fieldId('skillLevel')} className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-gold"><FaGraduationCap /></span>
          Current Skill Level
          <span className="text-red-200">*</span>
        </label>
        <select
          id={fieldId('skillLevel')}
          name="skillLevel"
          value={formData.skillLevel}
          onChange={handleChange}
          required
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
        >
          <option value="" className="text-gray-900">Select your level</option>
          <option value="beginner" className="text-gray-900">Beginner (Never driven)</option>
          <option value="some-experience" className="text-gray-900">Some Experience</option>
          <option value="refresher" className="text-gray-900">Refresher (Long break)</option>
        </select>
      </motion.div>

      {/* Time Slot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <label htmlFor={fieldId('timeSlot')} className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-gold"><FaClock /></span>
          Preferred Time Slot
          <span className="text-red-200">*</span>
        </label>
        <select
          id={fieldId('timeSlot')}
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
        >
          <option value="" className="text-gray-900">Select time slot</option>
          <option value="morning" className="text-gray-900">Morning (8AM - 11AM)</option>
          <option value="afternoon" className="text-gray-900">Afternoon (12PM - 4PM)</option>
          <option value="evening" className="text-gray-900">Evening (5PM - 8PM)</option>
        </select>
      </motion.div>

      {/* Pickup Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <label htmlFor={fieldId('pickupLocation')} className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-gold"><FaMapMarkerAlt /></span>
          Pickup Location (Area)
          <span className="text-red-200">*</span>
        </label>
        <input
          id={fieldId('pickupLocation')}
          type="text"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
          placeholder="Enter your location"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={submitting}
        className={`w-full bg-gold text-navy font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-[0_10px_40px_rgba(255,193,7,0.35)] hover:shadow-[0_12px_45px_rgba(255,193,7,0.45)] flex items-center justify-center gap-3 ${submitting ? 'opacity-80 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPaperPlane />
        {submitting ? 'Processing...' : 'Submit & Request Callback'}
      </motion.button>

      {message && (
        <motion.p
          className="text-center text-white/80 text-sm mt-3 font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}

      {/* Privacy Note */}
      <motion.p
        className="text-center text-white/60 text-xs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        We respect your privacy. Your information will only be used to contact you about your driving lessons.
      </motion.p>
    </form>
  );
};

// --- Main Component ---
const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    dateOfBirth: '',
    skillLevel: '',
    timeSlot: '',
    pickupLocation: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const WEBHOOK_URL = import.meta.env.VITE_SHEET_WEBHOOK_URL || '';

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) return true;
    if (cleaned.length === 12 && phone.startsWith('+91')) return true;
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'mobileNumber') {
      if (value && !validatePhone(value)) {
        setPhoneError('Please enter a valid 10-digit number or +91XXXXXXXXXX');
      } else {
        setPhoneError('');
      }
    }
  };

  const triggerWhatsApp = (status) => {
    const RAJ_NUMBER = "919882034930"; 
    let intro = "I want to start driving lessons.";
    
    // If server failed, we change the message slightly
    if (status === 'fallback') {
      intro = "I tried to register on your site but had a connection issue. Here are my details:";
    }

    const waText = 
      `Hello Raj Ann Raj Driving Training School 👋\n\n` +
      `${intro}\n\n` +
      `Name: ${formData.fullName}\n` +
      `Mobile: ${formData.mobileNumber}\n` +
      `Area: ${formData.pickupLocation}\n\n` +
      `Please guide me about available slots.`;

    const whatsappUrl = `https://wa.me/${RAJ_NUMBER}?text=${encodeURIComponent(waText)}`;
    
    // Clean up and go
    setFormData({ 
      fullName: '', mobileNumber: '', dateOfBirth: '', 
      skillLevel: '', timeSlot: '', pickupLocation: '' 
    });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');
    
    if (!WEBHOOK_URL) {
      alert('Submission endpoint is not configured. Check .env');
      return;
    }

    if (!validatePhone(formData.mobileNumber)) {
      setPhoneError('Please enter a valid 10-digit number');
      return;
    }

    setSubmitting(true);
    setMessage('');
    
    // Define WhatsApp trigger inside handleSubmit so it can access formData and handle fallback
    const triggerWhatsApp = (status) => {
      const RAJ_NUMBER = "919882034930"; 
      let intro = "I want to start driving lessons.";
      
      // If server failed, we change the message slightly
      if (status === 'fallback') {
        intro = "I tried to register on your site but had a connection issue. Here are my details:";
      }

      const waText = 
        `Hello Raj Ann Raj Driving Training School 👋\n\n` +
        `${intro}\n\n` +
        `Name: ${formData.fullName}\n` +
        `Mobile: ${formData.mobileNumber}\n` +
        `Area: ${formData.pickupLocation}\n\n` +
        `Please guide me about available slots.`;

      const whatsappUrl = `https://wa.me/${RAJ_NUMBER}?text=${encodeURIComponent(waText)}`;
      
      // Clean up and go
      setFormData({ 
        fullName: '', mobileNumber: '', dateOfBirth: '', 
        skillLevel: '', timeSlot: '', pickupLocation: '' 
      });
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    try {
      console.log('Sending to webhook:', WEBHOOK_URL);
      console.log('Form data:', formData);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobile: formData.mobileNumber,
          dateOfBirth: formData.dateOfBirth,
          skillLevel: formData.skillLevel,
          timeSlot: formData.timeSlot,
          pickupLocation: formData.pickupLocation
        })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      if (result.status === 'success' || result.status === 'updated') {
        setMessage(result.status === 'updated' ? '✅ Updated! Opening WhatsApp...' : '✅ Registered! Opening WhatsApp...');
        triggerWhatsApp('success');
      } else {
        // Server returned an error logic (rare)
        throw new Error('Server returned error status: ' + (result.message || 'Unknown error'));
      }

    } catch (err) {
      console.error('Submit error:', err);
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      // Show detailed error message to user
      setMessage('❌ Error: ' + err.message + '. Please try again or contact us directly.');
      
      // Don't auto-open WhatsApp on error - let user decide
      // Instead, show them the option
      alert(
        '⚠️ Form submission failed!\n\n' +
        'Error: ' + err.message + '\n\n' +
        'Please:\n' +
        '1. Check your internet connection\n' +
        '2. Try submitting again\n' +
        '3. Or click OK to contact us directly on WhatsApp'
      );
      
      // Only open WhatsApp if user clicks OK on the alert
      triggerWhatsApp('fallback');
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Success State Overlay */}
      {message && message.includes('✅') && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setMessage('')}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWhatsapp className="text-3xl text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
            <p className="text-slate-600 mb-6">
              We have received your details. Please click below to confirm your slot on WhatsApp.
            </p>
            <button
              onClick={() => triggerWhatsApp('success')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={20} />
              Open WhatsApp Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
        
        {/* 1. Enquiry Button (Secondary) */}
        {/* Desktop: Above WhatsApp | Mobile: Stacked above WhatsApp */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            /* Styling */
            bg-blue-700 hover:bg-blue-600 text-white
            h-14 rounded-full shadow-xl shadow-blue-900/30
            flex items-center overflow-hidden
            z-50
            group
          "
        >
          <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
            <FileSignature size={24} />
          </div>
          
          <div className="w-0 group-hover:w-auto overflow-hidden transition-all duration-300 ease-out">
            <span className="whitespace-nowrap font-bold pr-6">
               Registration Form
            </span>
          </div>
        </button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs border border-gold/20">Priority callback</div>
                    <h2 className="text-3xl font-bold text-white leading-tight">Register now</h2>
                    <p className="text-white/70">Modern, fast, and personalized driving lessons.</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:text-gold transition-colors text-2xl"
                  >
                    <FaTimes />
                  </button>
                </div>

                <FormContent 
                  handleSubmit={handleSubmit}
                  formData={formData}
                  handleChange={handleChange}
                  submitting={submitting}
                  phoneError={phoneError}
                  message={message}
                  idPrefix="modal-"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnquiryForm;