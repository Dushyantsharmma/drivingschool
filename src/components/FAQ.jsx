import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import SEO from './SEO';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'WHAT IS THE MINIMUM AGE TO LEARN DRIVING?',
      answer:
        'The minimum age to learn driving is 18 years for a car. You must have a valid Learner’s License (LL) before starting actual driving training.'
    },
    {
      question: 'HOW LONG DOES IT TAKE TO LEARN DRIVING?',
      answer:
        'Typically, it takes 15–30 days of regular practice to learn basic driving skills. Learning speed varies by individual.'
    },
    {
      question: 'DO YOU PROVIDE DUAL-CONTROL VEHICLES?',
      answer:
        'Yes. All our training cars have instructor-side dual controls for maximum safety.'
    },
    {
      question: 'WHAT DOCUMENTS DO I NEED TO START TRAINING?',
      answer:
        'You need a valid Learner’s License, Aadhaar card (or any government ID), and a working mobile number.'
    },
    {
      question: 'CAN YOU HELP ME PREPARE FOR THE RTO DRIVING TEST?',
      answer:
        'Yes. We provide full RTO test preparation including routes, rules, and test patterns.'
    },
    {
      question: 'WHAT IS THE CLASS TIMING AND BATCH SCHEDULE?',
      answer:
        'Morning (6–8 AM), Afternoon (2–4 PM), Evening (4–7 PM). Classes run Monday to Saturday.'
    },
    {
      question: 'DO YOU OFFER AUTOMATIC AND MANUAL TRAINING?',
      answer:
        'Yes. Training is available for both Manual (MT) and Automatic (AT) vehicles.'
    },
    {
      question: 'WHAT IS THE COST OF DRIVING LESSONS?',
      answer:
        'Pricing depends on the course. We offer beginner, refresher, and advanced packages. Contact us for details.'
    },
    {
      question: 'CAN NERVOUS OR FEARFUL DRIVERS LEARN HERE?',
      answer:
        'Absolutely. We specialize in calm, confidence-building training for nervous learners.'
    },
    {
      question: 'DO YOU PROVIDE WOMEN-ONLY BATCHES?',
      answer:
        'Yes. Ladies-only batches are available on request.'
    },
    {
      question: 'WHAT IF I MISS A CLASS?',
      answer:
        'You can reschedule missed classes within the package validity period.'
    },
    {
      question: 'DO YOU OFFER TRAINING AFTER LICENSE?',
      answer:
        'Yes. Advanced driving, highway driving, hill driving, and defensive driving courses are available.'
    },
    {
      question: 'DO YOU TRAIN IN MANDI AND KARSOG?',
      answer:
        'Yes. Training is available in both Bhanthal (Mandi) and Karsog.'
    },
    {
      question: 'WHAT IS YOUR REFUND POLICY?',
      answer:
        'Full refund within 7 days of enrollment. Partial refunds depend on classes completed.'
    },
    {
      question: 'HOW DO I BOOK A FREE DEMO SESSION?',
      answer:
        'Call or WhatsApp +91 98820 34930 or fill out the enquiry form on our website.'
    }
  ];

  // FAQ Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-14 bg-white">
      <SEO
        title="FAQ – Driving School Questions | Raj Ann Raj"
        description="Frequently asked questions about driving lessons, RTO tests, fees, timing, and training locations in Mandi & Karsog."
        canonical="https://rajannrajdrivingschool.com/#faq"
        schema={faqSchema}
      />

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <button
                className="w-full text-left bg-white border border-gray-200 rounded-lg p-5 hover:border-gold/50 transition-all"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${index}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-navy text-sm md:text-base pr-3">
                    {faq.question}
                  </h3>
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </div>

                <motion.div
                  id={`faq-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-5 text-lg">
            Still have questions?
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#contact"
              className="bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition"
            >
              Contact Us
            </a>
            <a
              href="tel:+919882034930"
              className="bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
