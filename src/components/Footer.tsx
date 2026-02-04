import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0370b9] border-t border-primary/20 text-white font-bold">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div>
            <img src={logo} alt="Team Extreme" className="h-28 md:h-32 mb-4" />
            <p className="text-white text-sm leading-relaxed font-bold">
              A Team Extreme é pura emoção a favor do seu evento.
              Alugamos, levamos e operamos atrações radicais com mais de 30 anos de experiência.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-white mb-4 font-bold">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#inicio", label: "Início" },
                { href: "#sobre", label: "Sobre" },
                { href: "#atracoes", label: "Atrações" },
                { href: "#galeria", label: "Galeria" },
                { href: "#contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white hover:text-accent transition-colors text-sm font-bold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-white mb-4 font-bold">
              Contato
            </h4>
            <ul className="space-y-3 text-white text-sm font-bold">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-white" />
                <a
                  href="tel:+5511955506239"
                  className="hover:text-accent transition-colors"
                >
                  (11) 95550-6239
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-white" />
                <a
                  href="mailto:mario@teamextreme.com.br"
                  className="hover:text-accent transition-colors"
                >
                  mario@teamextreme.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-white flex-shrink-0 mt-1" />
                <span>
                  R. José de Oliveira, 1065 – Parque Peruche, São Paulo – SP
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/teamextremesports"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-accent/30 transition-colors"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a
                href="https://web.facebook.com/teamextremesportsmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-accent/30 transition-colors"
              >
                <Facebook size={18} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-white text-sm font-bold">
          <p>© {currentYear} Team Extreme. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
