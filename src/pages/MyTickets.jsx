import { useState, useEffect } from "react";
import { MONUMENTS } from "../data/monuments";

const STORAGE_KEY = "asi_tickets";

function getTickets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTickets(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function TicketPDF({ ticket, onClose }) {
  const monument = MONUMENTS.find((m) => m.id === ticket.monumentId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Ticket Design - printable */}
        <div id="ticket-print-area" className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b-2 border-orange-200 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🏛️</div>
            <div>
              <p className="text-xs font-bold text-orange-600 tracking-widest uppercase">Archaeological Survey of India</p>
              <p className="font-bold text-stone-900 text-lg">{monument?.name || ticket.monumentName}</p>
            </div>
          </div>

          {/* Booking Ref */}
          <div className="bg-stone-50 rounded-xl p-4 mb-4 border border-stone-200">
            <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Booking Reference</p>
            <p className="font-mono text-xl font-bold text-stone-900 tracking-widest">{ticket.bookingRef}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Visitor Name</p>
              <p className="font-semibold text-stone-800">{ticket.visitorName}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Visit Date</p>
              <p className="font-semibold text-stone-800">{ticket.visitDate}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Nationality</p>
              <p className="font-semibold text-stone-800">{ticket.nationality}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Visitors</p>
              <p className="font-semibold text-stone-800">{ticket.adults} Adult{ticket.adults > 1 ? "s" : ""}{ticket.children > 0 ? `, ${ticket.children} Child` : ""}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Monument</p>
              <p className="font-semibold text-stone-800">{monument?.city || ""}, {monument?.state || ""}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wide mb-0.5">Amount Paid</p>
              <p className="font-bold text-orange-600 text-base">₹{ticket.totalAmount}</p>
            </div>
          </div>

          {ticket.timeSlot && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 text-sm">
              <span className="text-orange-700 font-medium">⏰ Time Slot: {ticket.timeSlot}</span>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-700 mb-4">
            ⚠️ Carry a valid photo ID. This summary is for reference — your official ASI e-ticket was sent to your registered email.
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-100">
            <span>Booked on {new Date(ticket.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span>asi.payumoney.com</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
          >
            🖨️ Print / Save as PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyTickets() {
  const [tickets, setTickets] = useState(getTickets);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [form, setForm] = useState({
    monumentId: "",
    monumentName: "",
    bookingRef: "",
    visitorName: "",
    visitDate: "",
    nationality: "Indian Citizen",
    adults: 1,
    children: 0,
    totalAmount: "",
    timeSlot: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (name === "monumentId") {
      const m = MONUMENTS.find((mon) => mon.id === value);
      if (m) setForm((f) => ({ ...f, monumentId: value, monumentName: m.name }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newTicket = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    saveTickets(updated);
    setShowForm(false);
    setForm({ monumentId: "", monumentName: "", bookingRef: "", visitorName: "", visitDate: "", nationality: "Indian Citizen", adults: 1, children: 0, totalAmount: "", timeSlot: "" });
  };

  const handleDelete = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    saveTickets(updated);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {selectedTicket && <TicketPDF ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">My Tickets</h1>
          <p className="text-stone-500 text-sm mt-1">Save booking references and download PDF summaries</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
        >
          + Add Booking
        </button>
      </div>

      {/* Add Booking Form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-white border border-stone-200 rounded-xl p-5 mb-6 shadow-sm">
          <h2 className="font-semibold text-stone-900 mb-4">Add Booking Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Monument</label>
              <select name="monumentId" value={form.monumentId} onChange={handleChange} required className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none bg-white">
                <option value="">Select monument...</option>
                {MONUMENTS.map((m) => <option key={m.id} value={m.id}>{m.name} – {m.city}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Booking Reference</label>
              <input name="bookingRef" value={form.bookingRef} onChange={handleChange} required placeholder="e.g. ASI20241201XYZ" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Visitor Name</label>
              <input name="visitorName" value={form.visitorName} onChange={handleChange} required placeholder="Lead visitor name" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Visit Date</label>
              <input type="date" name="visitDate" value={form.visitDate} onChange={handleChange} required className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Nationality</label>
              <select name="nationality" value={form.nationality} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none bg-white">
                <option>Indian Citizen</option>
                <option>SAARC/BIMSTEC National</option>
                <option>Foreign National</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Adults</label>
              <input type="number" name="adults" value={form.adults} onChange={handleChange} min="1" max="20" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Children</label>
              <input type="number" name="children" value={form.children} onChange={handleChange} min="0" max="20" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Amount Paid (₹)</label>
              <input type="number" name="totalAmount" value={form.totalAmount} onChange={handleChange} placeholder="e.g. 200" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Time Slot (optional)</label>
              <input name="timeSlot" value={form.timeSlot} onChange={handleChange} placeholder="e.g. 10:00 AM – 12:00 PM" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">Save Ticket</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 text-sm">Cancel</button>
          </div>
        </form>
      )}

      {/* Tickets List */}
      {tickets.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-5xl mb-4">🎫</p>
          <p className="text-lg font-medium text-stone-600">No tickets saved yet</p>
          <p className="text-sm mt-1 mb-6">After booking on the ASI portal, add your booking reference here to generate a PDF summary</p>
          <button onClick={() => setShowForm(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            + Add Your First Booking
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const monument = MONUMENTS.find((m) => m.id === ticket.monumentId);
            return (
              <div key={ticket.id} className="bg-white border border-stone-200 rounded-xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={monument?.image}
                    alt={monument?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://placehold.co/48x48/d4c7b0/4a382b?text=ASI"; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm truncate">{ticket.monumentName || monument?.name}</p>
                  <p className="text-stone-500 text-xs">{ticket.visitDate} · {ticket.nationality}</p>
                  <p className="text-stone-400 text-xs font-mono mt-0.5">{ticket.bookingRef}</p>
                </div>
                <div className="text-right shrink-0">
                  {ticket.totalAmount && <p className="font-bold text-orange-600 text-base">₹{ticket.totalAmount}</p>}
                  <p className="text-stone-500 text-xs">{ticket.adults}A{ticket.children > 0 ? ` ${ticket.children}C` : ""}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    title="View & Print PDF"
                    className="p-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors text-sm"
                  >
                    📥
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    title="Delete"
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <p className="font-semibold mb-1">How to get your official e-ticket PDF</p>
        <p>After booking on the ASI portal, your e-ticket is sent to your registered email. Download the PDF from the email. Use this page to save a reference copy and print a summary.</p>
      </div>
    </div>
  );
}
