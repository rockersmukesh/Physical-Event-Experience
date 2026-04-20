import VenueIcon from "@/components/VenueIcon";
import { getTicketView } from "@/lib/demo-data";

function formatEventStart(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function TicketData() {
  const ticket = await getTicketView();

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[800px] flex-col items-center p-4 pt-8 sm:p-6 sm:pt-10 lg:p-8 lg:pt-12">
      <header className="mb-8 w-full">
        <h1 className="font-headline text-4xl font-black uppercase text-on-surface">My Ticket</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          {ticket.attendeeName} • {ticket.attendeeEmail}
        </p>
      </header>

      <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-outline-variant/15 bg-[linear-gradient(135deg,_var(--color-surface-container-high),_var(--color-surface-container-lowest))] shadow-2xl">
        <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-primary via-tertiary to-error"></div>

        <div className="border-b border-dashed border-outline-variant/30 p-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-tertiary shadow-[0_0_10px_#abd600]"></span>
            <span className="font-label text-sm font-bold uppercase tracking-widest text-tertiary">
              {ticket.status === "ACTIVE" ? "Valid Ticket" : ticket.status}
            </span>
          </div>
          <h2 className="mb-2 font-headline text-4xl font-black uppercase leading-tight text-[#fff]">
            {ticket.eventName}
          </h2>
          <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
            {formatEventStart(ticket.eventStart)}
          </p>
          <p className="mt-2 text-sm text-on-surface-variant">{ticket.venueName}</p>
        </div>

        <div className="flex justify-between bg-surface-container-lowest p-8 pb-4 text-center">
          <div>
            <p className="mb-1 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Section
            </p>
            <p className="font-headline text-3xl font-black text-on-surface">{ticket.section}</p>
          </div>
          <div>
            <p className="mb-1 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Row
            </p>
            <p className="font-headline text-3xl font-black text-on-surface">{ticket.row}</p>
          </div>
          <div>
            <p className="mb-1 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Seat
            </p>
            <p className="font-headline text-3xl font-black text-on-surface">{ticket.seat}</p>
          </div>
        </div>

        <div className="flex flex-col items-center bg-surface-container-lowest p-8">
          <div className="mb-6 flex h-48 w-48 items-center justify-center rounded-xl bg-white p-2">
            <div className="flex h-full w-full items-center justify-center border-4 border-black bg-[repeating-linear-gradient(45deg,_#000_0,_#000_10px,_#fff_10px,_#fff_20px)] opacity-50">
              <span className="bg-black px-2 py-1 font-bold uppercase tracking-widest text-white">
                {ticket.qrCode}
              </span>
            </div>
          </div>
          <div className="mb-6 w-full rounded-2xl border border-outline-variant/15 bg-surface-container-high p-4 text-sm text-on-surface-variant">
            Gate entry: <span className="font-semibold text-on-surface">{ticket.gate}</span>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded border border-[#333] bg-[#000] py-4 font-label text-sm font-bold uppercase tracking-widest text-[#fff] shadow-xl transition hover:bg-[#111]">
            <VenueIcon name="account_balance_wallet" className="text-[1.2rem]" />
            Added to Apple Wallet
          </button>
        </div>
      </div>
    </main>
  );
}
