import { Link } from "wouter";
import { Menu, Search } from "lucide-react";

export function Header() {
  return (
    <header className="w-full h-[70px] bg-[#1351B4] text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/govbr-logo.webp" alt="GOV.BR" className="h-12" />
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-white/80 transition-colors">Início</Link>
          <a href="#" className="hover:text-white/80 transition-colors">Serviços</a>
          <a href="#" className="hover:text-white/80 transition-colors">Consultas</a>
          <a href="#" className="hover:text-white/80 transition-colors">Atendimento</a>
          <a href="#" className="hover:text-white/80 transition-colors">Contato</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
