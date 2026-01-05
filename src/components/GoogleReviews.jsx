import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FaGoogle, FaStar, FaQuoteRight } from 'react-icons/fa'; // Keeping FontAwesome for Brand Icons
import { ChevronLeft, ChevronRight, CheckCircle2, Star } from 'lucide-react'; // Lucide for UI

const GoogleReviews = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const scrollAmount = 320; // Card width + gap
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const reviews = [
    {
      name: 'Aniket Kamra',
      rating: 5,
      text: 'Best driving school in Mandi. Very experienced instructor and excellent guidance. Passed in first attempt.',
      date: '3 months ago',
      initial: 'A',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Vinay Kumar',
      rating: 5,
      text: 'Professional and patient teaching. Strong focus on safety and real driving skills.',
      date: '2 months ago',
      initial: 'V',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Priya Thakur',
      rating: 5,
      text: 'Perfect for beginners. Calm instructor and very supportive environment.',
      date: '1 month ago',
      initial: 'P',
      color: 'bg-pink-100 text-pink-700'
    },
    {
      name: 'Rohit Sharma',
      rating: 5,
      text: 'Excellent driving techniques and traffic rule explanation. Highly recommended.',
      date: '4 months ago',
      initial: 'R',
      color: 'bg-green-100 text-green-700'
    },
    {
      name: 'Sneha Patel',
      rating: 5,
      text: 'Very professional training. Got my license easily after learning here.',
      date: '3 weeks ago',
      initial: 'S',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      name: 'Arun Singh',
      rating: 5,
      text: 'Amazing experience! The instructor is very knowledgeable and teaching style is really effective. Highly satisfied.',
      date: '2 weeks ago',
      initial: 'A',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      name: 'Neha Verma',
      rating: 5,
      text: 'I was nervous about driving but the instructor made me feel comfortable. Great learning experience.',
      date: '5 months ago',
      initial: 'N',
      color: 'bg-teal-100 text-teal-700'
    },
    {
      name: 'Karan Chauhan',
      rating: 5,
      text: 'Best instructor in the region. Very systematic approach to teaching. Worth every penny.',
      date: '1 month ago',
      initial: 'K',
      color: 'bg-red-100 text-red-700'
    },
    {
      name: 'Sakshi Rana',
      rating: 5,
      text: 'Excellent training facility with dual control car. Feel very safe during practice sessions.',
      date: '6 weeks ago',
      initial: 'S',
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      name: 'Deepak Negi',
      rating: 5,
      text: 'Professional service and excellent RTO test preparation. Cleared both theory and practical in one go.',
      date: '4 weeks ago',
      initial: 'D',
      color: 'bg-cyan-100 text-cyan-700'
    },
    {
      name: 'Anjali Sharma',
      rating: 5,
      text: 'Very patient and understanding instructor. Perfect for ladies who are new to driving.',
      date: '2 months ago',
      initial: 'A',
      color: 'bg-rose-100 text-rose-700'
    },
    {
      name: 'Manish Thakur',
      rating: 5,
      text: 'Great teaching methods and flexible timings. The instructor is very cooperative and helpful.',
      date: '3 months ago',
      initial: 'M',
      color: 'bg-lime-100 text-lime-700'
    },
    {
      name: 'Ritu Kumari',
      rating: 5,
      text: 'Best place to learn driving in Mandi. Very affordable rates and excellent quality of training.',
      date: '1 week ago',
      initial: 'R',
      color: 'bg-fuchsia-100 text-fuchsia-700'
    },
    {
      name: 'Naveen Kumar',
      rating: 5,
      text: 'Highly professional and experienced instructor. Learned all aspects of safe driving thoroughly.',
      date: '5 weeks ago',
      initial: 'N',
      color: 'bg-violet-100 text-violet-700'
    },
    {
      name: 'Pooja Devi',
      rating: 5,
      text: 'Amazing instructor! Very patient and explains everything clearly. Strongly recommend for beginners.',
      date: '2 months ago',
      initial: 'P',
      color: 'bg-amber-100 text-amber-700'
    },
    {
      name: 'Sanjay Chauhan',
      rating: 5,
      text: 'Excellent service! The AC car and dual control system made learning very comfortable.',
      date: '3 weeks ago',
      initial: 'S',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      name: 'Kavita Rana',
      rating: 5,
      text: 'Very good experience. The instructor is very knowledgeable about traffic rules and safe driving.',
      date: '6 months ago',
      initial: 'K',
      color: 'bg-sky-100 text-sky-700'
    },
    {
      name: 'Amit Verma',
      rating: 5,
      text: 'Best driving school in the area. Professional approach and great learning environment.',
      date: '4 months ago',
      initial: 'A',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Simran Kaur',
      rating: 5,
      text: 'Wonderful experience! Very supportive instructor who focuses on building confidence.',
      date: '5 weeks ago',
      initial: 'S',
      color: 'bg-pink-100 text-pink-700'
    },
    {
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Outstanding training quality. The practical sessions are very well structured and effective.',
      date: '2 weeks ago',
      initial: 'R',
      color: 'bg-blue-100 text-blue-700'
    }
  ];

  return (
    <section id="reviews" className="py-16 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Trust Scoreboard (Sticky on Desktop) */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide border border-green-100">
               <CheckCircle2 size={14} /> Verified Reviews
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight">
              Trusted by <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">500+ Students</span>
            </h2>

            {/* The Big Rating Box */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm inline-block w-full lg:w-auto">
               <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                 <FaGoogle className="text-2xl text-gray-600" />
                 <span className="text-sm text-gray-500 font-medium">Average Rating</span>
               </div>
               <div className="flex items-center justify-center lg:justify-start gap-3">
                 <span className="text-5xl font-extrabold text-navy">5.0</span>
                 <div className="flex flex-col items-start">
                   <div className="flex gap-1 text-gold text-lg">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                   </div>
                   <span className="text-xs text-gray-400">Based on 120+ reviews</span>
                 </div>
               </div>
            </div>

            <p className="text-gray-500 text-sm max-w-sm mx-auto lg:mx-0">
               We don't just teach driving; we build confidence. Read what our alumni say about their experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
               <a
                 href="https://www.google.com/maps/place/Raj+%22Ann%22+Raj+Driving+Training+School"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-navy/90 transition shadow-lg shadow-navy/20"
               >
                 <FaGoogle /> Rate Us on Google
               </a>
               {/* Desktop Nav Arrows */}
               <div className="hidden lg:flex gap-2">
                  <button onClick={() => scroll('left')} className="p-3 bg-white border border-gray-200 rounded-xl text-navy hover:bg-gray-50 transition"><ChevronLeft size={20}/></button>
                  <button onClick={() => scroll('right')} className="p-3 bg-white border border-gray-200 rounded-xl text-navy hover:bg-gray-50 transition"><ChevronRight size={20}/></button>
               </div>
            </div>
          </div>

          {/* RIGHT SIDE: Horizontal Scroll Cards */}
          <div className="lg:col-span-8 relative">
            
            {/* Fade Edges for Scroll Hint */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none lg:block hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none lg:block hidden" />

            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-2 px-1"
            >
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="snap-center shrink-0 w-[300px] md:w-[320px] bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col relative group hover:-translate-y-1 transition-transform duration-300"
                >
                  {/* Quote Icon Background */}
                  <div className="absolute top-6 right-6 text-gray-100 group-hover:text-gold/10 transition-colors">
                    <FaQuoteRight size={40} />
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${r.color}`}>
                      {r.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy leading-tight">{r.name}</h4>
                      <div className="flex gap-0.5 text-gold text-xs mt-0.5">
                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    "{r.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs font-medium text-gray-400">{r.date}</span>
                    <div className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                       <CheckCircle2 size={12} /> Student
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Scroll Hint */}
            <div className="text-center text-xs text-gray-400 lg:hidden -mt-4">
               Swipe to see more reviews →
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;