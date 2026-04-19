"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'DASHBOARD', href: '/', icon: 'grid_view' },
    { name: 'MAP', href: '/map', icon: 'explore' },
    { name: 'EXPRESS', href: '/order', icon: 'fastfood' },
    { name: 'HUB', href: '/hub', icon: 'stadium' },
    { name: 'TICKET', href: '/ticket', icon: 'confirmation_number' },
    { name: 'STAFF', href: '/staff', icon: 'admin_panel_settings' },
  ];

  return (
    <aside className="w-64 fixed h-full bg-[#1b1b20]/60 backdrop-blur-xl border-r border-[#44474f]/15 shadow-xl flex flex-col z-50">
       <div className="flex items-center gap-3 p-6 border-b border-[#44474f]/15">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/15 flex items-center justify-center">
             <span className="material-symbols-outlined text-primary font-bold">stadium</span>
          </div>
          <h1 className="font-headline font-bold tracking-tighter uppercase text-xl italic tracking-widest text-primary">TECH</h1>
       </div>
       
       <nav className="flex-1 px-4 py-8 space-y-4">
         {navItems.map((item) => {
           const isActive = pathname === item.href;
           return (
             <Link key={item.name} href={item.href} className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary drop-shadow-[0_0_8px_rgba(173,199,255,0.4)]' : 'text-[#8e9099] hover:bg-surface-container hover:text-white'}`}>
                <span className={`material-symbols-outlined ${isActive ? 'scale-110' : ''}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                <span className="font-label text-xs font-bold uppercase tracking-widest">{item.name}</span>
             </Link>
           );
         })}
       </nav>

       <div className="p-6 border-t border-[#44474f]/15 flex items-center gap-3 hover:bg-surface-container-low transition cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCRFQoQQq2ip8OI7n6EDoAlYTfMQDlVoSj0jIbtV1htE_ab3cgtwvN99RQQr2bMYUEsT8MjEvKl9MwmZahCAuCbWr3sJ327Xd2L7Iv_N41niseSTFFDwDmvGxmBMYM2gVNHCdgnS2WN_31GD02RLbg9vAt2erdVBwJ_ndLqKjNklgEsXcljcemkyEewfbfnDeQfL0chTXR5LcTs8bLnL5d0GwG8nNRxaq-rEDDwfSIx2JuFLyyOmBuVo9VK0zjjuIAXibSoS2wGWA" alt="Alex" className="w-full h-full object-cover"/>
          </div>
          <div>
            <p className="font-headline font-bold text-sm text-on-surface">Alex Mercer</p>
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">VIP Member</p>
          </div>
       </div>
    </aside>
  );
}
