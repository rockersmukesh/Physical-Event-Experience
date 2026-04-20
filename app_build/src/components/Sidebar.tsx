"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import VenueIcon, { type IconName } from './VenueIcon';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems: { name: string; href: string; icon: IconName }[] = [
    { name: 'DASHBOARD', href: '/', icon: 'grid_view' },
    { name: 'MAP', href: '/map', icon: 'explore' },
    { name: 'EXPRESS', href: '/order', icon: 'fastfood' },
    { name: 'HUB', href: '/hub', icon: 'stadium' },
    { name: 'TICKET', href: '/ticket', icon: 'confirmation_number' },
    { name: 'STAFF', href: '/staff', icon: 'admin_panel_settings' },
  ];

  return (
    <aside className="fixed z-50 flex h-full w-64 flex-col border-r border-[#44474f]/15 bg-[#14141a]/72 shadow-xl backdrop-blur-xl">
       <div className="border-b border-[#44474f]/15 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/15 bg-surface-container-high overflow-hidden">
             <VenueIcon name="stadium" className="text-primary text-[1.4rem]" />
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.35em] text-on-surface-variant">
                Venue OS
              </p>
              <h1 className="font-headline text-xl font-bold uppercase tracking-[0.25em] text-primary">
                Pulse
              </h1>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/15 bg-primary/8 p-4">
            <p className="font-label text-[10px] uppercase tracking-[0.35em] text-on-surface-variant">
              Event readiness
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="font-headline text-3xl font-black text-on-surface">78%</p>
                <p className="text-xs text-on-surface-variant">concourse occupancy</p>
              </div>
              <span className="rounded-full border border-tertiary/25 bg-tertiary/10 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.25em] text-tertiary">
                Stable
              </span>
            </div>
          </div>
       </div>
       
       <nav className="flex-1 space-y-4 px-4 py-8">
         {navItems.map((item) => {
           const isActive = pathname === item.href;
           return (
             <Link key={item.name} href={item.href} className={`flex items-center gap-4 rounded-xl p-3 transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary drop-shadow-[0_0_8px_rgba(173,199,255,0.4)]' : 'text-[#8e9099] hover:bg-surface-container hover:text-white'}`}>
                <VenueIcon
                  name={item.icon}
                  className={isActive ? 'scale-110 text-[1.2rem]' : 'text-[1.2rem]'}
                />
                <span className="font-label text-xs font-bold uppercase tracking-widest">{item.name}</span>
             </Link>
           );
         })}
       </nav>

       <div className="flex cursor-pointer items-center gap-3 border-t border-[#44474f]/15 p-6 transition hover:bg-surface-container-low">
          <div className="h-10 w-10 rounded-full bg-surface-container-high overflow-hidden">
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
