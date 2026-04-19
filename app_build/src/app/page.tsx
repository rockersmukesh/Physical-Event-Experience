import Link from 'next/link';

export default function SmartDashboard() {
  return (
    <main className="max-w-[1600px] mx-auto p-8 space-y-8">
      {/* Header */}
      <section className="flex justify-between items-end">
        <div>
          <p className="font-label text-primary tracking-widest uppercase text-sm mb-2">Welcome Back</p>
          <h2 className="font-headline text-5xl font-black uppercase text-on-surface">Alex Mercer</h2>
        </div>
        <div className="bg-surface-container-low px-5 py-3 rounded border border-outline-variant/15 flex items-center gap-3">
          <span className="material-symbols-outlined text-tertiary">stadium</span>
          <span className="font-label uppercase text-on-surface-variant font-bold">Gate Entry: Sector B</span>
        </div>
      </section>

      {/* Main Grid: 3 Columns on very large screens, 2 on regular desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Focus: Ticket & Live Status */}
        <section className="xl:col-span-2 space-y-6">
           <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/15 p-8 min-h-[350px] flex flex-col justify-end shadow-2xl">
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC0PXiqm4yzgr0vyWcGlXD0ZxliCslWPln28puZ4e-gkVlwM69xYB7oJZMCjhj5Slr4a33M7I2mSSQ9e5S5K98oTbek_Px3VSwd4R77dtntatd5h71i-5xepHBCxO_L01W6QaebZO5j9eEba68924wYzqMb1IK6p9pOgHiT2pmKzi7AyBwAx9jz7lNq9Go1HgQNyvvckaP_Ss-3imvC6WJ7ZkLF4Hm9fjtWN7Q8iUahbrc-uY3yJUVSwCK9LLLvZhz3puUOHmJ_x0" alt="Stadium" className="w-full h-full object-cover opacity-40 mix-blend-screen"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-row justify-between items-end gap-6">
                 <div>
                    <div className="flex items-center gap-2 mb-4">
                       <span className="w-3 h-3 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_#abd600]"></span>
                       <span className="font-label text-tertiary text-sm tracking-widest uppercase font-bold">Live Event</span>
                    </div>
                    <h3 className="font-headline text-5xl font-black uppercase leading-tight mb-2 text-[#fff]">Championship<br/>Finals</h3>
                    <p className="font-body text-on-surface-variant text-lg">Section 114 • Row G • Seat 23</p>
                 </div>
                 <div className="bg-surface-variant/60 backdrop-blur-[20px] p-6 rounded-lg border border-outline-variant/15 flex flex-col items-center min-w-[200px]">
                    <span className="font-label text-on-surface-variant text-xs uppercase tracking-widest mb-2 font-bold">Kickoff In</span>
                    <div className="font-label text-4xl text-primary font-bold">02:14:59</div>
                    <Link href="/ticket" className="mt-6 w-full bg-primary text-on-primary font-label uppercase text-sm py-3 px-4 rounded font-bold tracking-widest hover:opacity-90 transition-opacity text-center block">View My Ticket</Link>
                 </div>
              </div>
           </div>

           {/* Smart Routines horizontally adjacent for desktop */}
           <div className="bg-surface-container-low rounded-xl border border-outline-variant/15 p-6 space-y-4">
               <h3 className="font-headline text-xl font-bold uppercase flex items-center gap-2 text-on-surface">
                 <span className="material-symbols-outlined text-primary text-xl">bolt</span>
                 Smart Routines
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <Link href="/order" className="bg-surface-container-lowest border border-outline-variant/15 rounded-lg p-5 flex items-center justify-between hover:bg-surface-container-highest transition-colors cursor-pointer group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/15 group-hover:border-primary/50 transition-colors">
                           <span className="material-symbols-outlined text-primary">fastfood</span>
                        </div>
                        <div>
                           <h4 className="font-body font-semibold text-on-surface text-lg">Burger Stand C</h4>
                           <p className="font-label text-xs text-on-surface-variant tracking-wider uppercase mt-1">Nearest Food</p>
                        </div>
                     </div>
                     <div className="text-right flex flex-col items-end">
                        <div className="bg-surface-container-high px-3 py-1 rounded flex items-center gap-2 mb-2 border border-outline-variant/15">
                           <span className="material-symbols-outlined text-tertiary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
                           <span className="font-label text-sm text-tertiary font-bold">4 MIN</span>
                        </div>
                        <span className="font-body text-xs text-on-surface-variant">Level 1 • Aisle 4</span>
                     </div>
                  </Link>

                  <Link href="/map" className="bg-surface-container-lowest border border-outline-variant/15 rounded-lg p-5 flex items-center justify-between hover:bg-surface-container-highest transition-colors cursor-pointer group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/15 group-hover:border-error/50 transition-colors">
                           <span className="material-symbols-outlined text-primary">wc</span>
                        </div>
                        <div>
                           <h4 className="font-body font-semibold text-on-surface text-lg">Restrooms East</h4>
                           <p className="font-label text-xs text-on-surface-variant tracking-wider uppercase mt-1">Nearest Facility</p>
                        </div>
                     </div>
                     <div className="text-right flex flex-col items-end">
                        <div className="bg-surface-container-high px-3 py-1 rounded flex items-center gap-2 mb-2 border border-[#93000a]">
                           <span className="material-symbols-outlined text-error text-sm" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
                           <span className="font-label text-sm text-error font-bold">12 MIN</span>
                        </div>
                        <span className="font-body text-xs text-[#ffb4ab]">Level 2 • Aisle 8</span>
                     </div>
                  </Link>
               </div>
           </div>
        </section>

        {/* Right Sidebar Area (Desktop Specific) */}
        <section className="space-y-6">
           {/* Concourse Traffic Heatmap */}
           <div className="bg-surface-container-low rounded-xl border border-outline-variant/15 p-6 flex flex-col relative overflow-hidden min-h-[250px]">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-50 shadow-[0_0_12px_rgba(173,199,255,0.8)]"></div>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-headline text-xl font-bold uppercase text-on-surface">Concourse Traffic</h3>
                 <span className="material-symbols-outlined text-primary">sensors</span>
              </div>
              <div className="w-full h-[120px] relative rounded-lg overflow-hidden bg-surface-container-lowest border border-outline-variant/15 flex items-center justify-center mb-4">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__aLmt76nt5cREmLw2iQhPJPSLsUs6aiZXUvF58FAvBxFZI-uA8kPuw2jNBE2dhHuMLJrC41lzbi-xPAEofjRqYO-3-vDJPpYi9LlkejV4R0H1w5pDsLwkFp7knsHpo9SUlcOrb67U99biLymQFW5o7bDz-Ip5oaW5VrBY3k4jkbOIc69rSDrV7PQIQFWiGQPUq58vge5M6oVpwlJ1n-qY-0nEhlzfFyeOR333lNApp270j7qcuiQITYOo2ulB8GLEjAUT15y904" alt="Heatmap" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"/>
                 <div className="absolute inset-0 bg-gradient-to-tr from-surface/90 to-transparent"></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <span className="font-headline text-5xl text-error font-black drop-shadow-md">78%</span>
                    <span className="font-label text-xs uppercase tracking-widest text-[#ffdad6] mt-1 font-bold">High Density</span>
                 </div>
              </div>
              <div className="flex justify-between font-label text-sm text-on-surface-variant font-bold mt-auto">
                 <span>West Gate: <span className="text-error">Busy</span></span>
                 <span>East Gate: <span className="text-tertiary">Clear</span></span>
              </div>
           </div>

           {/* Logistics Widget (Weather/Transit - Created for Desktop) */}
           <div className="bg-surface-container-low rounded-xl border border-outline-variant/15 p-6 space-y-4">
              <h3 className="font-headline text-lg font-bold uppercase text-on-surface flex items-center gap-2">
                 <span className="material-symbols-outlined text-on-surface-variant text-xl">directions_car</span>
                 Logistics
              </h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded border border-outline-variant/15">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">partly_cloudy_day</span>
                        <span className="font-body text-sm font-semibold text-on-surface">Weather (Stadium Open)</span>
                    </div>
                    <span className="font-label font-bold text-primary">72°F</span>
                 </div>
                 <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded border border-outline-variant/15">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-error">local_parking</span>
                        <span className="font-body text-sm font-semibold text-on-surface">Premium Lot B</span>
                    </div>
                    <span className="font-label font-bold text-error">FULL</span>
                 </div>
                 <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded border border-outline-variant/15">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-tertiary">train</span>
                        <span className="font-body text-sm font-semibold text-on-surface">Metro Red Line</span>
                     </div>
                    <span className="font-label font-bold text-tertiary">On Time</span>
                 </div>
              </div>
           </div>

           {/* Mini Live Feed Preview (Desktop Specific) */}
           <div className="bg-surface-container-low rounded-xl border border-outline-variant/15 p-6 h-[250px] flex flex-col relative overflow-hidden">
             <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-tertiary shadow-[0_0_12px_rgba(171,214,0,0.8)]"></div>
             <h3 className="font-headline text-lg font-bold uppercase text-on-surface flex justify-between items-center mb-4">
                Latest from the Hub
                <Link href="/hub" className="text-xs text-primary font-body hover:underline flex items-center">Open <span className="material-symbols-outlined text-sm ml-1">open_in_new</span></Link>
             </h3>
             <ul className="space-y-4 overflow-y-auto hide-scrollbar flex-1 pr-2">
                <li className="border-l-2 border-primary pl-3 pb-1">
                   <p className="font-label text-xs text-primary font-bold uppercase tracking-wider mb-1">2 Min Ago</p>
                   <p className="font-body text-sm text-on-surface leading-tight">Mercer intercepts at the 40-yard line!</p>
                </li>
                <li className="border-l-2 border-outline-variant pl-3 pb-1 opacity-70 hover:opacity-100 transition-opacity">
                   <p className="font-label text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1">8 Min Ago</p>
                   <p className="font-body text-sm text-on-surface leading-tight">Timeout called by the Home Team.</p>
                </li>
             </ul>
           </div>
        </section>

      </div>
    </main>
  );
}
