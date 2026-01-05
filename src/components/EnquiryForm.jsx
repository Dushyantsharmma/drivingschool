import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
              WebkitAppearance: 'none',
              appearance: 'none'
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
      let intro = "I have submitted my details via your website:";
      
      // If server failed, we change the message slightly
      if (status === 'fallback') {
        intro = "I tried to register on your site but had a connection issue. Here are my details:";
      }

      const waText = 
        `*DRIVING LESSON ENQUIRY*\n` +
        `Hello Raj N Raj Driving School,\n\n` +
        `${intro}\n\n` +
        `*Name:* ${formData.fullName}\n` +
        `*Mobile:* ${formData.mobileNumber}\n` +
        `*DOB:* ${formData.dateOfBirth}\n` +
        `*Location:* ${formData.pickupLocation}\n` +
        `*Skill:* ${formData.skillLevel}\n` +
        `*Time:* ${formData.timeSlot}\n\n` +
        `Please contact me.`;

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
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 bg-gold hover:bg-yellow-400 text-navy font-bold py-3 px-5 md:py-4 md:px-6 rounded-full shadow-2xl flex items-center gap-2 md:gap-3 transition-all duration-300 hover:scale-110 text-base md:text-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <FaPhone className="text-sm md:text-base" />
        Register Now
      </motion.button>

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
                className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-xl"
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

      <section id="enquiry" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden text-white">
        <p className="sr-only">
          Enquiry form for Raj Ann Raj Driving Training School to book driving lessons, schedule callbacks, and request pickup in Himachal Pradesh.
        </p>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,193,7,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.08),transparent_35%)]" />
          <div className="absolute -left-24 top-10 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
          <div className="absolute -right-24 bottom-0 w-72 h-72 bg-blue-500/5 blur-3xl rounded-full" />
        </div>

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="mb-12">
                <motion.div
                  className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full mb-6 border border-white/10 text-white"
                  whileHover={{ scale: 1.03 }}
                >
                  <FaGraduationCap className="text-gold text-2xl" />
                  <span className="font-semibold text-sm uppercase tracking-wide">Start learning today</span>
                </motion.div>

                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Begin your <span className="text-gold">driving journey</span>
                </h2>
                
                <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                  Fill the form, get an instant WhatsApp message with your details, and our instructor will call you with a time that fits your schedule.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white mb-4">What you get</h3>
                {[
                  { icon: <FaGraduationCap className="text-gold" />, text: 'Priority callback to book your slot' },
                  { icon: <FaUser className="text-gold" />, text: '1:1 consultation with your instructor' },
                  { icon: <FaClock className="text-gold" />, text: 'Flexible timing that fits you' },
                  { icon: <FaMapMarkerAlt className="text-gold" />, text: 'Pickup from your location' },
                  { icon: <FaWhatsapp className="text-gold" />, text: 'Instant WhatsApp confirmation' }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                      {benefit.icon}
                    </div>
                    <span className="text-white/80 font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="text-center mb-8 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold/80">Limited seats • Himachal</p>
                  <h3 className="text-3xl font-bold text-white">Register for a lesson</h3>
                  <p className="text-white/70">Finish in under a minute. No spam.</p>
                </div>

                <FormContent 
                  handleSubmit={handleSubmit}
                  formData={formData}
                  handleChange={handleChange}
                  submitting={submitting}
                  phoneError={phoneError}
                  message={message}
                  idPrefix="inline-"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnquiryForm;