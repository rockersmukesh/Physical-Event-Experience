export default function InteractiveVenueMap() {
  return (
    <main className="max-w-[1600px] mx-auto p-8 h-screen flex flex-col pt-12">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-headline text-4xl font-black uppercase text-on-surface">Interactive Map</h1>
        
        {/* Desktop Filter Chips */}
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full font-label text-sm uppercase font-bold text-on-surface hover:bg-surface-container-highest transition">All</button>
          <button className="px-6 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full font-label text-sm uppercase font-bold text-on-surface hover:bg-surface-container-highest transition"><span className="material-symbols-outlined text-[1rem] align-text-bottom mr-1">fastfood</span> Concessions</button>
          <button className="px-6 py-2 bg-primary text-on-primary border border-primary rounded-full font-label text-sm uppercase font-black hover:opacity-90 shadow-[0_0_15px_rgba(173,199,255,0.4)] transition"><span className="material-symbols-outlined text-[1rem] align-text-bottom mr-1">wc</span> Restrooms</button>
          <button className="px-6 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full font-label text-sm uppercase font-bold text-on-surface hover:bg-surface-container-highest transition"><span className="material-symbols-outlined text-[1rem] align-text-bottom mr-1">exit_to_app</span> Exits</button>
        </div>
      </header>
      
      {/* Map Area */}
      <div className="flex-1 relative rounded-2xl bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-2xl flex">
         
         {/* Map Simulation Background */}
         <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--color-surface-container-high)_0%,_var(--color-background)_100%)]">
            <div className="absolute inset-0 border-[1px] border-outline-variant/10 rounded-[100px] m-16"></div>
            <div className="absolute inset-0 border-[2px] border-outline-variant/20 rounded-[80px] m-32"></div>
            
            {/* User Location Ping */}
            <div className="absolute top-[60%] left-[45%]">
               <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_var(--color-primary)] z-10 relative"></div>
               <div className="absolute top-[-10px] left-[-10px] w-9 h-9 border border-primary rounded-full animate-ping opacity-70"></div>
            </div>

            {/* Interest Points */}
            <div className="absolute top-[25%] left-[20%] bg-surface-container-highest border border-outline-variant/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg backdrop-blur cursor-pointer hover:border-tertiary transition">
               <span className="font-headline text-tertiary font-black text-sm">2 MIN</span>
               <span className="font-body text-xs text-on-surface">Restroom North</span>
            </div>

            <div className="absolute top-[70%] left-[70%] bg-surface-container-highest border border-outline-variant/30 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg backdrop-blur cursor-pointer hover:border-error transition">
               <span className="font-headline text-error font-black text-sm">18 MIN</span>
               <span className="font-body text-xs text-on-surface">Merch Stand</span>
            </div>
         </div>

         {/* Right Sidebar - Desktop Map Overlay Panels */}
         <div className="w-80 border-l border-outline-variant/20 bg-surface-container-low/80 backdrop-blur-md p-6 overflow-y-auto">
            <h3 className="font-headline text-sm font-bold uppercase text-on-surface-variant mb-4">Live Alerts</h3>
            
            <div className="space-y-4">
               <div className="bg-surface-container-lowest border border-error/40 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-error shadow-[0_0_8px_var(--color-error)]"></div>
                  <h4 className="font-label text-sm font-bold text-on-surface mb-1 flex items-center gap-1.5"><span className="material-symbols-outlined text-[1rem] text-error">warning</span> Avoid South Corridor</h4>
                  <p className="font-body text-xs text-on-surface-variant">Severe congestion due to spill. Recommended to use Sector C escalators.</p>
                  <button className="mt-3 text-xs font-label uppercase font-bold text-error hover:text-white transition">Reroute Me &rarr;</button>
               </div>

               <div className="bg-surface-container-lowest border border-tertiary/40 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary shadow-[0_0_8px_var(--color-tertiary)]"></div>
                  <h4 className="font-label text-sm font-bold text-on-surface mb-1 flex items-center gap-1.5"><span className="material-symbols-outlined text-[1rem] text-tertiary">stadium</span> VIP Entry Open</h4>
                  <p className="font-body text-xs text-on-surface-variant">Gate A VIP lanes are now fully open with zero wait.</p>
               </div>
            </div>
         </div>

      </div>
    </main>
  );
}
