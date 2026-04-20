import VenueIcon from "@/components/VenueIcon";

export default function StaffDashboard() {
  return (
    <main className="max-w-[1600px] mx-auto p-8 h-screen flex flex-col pt-12">
      <header className="mb-8 flex justify-between items-center">
        <div>
           <p className="font-label text-error tracking-widest uppercase text-sm mb-1 font-bold">Admin Privileges</p>
           <h1 className="font-headline text-4xl font-black uppercase text-on-surface">Staff Operations</h1>
        </div>
        <div className="bg-error/10 border border-error/30 text-error px-4 py-2 rounded font-label text-sm uppercase font-black tracking-widest flex items-center gap-2">
            <VenueIcon name="admin_panel_settings" className="text-[1.2rem]" />
            Access Level: Supervisor
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-6">
                <h3 className="font-headline text-xl font-bold uppercase mb-4 text-on-surface flex items-center gap-2">
                   <VenueIcon name="broadcast_on_personal" className="text-primary text-xl" />
                   Broadcast Alert
                </h3>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 mb-4">
                   <textarea className="w-full bg-transparent border-none text-on-surface focus:ring-0 resize-none font-body text-sm" rows={3} placeholder="Type a message to push to all attendee devices..."></textarea>
                </div>
                <div className="flex gap-4">
                   <button className="bg-error text-on-error font-label uppercase font-black px-6 py-2 rounded hover:opacity-90 transition shadow-lg flex-1">Issue Critical Alert</button>
                   <button className="bg-primary/20 text-primary border border-primary/40 font-label uppercase font-bold px-6 py-2 rounded hover:bg-primary/30 transition flex-1">Send Standard Notice</button>
                </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-6">
                <h3 className="font-headline text-xl font-bold uppercase mb-4 text-on-surface">Active Operations</h3>
                <table className="w-full text-left font-body text-sm">
                   <thead>
                      <tr className="border-b border-outline-variant/20 text-on-surface-variant font-label uppercase tracking-widest text-xs">
                         <th className="pb-3">Sector</th>
                         <th className="pb-3">Status</th>
                         <th className="pb-3">Issue</th>
                         <th className="pb-3 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr className="border-b border-outline-variant/10">
                         <td className="py-4 font-bold text-on-surface">South Gate Exits</td>
                         <td className="py-4"><span className="text-error font-bold font-label uppercase text-xs">Severe Congestion</span></td>
                         <td className="py-4 text-on-surface-variant">Exit volume exceeds capacity.</td>
                         <td className="py-4 text-right"><button className="text-primary font-bold hover:underline">Reroute Fans</button></td>
                      </tr>
                      <tr className="border-b border-outline-variant/10">
                         <td className="py-4 font-bold text-on-surface">Concession C (Level 2)</td>
                         <td className="py-4"><span className="text-tertiary font-bold font-label uppercase text-xs">Clearing</span></td>
                         <td className="py-4 text-on-surface-variant">Order backlog resolving.</td>
                         <td className="py-4 text-right"><button className="text-outline-variant font-bold">Monitor</button></td>
                      </tr>
                   </tbody>
                </table>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-6">
                <h3 className="font-headline text-lg font-bold uppercase mb-4 text-on-surface text-center">Crowd Density</h3>
                <div className="relative w-full aspect-square bg-surface-container-lowest border border-outline-variant/20 rounded-[100px] flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-surface-container-highest)_0%,_transparent_70%)]"></div>
                   <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] border-4 border-error rounded-[100px] opacity-20"></div>
                   <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-error rounded-[100px] blur-[30px] opacity-40 mix-blend-screen"></div>
                   <div className="z-10 text-center">
                       <span className="font-headline font-black text-6xl text-error drop-shadow-xl">84%</span>
                       <p className="font-label uppercase text-xs tracking-widest font-bold text-error mt-2">Peak Capacity</p>
                   </div>
                </div>
            </div>
         </div>
      </div>
    </main>
  );
}
