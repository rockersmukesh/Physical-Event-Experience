import Link from 'next/link';

export default function TicketData() {
   return (
      <main className="max-w-[800px] mx-auto p-8 h-screen flex flex-col pt-12 items-center">
         <header className="mb-8 w-full">
            <h1 className="font-headline text-4xl font-black uppercase text-on-surface">My Ticket</h1>
         </header>

         <div className="bg-[linear-gradient(135deg,_var(--color-surface-container-high),_var(--color-surface-container-lowest))] border border-outline-variant/15 rounded-3xl overflow-hidden shadow-2xl w-full max-w-md relative flex flex-col">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-tertiary to-error"></div>

            <div className="p-8 text-center border-b border-dashed border-outline-variant/30">
               <div className="flex justify-center items-center gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_10px_#abd600]"></span>
                  <span className="font-label text-tertiary text-sm tracking-widest uppercase font-bold">Valid Ticket</span>
               </div>
               <h2 className="font-headline text-4xl font-black uppercase leading-tight mb-2 text-[#fff]">Championship<br />Finals</h2>
               <p className="font-label text-on-surface-variant text-sm uppercase tracking-widest">October 24, 2026 &bull; 7:30 PM</p>
            </div>

            <div className="p-8 pb-4 flex justify-between text-center bg-surface-container-lowest">
               <div>
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-1">Section</p>
                  <p className="font-headline text-3xl font-black text-on-surface">114</p>
               </div>
               <div>
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-1">Row</p>
                  <p className="font-headline text-3xl font-black text-on-surface">G</p>
               </div>
               <div>
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-1">Seat</p>
                  <p className="font-headline text-3xl font-black text-on-surface">23</p>
               </div>
            </div>

            <div className="p-8 bg-surface-container-lowest flex flex-col items-center">
               <div className="w-48 h-48 bg-white rounded-xl mb-6 flex items-center justify-center p-2">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full bg-[repeating-linear-gradient(45deg,_#000_0,_#000_10px,_#fff_10px,_#fff_20px)] opacity-50 flex items-center justify-center border-4 border-black">
                     <span className="bg-black text-white px-2 py-1 font-bold tracking-widest uppercase">SCAN AT GATE B</span>
                  </div>
               </div>
               <button className="w-full bg-[#000] text-[#fff] border border-[#333] hover:bg-[#111] font-label uppercase text-sm py-4 rounded font-bold tracking-widest flex justify-center items-center gap-2 transition shadow-xl">
                  <span className="material-symbols-outlined text-[1.2rem]">account_balance_wallet</span>
                  Added to Apple Wallet
               </button>
            </div>
         </div>
      </main>
   );
}
