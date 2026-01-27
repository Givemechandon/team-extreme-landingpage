import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#atracoes", label: "Atrações" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-extreme-dark/95 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0">
            <img
              src={logo}
              alt="Team Extreme"
              className="h-40 md:h-48 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-primary-foreground/80 hover:text-accent font-medium transition-colors duration-300 uppercase tracking-wide text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="https://wa.me/5511955506239"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wide hover:bg-extreme-yellow-light transition-all duration-300 hover:scale-105"
          >
            <FaWhatsapp size={18} />
            Solicitar Orçamento
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground p-2"
            aria-label="Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-extreme-dark"
            >
              <ul className="flex flex-col py-4 gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-primary-foreground/80 hover:text-accent hover:bg-primary/10 font-medium transition-colors duration-300 uppercase tracking-wide"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="px-4 pt-2">
                  <a
                    href="https://wa.me/5511955506239"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wide"
                  >
                    <FaWhatsapp size={18} />
                    Solicitar Orçamento
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
