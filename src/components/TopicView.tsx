import React from 'react';
import Markdown from 'react-markdown';
import { Topic } from '../data/mathTopics';
import { Quiz } from './Quiz';
import { Calculator, HelpCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface TopicViewProps {
  topic: Topic;
}

export const TopicView: React.FC<TopicViewProps> = ({ topic }) => {
  return (
    <div id={`topic-${topic.id}`} className="max-w-5xl mx-auto space-y-8 pb-20">
      <header className="space-y-6">
        <div className="flex items-center gap-5 translate-x-[-4px]">
          <div className="w-16 h-16 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600">
            {React.createElement(topic.icon, { className: "w-8 h-8" })}
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">{topic.title}</h2>
            <p className="text-slate-500 font-medium uppercase tracking-[0.1em] text-xs mt-1">Mastery Path / Unit {topic.id}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div id="explanation-card" className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-8 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
              <BookOpen className="w-4 h-4" />
              <span>Core Knowledge</span>
            </div>
            <div id="math-content" className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight prose-strong:text-indigo-600 prose-code:bg-slate-50 prose-code:text-indigo-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none font-medium">
              <Markdown>{topic.content}</Markdown>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
              {React.createElement(topic.icon, { className: "w-40 h-40" })}
            </div>
          </div>

          <div id="quiz-section-header" className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 tracking-tight">Interactive Assessment</h3>
          </div>
          <Quiz questions={topic.quiz} topicTitle={topic.title} />
        </div>

        <aside className="space-y-8">
          <div id="formulae-card" className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl shadow-slate-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8 font-black uppercase tracking-[0.2em] text-[10px] text-indigo-400">
                <Calculator className="w-4 h-4" />
                <span>Reference Guide</span>
              </div>
              <div className="space-y-8">
                {topic.formulae.map((f, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.name}</p>
                    <div className="bg-white/5 p-4 rounded-2xl font-mono text-sm leading-relaxed border border-white/5 text-indigo-100">
                      {f.formula}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="p-8 bg-indigo-50 rounded-[32px] border border-indigo-100 flex flex-col gap-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
              <Star className="w-4 h-4 fill-indigo-600" />
            </div>
            <div>
              <h5 className="font-black text-indigo-900 tracking-tight mb-2 uppercase text-xs tracking-widest">Growth Mindset</h5>
              <p className="text-sm text-indigo-700/80 leading-relaxed font-semibold italic">
                "Visualization is the key to mathematical intuition. Try to see the numbers as shapes moving in space."
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
