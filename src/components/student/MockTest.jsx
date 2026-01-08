import { useState, useEffect, useRef } from 'react';
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
  HelpCircle,
  Award,
  Download,
  ShieldAlert,
  Signal,
  Gauge,
  Eye,
  ArrowLeft
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { QUESTION_BANK } from '../../data/mockTestQuestions';

const MockTest = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [detailsFilled, setDetailsFilled] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); 
  const [timeLeft, setTimeLeft] = useState(1200); 
  const [testComplete, setTestComplete] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  
  const certificateRef = useRef(null);

  // Reset all test-related state to initial values
  const resetTestState = () => {
    setDetailsFilled(false);
    setTestStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(1200);
    setTestComplete(false);
    setReviewMode(false);
  };

  // Helper: Shuffle Array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const startTestSetup = (level) => {
    // Ensure previous test/result state doesn't leak into new test
    resetTestState();
    setSelectedLevel(level);
    const levelQuestions = QUESTION_BANK[level] || QUESTION_BANK.medium;
    // Pick random 20
    const shuffled = shuffleArray([...levelQuestions]).slice(0, 20);
    setQuestions(shuffled);
  };

  const proceedToTest = () => {
    if (!studentName.trim()) return;
    setDetailsFilled(true);
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(1200);
    setTestComplete(false);
  };

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !testComplete) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !testComplete) {
      finishTest();
    }
  }, [timeLeft, testStarted, testComplete]);

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

  const getResult = (score) => {
    const passed = score >= 14; // 70% of 20 = 14
    if (passed) {
      if (score >= 18) return { grade: 'Excellent!', color: 'text-green-600', passed: true, msg: "You're fully ready for the RTO test." };
      return { grade: 'Passed', color: 'text-blue-600', passed: true, msg: "Good job! A little more practice will help." };
    }
    return { grade: 'Failed', color: 'text-red-600', passed: false, msg: "Practice required. Please study the signs again." };
  };

  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = `RajAnnRaj_Certificate_${studentName.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  // --- 1. LEVEL SELECTION ---
  if (!selectedLevel) {
    return (
      <div className="p-4 md:p-8 bg-[#EFEDE0] flex items-center justify-center min-h-[500px]">
        <div className="max-w-4xl w-full text-center">
            <div className="mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Trophy size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Select Difficulty</h2>
                <p className="text-slate-500">Choose a level to start your RTO Mock Test</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { id: 'easy', title: 'Easy', icon: Signal, color: 'bg-green-500' },
                    { id: 'medium', title: 'Medium', icon: ShieldAlert, color: 'bg-amber-500' },
                    { id: 'hard', title: 'Difficult', icon: Gauge, color: 'bg-red-500' }
                ].map((level) => (
                    <button
                        key={level.id}
                        onClick={() => startTestSetup(level.id)}
                        className="group relative overflow-hidden rounded-2xl border-2 border-slate-100 hover:border-blue-500 p-8 transition-all hover:shadow-xl text-left"
                    >
                        <div className={`w-12 h-12 ${level.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                            <level.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{level.title}</h3>
                        <p className="text-sm text-slate-500">20 Questions • 20 Mins</p>
                    </button>
                ))}
            </div>
        </div>
      </div>
    );
  }

  // --- 2. STUDENT DETAILS ---
  if (!detailsFilled) {
    return (
      <div className="p-4 md:p-8 bg-[#EFEDE0] flex items-center justify-center min-h-[500px]">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl"
        >
          <div className="text-center mb-6">
             <div className="w-16 h-16 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-slate-900/20">
                <HelpCircle size={32} className="text-[#fbbf24]" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900">Enter Your Details</h3>
             <p className="text-slate-500 text-sm mt-1">This name will appear on your certificate</p>
          </div>

          <div className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input
                    type="text"
                    placeholder="e.g. Rahul Verma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent transition-all"
                />
            </div>

            <button
                disabled={!studentName.trim()}
                onClick={proceedToTest}
                className="w-full bg-[#fbbf24] text-[#0f172a] font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-4"
            >
                Start Mock Test <ChevronRight size={18} />
            </button>
            
            <button 
              onClick={() => { resetTestState(); setSelectedLevel(null); }}
                className="w-full text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
            >
                Back to Difficulty Selection
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- 3. TEST IN PROGRESS ---
  if (!testComplete) {
    const question = questions[currentQuestion];
    const selectedAnswer = answers[currentQuestion];

    return (
      <div id="mock-test" className="p-4 md:p-8 bg-[#EFEDE0] flex items-center justify-center min-h-[600px]">
        <div className="max-w-3xl w-full">
          
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">
                    {selectedLevel}
                </span>
                <span className="text-sm font-bold text-slate-400">
                    Q {currentQuestion + 1} / {questions.length}
                </span>
             </div>
             <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
               <Clock size={16} /> {formatTime(timeLeft)}
             </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 absolute top-0 left-0">
                <motion.div 
                    className="h-full bg-[#fbbf24]"
                    initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
            </div>

            <div className="p-6 md:p-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-snug">
                {question.q}
                </h3>

                {question.image && (
                    <div className="mb-8 flex justify-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <img
                            src={question.image.startsWith('/') ? `${import.meta.env.BASE_URL}${question.image.substring(1)}` : question.image}
                            alt="Traffic sign"
                            className="h-40 w-auto object-contain drop-shadow-md"
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => selectAnswer(index)}
                        className={`relative p-4 rounded-xl text-left border-2 transition-all duration-200 group ${
                            selectedAnswer === index 
                            ? 'border-[#fbbf24] bg-yellow-500/5 shadow-md' 
                            : 'border-slate-100 hover:border-yellow-500/50 hover:bg-slate-50'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                                selectedAnswer === index ? 'bg-[#fbbf24] border-[#fbbf24] text-[#0f172a]' : 'bg-white border-slate-200 text-slate-400 group-hover:border-[#fbbf24]'
                            }`}>
                                {String.fromCharCode(65 + index)}
                            </div>
                            <span className={`text-sm font-medium ${selectedAnswer === index ? 'text-slate-900' : 'text-slate-600'}`}>
                                {option}
                            </span>
                        </div>
                    </button>
                ))}
                </div>
            </div>

            <div className="bg-slate-50 p-4 px-8 border-t border-slate-100 flex justify-between items-center">
                <button
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                    className="text-slate-400 hover:text-slate-900 font-bold text-sm disabled:opacity-30 flex items-center gap-1 transition-colors"
                >
                    <ChevronLeft size={16} /> Previous
                </button>
                
                <button
                    onClick={nextQuestion}
                    disabled={selectedAnswer === undefined}
                    className="bg-[#0f172a] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:shadow-none hover:bg-[#0f172a]/90 transition-all flex items-center gap-2"
                >
                    {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next'}
                    {currentQuestion !== questions.length - 1 && <ChevronRight size={16} />}
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- REVIEW MODE ---
  if (reviewMode) {
    return (
      <div className="p-4 md:p-8 bg-[#EFEDE0] flex flex-col items-center min-h-screen">
        <div className="max-w-3xl w-full">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setReviewMode(false)}
              className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={20} /> Back to Result
            </button>
            <h2 className="text-2xl font-bold text-slate-900">Review Answers</h2>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const userAnswer = answers[qIndex];
              const isCorrect = userAnswer === q.correct;

              return (
                <div key={qIndex} className={`bg-white rounded-2xl p-6 border-2 ${isCorrect ? 'border-green-100' : 'border-red-100'} shadow-sm`}>
                  <div className="flex gap-4">
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      {qIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-4">{q.q}</h3>
                      
                      {q.image && (
                        <div className="mb-4 bg-slate-50 p-4 rounded-xl inline-block border border-slate-100">
                          <img src={q.image.startsWith('/') ? `${import.meta.env.BASE_URL}${q.image.substring(1)}` : q.image} className="h-24 w-auto object-contain" alt="Sign" />
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-3">
                        {q.options.map((opt, oIndex) => {
                          const isSelected = userAnswer === oIndex;
                          const isTheCorrectOption = q.correct === oIndex;
                          
                          let style = "border-slate-100 text-slate-500 bg-slate-50/50";
                          if (isTheCorrectOption) style = "border-green-500 bg-green-50 text-green-700 font-bold";
                          else if (isSelected && !isCorrect) style = "border-red-500 bg-red-50 text-red-700 font-bold";
                          
                          return (
                            <div key={oIndex} className={`px-4 py-2 rounded-lg border text-sm flex items-center justify-between ${style}`}>
                              <span>{opt}</span>
                              {isTheCorrectOption && <CheckCircle2 size={16} />}
                              {isSelected && !isTheCorrectOption && <XCircle size={16} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
           <div className="py-8 text-center">
             <button 
              onClick={() => setReviewMode(false)}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all"
             >
               Back to Result
             </button>
           </div>
        </div>
      </div>
    );
  }

  // --- 4. RESULT SCREEN ---
  const score = calculateScore();
  const result = getResult(score);

  return (
    <div className="p-4 md:p-8 bg-[#EFEDE0] flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-[#EFEDE0] rounded-3xl shadow-xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-[#0f172a] p-8 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}>
                    {result.passed ? <Trophy size={40} className="text-white" /> : <ShieldAlert size={40} className="text-white" />}
                </div>
                <h2 className="text-3xl font-bold mb-2">{result.passed ? 'Test Passed!' : 'Test Failed'}</h2>
                <p className="text-slate-300 max-w-lg mx-auto">{result.msg}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
            <div className="p-6 text-center">
               <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Score</p>
               <p className={`text-3xl font-extrabold ${result.color}`}>{score}/20</p>
            </div>
            <div className="p-6 text-center">
               <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Result</p>
               <div className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {result.grade}
               </div>
            </div>
            <div className="p-6 text-center">
               <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Pass Mark</p>
               <p className="text-3xl font-extrabold text-slate-900">14</p>
            </div>
          </div>

          {/* --- CERTIFICATE SECTION --- */}
          {result.passed && (
             <div className="p-8 bg-slate-50 border-b border-slate-100 flex flex-col items-center">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="text-amber-500" /> Your Certificate
                </h3>
                
                {/* Certificate Preview Element */}
                <div 
                    ref={certificateRef}
                    className="w-full max-w-2xl bg-[#EFEDE0] p-10 py-12 rounded-xl border-4 border-double border-amber-200 text-center shadow-sm mx-auto relative overflow-hidden"
                >
                    {/* Watermark/BG */}
                    <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                        <img src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`} className="w-96 grayscale" />
                    </div>

                    <div className="relative z-10">
                        <img src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`} className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-sm rounded-full" />
                        
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-1">Certificate of Completion</h2>
                        <div className="h-1 w-24 bg-amber-400 mx-auto mb-6"></div>
                        
                        <p className="text-slate-500 mb-2 italic">This is to certify that</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 font-serif border-b border-slate-200 inline-block px-8 pb-1">
                            {studentName}
                        </h3>
                        
                        <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
                            Has successfully passed the <strong className="text-slate-900">RTO Mock Test ({selectedLevel} Level)</strong> prescribed by <br/>Raj Ann Raj Driving School.
                        </p>

                        <div className="mt-8 flex justify-center gap-12 text-left">
                           <div>
                              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Score</p>
                              <p className="text-xl font-bold text-slate-900">{score} / 20</p>
                           </div>
                           <div>
                              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Date</p>
                              <p className="text-xl font-bold text-slate-900">{new Date().toLocaleDateString()}</p>
                           </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100">
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Raj Ann Raj Driving Training School, Mandi (H.P.)</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={downloadCertificate}
                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold shadow-lg shadow-slate-900/20"
                >
                    <Download size={18} /> Download Certificate
                </button>
             </div>
          )}

          {/* Action Footer */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-center gap-4 bg-[#EFEDE0]">
            <button 
                onClick={() => setReviewMode(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 rounded-xl hover:border-[#fbbf24] hover:text-[#fbbf24] hover:bg-yellow-50 font-bold transition-all"
            >
                <Eye size={18} /> Review Answers
            </button>
             <button
               onClick={() => { resetTestState(); setSelectedLevel(null); }}
               className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 font-bold transition-all"
             >
               <RotateCcw size={18} /> Take Another Test
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MockTest;