"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LiveEventHub() {
  const [score] = useState({ home: 82, away: 78 });
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePoll, setActivePoll] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/hub')
      .then(res => res.json())
      .then(data => {
         setFeed(data);
         setLoading(false);
      });
  }, []);

  const handleVote = (pollId: string, option: string) => {
    setActivePoll(option);
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto p-8 h-screen flex flex-col pt-12"
    >
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-black uppercase text-on-surface">Live Hub</h1>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden pb-4">
        
        {/* Left: Scoreboard */}
        <section className="lg:col-span-1 flex flex-col gap-6">
           <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-[linear-gradient(135deg,_var(--color-surface-container-high),_var(--color-surface-container-lowest))] border border-outline-variant/15 rounded-2xl overflow-hidden shadow-2xl p-8 relative"
           >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-error"></div>
              
              <div className="flex justify-between items-center mb-6">
                 <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Quarter 4</span>
                 <span className="bg-error/20 text-error font-label text-[10px] uppercase font-black tracking-wider px-3 py-1 rounded-full animate-pulse border border-error/50">12:05</span>
              </div>

              <div className="flex justify-between items-center mb-8">
                 <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container-lowest border-2 border-primary mx-auto mb-3 flex items-center justify-center">
                       <span className="font-headline font-black text-xl text-primary">H</span>
                    </div>
                    <h3 className="font-headline text-sm font-bold text-on-surface mb-1">HOME</h3>
                 </div>
                 
                 <div className="flex gap-4 items-center">
                    <span className="font-headline text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(173,199,255,0.4)]">{score.home}</span>
                    <span className="font-headline text-2xl font-black text-on-surface-variant">-</span>
                    <span className="font-headline text-5xl font-black text-on-surface">{score.away}</span>
                 </div>

                 <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container-lowest border-2 border-outline-variant/50 mx-auto mb-3 flex items-center justify-center">
                       <span className="font-headline font-black text-xl text-on-surface-variant">A</span>
                    </div>
                    <h3 className="font-headline text-sm font-bold text-on-surface mb-1">AWAY</h3>
                 </div>
              </div>

              {/* Match Stats */}
              <div className="space-y-4 border-t border-outline-variant/20 pt-6">
                 <div>
                    <div className="flex justify-between text-xs font-label uppercase font-bold text-on-surface-variant mb-1">
                      <span>Possession</span>
                      <span className="text-primary">62%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-lowest rounded overflow-hidden">
                       <motion.div initial={{width: 0}} animate={{width: '62%'}} transition={{duration: 1}} className="h-full bg-primary"></motion.div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Right: Live Feed (Scrollable) */}
        <section className="lg:col-span-2 flex flex-col bg-surface-container-low border border-outline-variant/15 rounded-2xl overflow-hidden shadow-xl">
           <div className="p-6 border-b border-outline-variant/15 bg-surface-container-highest flex justify-between items-center z-20 relative">
              <h3 className="font-headline text-lg font-bold uppercase text-on-surface">Live Play-by-Play</h3>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_var(--color-tertiary)] animate-pulse"></span>
                 <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">DB Synced</span>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-8 relative">
              {/* Timeline Line */}
              <div className="absolute left-[59px] top-8 bottom-8 w-[2px] bg-outline-variant/20 -z-10"></div>

              <div className="space-y-8">
                 {loading ? (
                    <div className="text-center font-label text-on-surface-variant uppercase tracking-widest mt-12">Connecting to MySQL...</div>
                 ) : (
                   feed.map((item, i) => (
                     <motion.div 
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.1 }}
                       key={item.id} 
                       className="relative z-10 flex gap-6 group"
                     >
                        <div className="flex flex-col items-center">
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-surface-container-low shadow-sm z-10 ${
                              item.type === 'poll' ? 'bg-error text-on-error-container' : 
                              item.type === 'update' ? 'bg-tertiary text-on-tertiary' : 
                              'bg-primary text-on-primary'
                           }`}>
                              <span className="material-symbols-outlined text-[1.25rem]">{item.icon}</span>
                           </div>
                        </div>
                        
                        <div className="flex-1 bg-surface-container-lowest border border-outline-variant/15 p-5 rounded-xl group-hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                             <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">{item.type}</span>
                             <span className="font-label text-xs text-on-surface-variant font-medium">Just now</span>
                          </div>
                          <p className="font-body text-base text-on-surface leading-relaxed">{item.text}</p>
                          
                          {item.type === 'poll' && (
                             <div className="mt-5 grid grid-cols-2 gap-4">
                                <motion.button 
                                   whileTap={{ scale: 0.95 }}
                                   onClick={() => handleVote(item.id, 'A')}
                                   className={`border rounded-lg py-3 font-label text-sm font-bold tracking-widest flex justify-between px-4 transition ${activePoll === 'A' ? 'bg-primary/20 text-primary border-primary shadow-[inset_0_0_15px_rgba(173,199,255,0.2)]' : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border-outline-variant/20'}`}
                                >
                                   Player A 
                                   {activePoll && <span className="text-on-surface-variant ml-2">45%</span>}
                                </motion.button>
                                <motion.button 
                                   whileTap={{ scale: 0.95 }}
                                   onClick={() => handleVote(item.id, 'B')}
                                   className={`border rounded-lg py-3 font-label text-sm font-bold tracking-widest flex justify-between px-4 transition ${activePoll === 'B' ? 'bg-primary/20 text-primary border-primary shadow-[inset_0_0_15px_rgba(173,199,255,0.2)]' : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border-outline-variant/20'}`}
                                >
                                   Player B 
                                   {activePoll && <span className="text-primary ml-2">55%</span>}
                                </motion.button>
                             </div>
                          )}
                        </div>
                     </motion.div>
                   ))
                 )}
              </div>
           </div>
        </section>

      </div>
    </motion.main>
  );
}
