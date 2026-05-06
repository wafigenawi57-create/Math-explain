import React, { useState } from 'react';
import { mathTopics, Topic, Question } from '../data/mathTopics';
import { CheckCircle, XCircle, ChevronRight, Calculator, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizProps {
  questions: Question[];
  topicTitle: string;
}

export const Quiz: React.FC<QuizProps> = ({ questions, topicTitle }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const currentQuestion = questions[currentStep];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setInputValue('');
    } else {
      setShowResults(true);
    }
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answer });
    setTimeout(handleNext, 1000);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
        score++;
      }
    });
    return score;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div id="quiz-results" className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-2 mt-4">Unit Mastery Summary</h3>
        <p className="text-slate-500 mb-8 font-bold uppercase tracking-widest text-xs">You scored {score} / {questions.length} on {topicTitle}</p>
        <button
          id="retry-quiz"
          onClick={() => {
            setShowResults(false);
            setCurrentStep(0);
            setUserAnswers({});
          }}
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black tracking-tight hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
        >
          Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div id="quiz-container" className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm min-h-[450px] flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-10 relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Live Assessment</span>
          <p className="text-xs font-bold text-slate-400 uppercase">Question {currentStep + 1} of {questions.length}</p>
        </div>
        <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 relative z-10"
        >
          <h4 className="text-2xl font-black text-slate-900 mb-10 tracking-tight leading-tight">{currentQuestion.question}</h4>

          {currentQuestion.type === 'multiple-choice' ? (
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options?.map((option) => {
                const isSelected = userAnswers[currentQuestion.id] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`p-6 text-left rounded-2xl border-2 transition-all font-bold tracking-tight ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                id="short-answer-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex. 4.6"
                className="w-full p-6 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 focus:outline-none transition-all text-xl font-bold text-slate-900"
              />
              <button
                id="submit-short-answer"
                onClick={() => handleAnswer(inputValue)}
                className="w-full bg-indigo-600 text-white p-6 rounded-2xl font-black tracking-tight hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
              >
                Confirm Answer
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {userAnswers[currentQuestion.id] && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className={`mt-10 p-6 rounded-[24px] flex items-start gap-4 border relative z-10 ${
            userAnswers[currentQuestion.id].toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()
              ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
              : 'bg-rose-50 text-rose-800 border-rose-100'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
             userAnswers[currentQuestion.id].toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-rose-100 text-rose-600'
          }`}>
            {userAnswers[currentQuestion.id].toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim() ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
          </div>
          <div>
            <p className="font-black uppercase tracking-widest text-[10px] mb-1 opacity-60">
              {userAnswers[currentQuestion.id].toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim() ? 'Goal Achieved' : 'Review Required'}
            </p>
            <p className="text-sm font-bold leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        </motion.div>
      )}
      
      <div className="absolute top-12 right-12 font-mono text-slate-50 text-9xl pointer-events-none select-none italic font-black opacity-[0.03]">?</div>
    </div>
  );
};
