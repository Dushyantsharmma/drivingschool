import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Trophy,
  RotateCcw,
  Play,
  ChevronRight,
  ChevronLeft,
  HelpCircle
} from 'lucide-react';

const MockTest = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // Valid JS array initialization
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [testComplete, setTestComplete] = useState(false);

  const questions = [
    {
      q: "What is the minimum age to get a learner's license for a car?",
      options: ['16 years', '18 years', '21 years', '25 years'],
      correct: 1
    },
    {
      q: 'What does a red traffic light mean?',
      options: ['Go', 'Stop', 'Slow down', 'Caution'],
      correct: 1
    },
    {
      q: 'What is the maximum speed limit in a residential area?',
      options: ['30 km/h', '40 km/h', '50 km/h', '60 km/h'],
      correct: 0
    },
    {
      q: 'When should you use the horn?',
      options: ['At night', 'In silence zones', 'To alert others of danger', 'Always'],
      correct: 2
    },
    {
      q: 'What does a yellow traffic light indicate?',
      options: ['Speed up', 'Stop if safe', 'Go faster', 'Turn right'],
      correct: 1
    },
    {
      q: 'What is the drink-driving alcohol limit in India?',
      options: ['30 mg/100ml', '0 mg/100ml', '50 mg/100ml', '100 mg/100ml'],
      correct: 0
    },
    {
      q: 'Which side of the road should you drive on in India?',
      options: ['Right', 'Left', 'Middle', 'Either'],
      correct: 1
    },
    {
      q: 'What should you do at a zebra crossing?',
      options: ['Speed up', 'Honk', 'Give way to pedestrians', 'Ignore it'],
      correct: 2
    },
    {
      q: 'What does a triangular road sign indicate?',
      options: ['Mandatory', 'Warning', 'Information', 'Prohibition'],
      correct: 1
    },
    {
      q: 'When must you use seat belts?',
      options: ['On highways only', 'In cities only', 'Always', 'Never'],
      correct: 2
    }
  ];

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !testComplete) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !testComplete) {
      finishTest();
    }
  }, [timeLeft, testStarted, testComplete]);

  const startTest = () => {
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(1200);
    setTestComplete(false);
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishTest = () => {
    setTestComplete(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) score++;
    });
    return score;
  };

  const getGrade = (score) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { grade: 'Excellent!', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'Very Good!', color: 'text-green-500' };
    if (percentage >= 60) return { grade: 'Passed', color: 'text-blue-600' };
    return { grade: 'Needs Practice', color: 'text-red-600' };
  };

  // --- START SCREEN ---
  if (!testStarted) {
    return (
      <section className="py-12 bg-gray-50 flex items-center justify-center">
        <div className="max-w-3xl w-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-[#0f172a] p-8 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <HelpCircle size={32} className="text-[#fbbf24]" />
                 </div>
                 <h2 className="text-3xl font-bold mb-2">RTO Mock Test</h2>
                 <p className="text-gray-300">Test your driving knowledge before the real exam.</p>
               </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                 <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-[#0f172a]"><Clock size={20} /></div>
                    <div>
                       <h4 className="font-bold text-[#0f172a] text-sm">20 Minutes</h4>
                       <p className="text-xs text-gray-500">Time limit</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-[#0f172a]"><CheckCircle2 size={20} /></div>
                    <div>
                       <h4 className="font-bold text-[#0f172a] text-sm">10 Questions</h4>
                       <p className="text-xs text-gray-500">Single choice</p>
                    </div>
                 </div>
              </div>

              <button
                onClick={startTest}
                className="w-full bg-[#fbbf24] hover:bg-yellow-400 text-[#0f172a] font-bold py-4 rounded-xl text-lg shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Play size={20} fill="currentColor" /> Start Test Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // --- RESULT SCREEN ---
  if (testComplete) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const { grade, color } = getGrade(score);

    return (
      <section className="py-12 bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl w-full px-4">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Score Header */}
            <div className="bg-[#0f172a] p-8 text-white text-center">
              <div className="w-20 h-20 bg-[#fbbf24] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/30">
                <Trophy size={40} className="text-[#0f172a]" />
              </div>
              <h2 className="text-2xl font-bold mb-1">Test Completed!</h2>
              <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/10 mt-2`}>
                {grade}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              <div className="p-6 text-center">
                 <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Score</p>
                 <p className={`text-3xl font-extrabold ${color}`}>{score}/{questions.length}</p>
              </div>
              <div className="p-6 text-center">
                 <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Accuracy</p>
                 <p className="text-3xl font-extrabold text-[#0f172a]">{percentage}%</p>
              </div>
              <div className="p-6 text-center">
                 <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Time</p>
                 <p className="text-3xl font-extrabold text-[#0f172a]">{formatTime(1200 - timeLeft)}</p>
              </div>
            </div>

            {/* Answer Review */}
            <div className="p-8 bg-gray-50/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#0f172a]">Detailed Review</h3>
                <button onClick={startTest} className="text-sm font-semibold text-[#fbbf24] hover:text-[#0f172a] flex items-center gap-1 transition-colors">
                  <RotateCcw size={14} /> Retake Test
                </button>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {questions.map((q, i) => {
                  const userAnswer = answers[i];
                  const hasAnswered = userAnswer !== undefined;
                  const isCorrect = hasAnswered && userAnswer === q.correct;
                  
                  return (
                    <div key={i} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                      <div className="flex gap-3">
                         <span className={`font-bold text-sm mt-0.5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                           {i + 1}.
                         </span>
                         <div>
                           <p className="font-medium text-[#0f172a] text-sm mb-2">{q.q}</p>
                           <p className={`text-xs flex items-center gap-1 ${isCorrect ? 'text-green-600 font-bold' : 'text-red-500'}`}>
                             {isCorrect ? <CheckCircle2 size={12}/> : <XCircle size={12}/>} 
                             Your Answer: {hasAnswered ? q.options[userAnswer] : 'Time out / Skipped'}
                           </p>
                           {!isCorrect && (
                             <p className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1">
                               <CheckCircle2 size={12}/> Correct: {q.options[q.correct]}
                             </p>
                           )}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 text-center bg-white">
               <button
                  onClick={startTest}
                  className="bg-[#0f172a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0f172a]/90 transition-all flex items-center gap-2 mx-auto"
               >
                 <RotateCcw size={18} /> Retake Test
               </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // --- TEST IN PROGRESS ---
  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <section id="mock-test" className="py-12 bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
           <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">
             Question {currentQuestion + 1} <span className="text-gray-300">/ {questions.length}</span>
           </span>
           <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
             <Clock size={16} /> {formatTime(timeLeft)}
           </div>
        </div>

        <AnimatePresence mode="wait">
            <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-gray-100">
                <motion.div 
                className="h-full bg-[#fbbf24]"
                initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
            </div>

            <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] mb-8 leading-snug">
                {question.q}
                </h3>

                {/* Grid Layout for Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`relative p-4 rounded-xl text-left border-2 transition-all duration-200 group ${
                        selectedAnswer === index 
                        ? 'border-[#fbbf24] bg-yellow-500/5 shadow-md' 
                        : 'border-gray-100 hover:border-yellow-500/50 hover:bg-gray-50'
                    }`}
                    >
                    <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                        selectedAnswer === index ? 'bg-[#fbbf24] border-[#fbbf24] text-[#0f172a]' : 'bg-white border-gray-200 text-gray-400 group-hover:border-[#fbbf24]'
                        }`}>
                        {String.fromCharCode(65 + index)}
                        </div>
                        <span className={`text-sm font-medium ${selectedAnswer === index ? 'text-[#0f172a]' : 'text-gray-600'}`}>
                        {option}
                        </span>
                    </div>
                    </button>
                ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="bg-gray-50 p-4 px-8 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                    className="text-gray-400 hover:text-[#0f172a] font-bold text-sm disabled:opacity-30 flex items-center gap-1 transition-colors"
                >
                    <ChevronLeft size={16} /> Previous
                </button>
                
                <button
                    onClick={nextQuestion}
                    // Prevent moving forward if no answer selected
                    disabled={selectedAnswer === undefined}
                    className="bg-[#0f172a] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:shadow-none hover:bg-[#0f172a]/90 transition-all flex items-center gap-2"
                >
                    {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                    {currentQuestion !== questions.length - 1 && <ChevronRight size={16} />}
                </button>
            </div>
            </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MockTest;