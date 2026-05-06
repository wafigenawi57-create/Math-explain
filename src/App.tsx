import React, { useState } from 'react';
import { mathTopics } from './data/mathTopics';
import { TopicView } from './components/TopicView';
import { 
  Compass, 
  Menu, 
  X, 
  BookOpen, 
  Layers, 
  Cpu, 
  Star,
  ChevronRight,
  TrendingUp,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectedTopic = mathTopics.find(t => t.id === selectedTopicId);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="h-full bg-white border-r border-slate-200 flex flex-col z-20 shadow-xl shadow-slate-200/50 overflow-hidden"
      >
        <div className="p-8 border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900">MATH<span className="text-indigo-600">LAB</span></h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <p className="px-4 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Curriculum Units</p>
          <div className="space-y-1">
            {mathTopics.map((topic, index) => (
              <button
                id={`nav-topic-${topic.id}`}
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                  selectedTopicId === topic.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  selectedTopicId === topic.id ? 'bg-white/20' : 'bg-slate-100 text-slate-400'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-bold truncate text-left flex-1">{topic.title}</span>
                {selectedTopicId === topic.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-slate-50 shrink-0">
          <div className="bg-slate-900 p-5 rounded-[24px] text-white relative overflow-hidden group cursor-pointer" onClick={() => setSelectedTopicId(null)}>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm font-bold">Progress: 64%</p>
              <div className="h-1.5 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-indigo-500 w-[64%]"></div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                id="open-sidebar"
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-200 transition-all active:scale-95"
              >
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
            )}
            <div className="space-y-0.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Learning Portal</h2>
              <p className="text-slate-900 font-bold">
                {selectedTopic ? selectedTopic.title : 'Year 7 Mastery Dashboard'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] block text-slate-400 font-bold uppercase leading-none mb-1">Rank</span>
                  <span className="text-sm font-black text-slate-900 leading-none">Novice Explorer</span>
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {selectedTopic ? (
              <motion.div
                key={selectedTopic.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              >
                <TopicView topic={selectedTopic} />
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-6xl mx-auto space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Hero Card */}
                  <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div className="relative z-10">
                      <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-[10px] font-black rounded-lg uppercase tracking-wider">Top Priority</span>
                      <h2 className="text-4xl font-black mt-6 leading-tight tracking-tighter text-slate-900">Equations &<br/>Variables</h2>
                      <p className="text-slate-500 font-medium mt-4 max-w-sm">Current curriculum focus. Complete these modules to unlock the Year 7 Achievement Badge.</p>
                    </div>
                    <button 
                      onClick={() => setSelectedTopicId(8)}
                      className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black tracking-tight self-start transition-all active:scale-95 shadow-lg shadow-indigo-200 z-10"
                    >
                      Resume Learning
                    </button>
                    <Brain className="absolute -right-6 -top-6 w-48 h-48 text-slate-50 group-hover:text-slate-100 transition-colors pointer-events-none" />
                  </motion.div>

                  {/* Secondary Cards */}
                  <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-300 transition-all" onClick={() => setSelectedTopicId(1)}>
                    <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-4 group-hover:scale-110 transition-transform">
                      {React.createElement(mathTopics[0].icon, { className: "w-7 h-7" })}
                    </div>
                    <h3 className="font-black text-slate-900 uppercase tracking-tight">3D Geometry</h3>
                    <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Unit 01</p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-slate-900 rounded-[32px] p-6 text-white border border-slate-800 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Power Up</p>
                    <h3 className="text-xl font-black leading-tight">Mastery Quizzes</h3>
                    <p className="text-slate-400 text-xs mt-3 leading-relaxed">Test your skills across all 9 core mathematics topics.</p>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                  </motion.div>

                  {/* Dynamic Topic Grid */}
                  {mathTopics.slice(1, 5).map((topic, i) => (
                    <motion.div 
                      key={topic.id}
                      variants={itemVariants}
                      className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm group cursor-pointer hover:shadow-md transition-all active:scale-95"
                      onClick={() => setSelectedTopicId(topic.id)}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                        i % 3 === 0 ? 'bg-emerald-100 text-emerald-600' : 
                        i % 3 === 1 ? 'bg-pink-100 text-pink-600' : 'bg-violet-100 text-violet-600'
                      }`}>
                        {React.createElement(topic.icon, { className: "w-5 h-5" })}
                      </div>
                      <h4 className="font-black text-slate-900 tracking-tight leading-tight">{topic.title}</h4>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Open Unit</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Progress Card */}
                  <motion.div variants={itemVariants} className="md:col-span-2 bg-indigo-50 rounded-[32px] p-8 border border-indigo-100">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-indigo-900 tracking-tight">Curriculum Stats</h3>
                        <p className="text-indigo-600 text-sm font-bold opacity-80 uppercase tracking-widest mt-1">Year-to-date</p>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600">
                        <Star className="w-6 h-6 fill-indigo-600" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-black text-indigo-800 uppercase tracking-tighter">Algebra Mastery</span>
                        <span className="text-xs font-mono font-bold text-indigo-600">82%</span>
                      </div>
                      <div className="h-3 w-full bg-white rounded-full overflow-hidden border border-indigo-100">
                        <div className="h-full bg-indigo-600 w-[82%]"></div>
                      </div>
                      <div className="pt-2 flex gap-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 4 Mastered
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-indigo-400 uppercase">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> 3 In Progress
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Footer Section */}
                <motion.footer variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center bg-white/40 backdrop-blur-sm p-6 rounded-[24px] border border-white gap-4">
                  <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Mastered</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> In Progress</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Locked</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 tracking-tight">
                    Primary Resources: <span className="text-slate-900 font-black px-1.5 py-0.5 bg-white rounded-md border border-slate-200 ml-1">Learner's Book</span> <span className="text-slate-900 font-black px-1.5 py-0.5 bg-white rounded-md border border-slate-200 ml-1">Workbook</span>
                  </div>
                </motion.footer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
