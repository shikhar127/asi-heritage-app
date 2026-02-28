import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Monuments from "./pages/Monuments";
import MonumentDetail from "./pages/MonumentDetail";
import MyTickets from "./pages/MyTickets";

export default function App() {
  return (
    <BrowserRouter basename="/asi-heritage-app">
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monuments" element={<Monuments />} />
            <Route path="/monument/:id" element={<MonumentDetail />} />
            <Route path="/my-tickets" element={<MyTickets />} />
          </Routes>
        </main>
        <footer className="bg-stone-900 text-stone-400 text-xs text-center py-6 mt-12 no-print">
          <p className="mb-1">ASI Heritage — Unofficial companion app for Archaeological Survey of India ticketing</p>
          <p>Official booking at <a href="https://asi.payumoney.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">asi.payumoney.com</a> · Prices approximate, may vary</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
