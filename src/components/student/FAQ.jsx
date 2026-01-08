import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import SEO from "../SEO";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'HOW MANY CLASSES ARE INCLUDED IN THE COURSE?',
      answer:
        'Our standard monthly package includes 26 practical driving classes. Classes are held Monday through Saturday, giving you consistent practice to build muscle memory.'
    },
    {
      question: 'IS HILL DRIVING DIFFICULT TO LEARN?',
      answer:
        'It can be challenging initially, but our curriculum is specifically designed for Himachal’s terrain. We teach you clutch control, hill starts, and descent management so you can drive confidently on steep roads.'
    },
    {
      question: 'WHICH CAR WILL I USE FOR THE DRIVING TEST?',
      answer:
        'You will generally use the same car you trained on for your RTO driving test. This ensures you are familiar with the vehicle’s dimensions and clutch bite point.'
    },
    {
      question: 'DOES THE INSTRUCTOR HAVE CONTROL OF THE CAR?',
      answer:
        'Yes, all our training vehicles are equipped with dual controls. The instructor has their own set of brake and clutch pedals to intervene instantly if necessary, ensuring your safety.'
    },
    {
      question: 'WHAT IS THE MINIMUM AGE TO JOIN?',
      answer:
        'You must be at least 18 years old to obtain a Learner’s License for a motor vehicle (car). You can start training once you have this license.'
    },
    {
      question: 'DO YOU HELP WITH THE DRIVING LICENSE APPLICATION?',
      answer:
        'Yes, we guide you through the entire process—from applying for your Learner’s License online to booking your slot for the final driving test at the RTO.'
    },
    {
      question: 'CAN I CHOOSE MY OWN CLASS TIMINGS?',
      answer:
        'We offer flexible slots from 6:00 AM to 7:00 PM. You can choose a time that fits your schedule, subject to slot availability.'
    },
    {
      question: 'WHAT IF I AM NERVOUS OR AFRAID OF TRAFFIC?',
      answer:
        'This is very common! Our instructors are trained to be patient and calm. We start in low-traffic areas and gradually move to busier roads only when you feel ready.'
    },
    {
      question: 'DO YOU OFFER REFRESHER COURSES FOR LICENSE HOLDERS?',
      answer:
        'Yes, if you already have a license but lack confidence, we offer short refresher courses focusing on specific skills like parking, highway driving, or hill driving.'
    },
    {
      question: 'WHAT DOCUMENTS ARE REQUIRED FOR ADMISSION?',
      answer:
        'You need a copy of your Aadhaar card and a passport-sized photograph.'
    },
    {
      question: 'WHAT HAPPENS IF I MISS A CLASS?',
      answer:
        'If you inform us in advance, we can try to reschedule your class. However, frequent cancellations may affect your learning momentum.'
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
    <div id="faq" className="bg-[#EFEDE0] p-6 md:p-8">
      <SEO
        title="FAQ – Driving School Questions | Raj Ann Raj"
        description="Frequently asked questions about driving lessons, RTO tests, fees, timing, and training locations in Mandi & Karsog."
        canonical="https://rajannrajdrivingschool.com/#faq"
        schema={faqSchema}
      />

      <div className="max-w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-8">
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
                className="w-full text-left bg-[#EFEDE0] border border-gray-200 rounded-lg p-5 hover:border-gold/50 transition-all"
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
    </div>
  );
};

export default FAQ;
