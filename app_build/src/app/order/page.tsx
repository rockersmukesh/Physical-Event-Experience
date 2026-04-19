"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpressOrder() {
  const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number}[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
         setMenu(data);
         setLoading(false);
      });
  }, []);

  const addToCart = (item: any) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    
    setToast(`Added ${item.name} to cart!`);
    setTimeout(() => setToast(null), 2000);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto p-8 h-screen flex flex-col pt-12 relative"
    >
      <header className="mb-8">
        <p className="font-label text-primary tracking-widest uppercase text-sm mb-1">Section 114 Concessions</p>
        <h1 className="font-headline text-4xl font-black uppercase text-on-surface">Express Order</h1>
      </header>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="absolute top-10 left-1/2 z-50 bg-primary text-on-primary font-label font-bold px-6 py-3 rounded-full shadow-[0_5px_20px_rgba(173,199,255,0.4)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-hidden pb-4">
        
        {/* Left: Menu & Categories */}
        <section className="lg:col-span-2 xl:col-span-3 flex flex-col bg-surface-container-low border border-outline-variant/15 rounded-2xl overflow-hidden shadow-xl">
           <div className="flex border-b border-outline-variant/15 px-6 pt-4 gap-6 bg-surface-container-highest">
              <button className="font-label uppercase text-sm font-bold text-primary border-b-2 border-primary pb-3 transition-colors">All Items</button>
              <button className="font-label uppercase text-sm font-bold text-on-surface-variant hover:text-on-surface pb-3 transition-colors">Food</button>
              <button className="font-label uppercase text-sm font-bold text-on-surface-variant hover:text-on-surface pb-3 transition-colors">Drinks</button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                 <div className="col-span-2 text-center py-20 font-label text-on-surface-variant uppercase tracking-widest">Loading MySQL Database...</div>
              ) : (
                menu.map((item) => (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={item.id} 
                    className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 hover:border-primary/40 transition group flex justify-between items-center cursor-pointer"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/15 text-primary group-hover:bg-primary/10 transition">
                           <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div>
                           <h4 className="font-body font-semibold text-lg text-on-surface">{item.name}</h4>
                           <p className="font-label text-xs text-tertiary tracking-wider uppercase mt-1">Ready in {item.prepTime}</p>
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-3">
                        <span className="font-headline font-black text-on-surface">${item.price.toFixed(2)}</span>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="bg-surface-variant text-on-surface hover:bg-primary hover:text-on-primary font-label text-xs font-bold uppercase rounded-full px-4 py-1.5 transition whitespace-nowrap">Add +</button>
                     </div>
                  </motion.div>
                ))
              )}
           </div>
        </section>

        {/* Right: Checkout Sidebar */}
        <section className="flex flex-col bg-surface-container-low border border-outline-variant/15 rounded-2xl overflow-hidden shadow-xl">
           <div className="p-6 border-b border-outline-variant/15 bg-surface-container-highest flex justify-between items-center">
              <h3 className="font-headline text-lg font-bold uppercase text-on-surface">Your Cart</h3>
              <motion.span 
                 key={cart.length}
                 initial={{ scale: 1.5, rotate: -10 }}
                 animate={{ scale: 1, rotate: 0 }}
                 className="bg-primary/20 text-primary font-label text-xs uppercase font-bold px-3 py-1 rounded-full inline-block"
              >
                 {cart.length} Items
              </motion.span>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                  {cart.length === 0 ? (
                     <motion.div exit={{opacity: 0}} className="h-full flex flex-col items-center justify-center text-on-surface-variant opacity-60">
                        <span className="material-symbols-outlined text-4xl mb-2">shopping_basket</span>
                        <p className="font-headline text-sm uppercase">Cart is empty</p>
                     </motion.div>
                  ) : (
                    cart.map(item => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={item.id} 
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-body font-semibold text-on-surface text-sm">{item.name}</p>
                          <p className="font-label text-xs text-on-surface-variant mt-0.5">Qty: {item.qty}</p>
                        </div>
                        <p className="font-headline font-bold text-on-surface">${(item.price * item.qty).toFixed(2)}</p>
                      </motion.div>
                    ))
                  )}
              </AnimatePresence>
           </div>

           <div className="p-6 border-t border-outline-variant/15 bg-surface-container-lowest pb-[80px] lg:pb-6">
              <div className="flex justify-between items-center mb-4">
                 <span className="font-headline text-sm font-bold text-on-surface-variant uppercase">Total</span>
                 <motion.span 
                   key={total}
                   initial={{ scale: 1.2, color: "var(--color-primary)" }}
                   animate={{ scale: 1, color: "var(--color-on-surface)" }}
                   className="font-headline text-2xl font-black"
                 >
                   ${total.toFixed(2)}
                 </motion.span>
              </div>
              <motion.button 
                 whileHover={cart.length > 0 ? { scale: 1.02 } : {}}
                 whileTap={cart.length > 0 ? { scale: 0.98 } : {}}
                 disabled={cart.length === 0} 
                 className={`w-full py-4 rounded-xl font-label text-sm font-black uppercase tracking-widest transition-all ${cart.length > 0 ? "bg-primary text-on-primary hover:opacity-90 shadow-[0_0_20px_rgba(173,199,255,0.3)]" : "bg-surface-variant text-on-surface-variant cursor-not-allowed"}`}
              >
                 Checkout
              </motion.button>
           </div>
        </section>

      </div>
    </motion.main>
  );
}
