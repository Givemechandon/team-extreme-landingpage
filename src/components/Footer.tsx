import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-extreme-dark border-t border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div>
            <img src={logo} alt="Team Extreme" className="h-14 mb-4" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              A Team Extreme é pura emoção a favor do seu evento.
              Alugamos, levamos e operamos atrações radicais com mais de 30 anos de experiência.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-primary-foreground mb-4">Links Rápidos</h4>
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
                    className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-primary-foreground mb-4">Contato</h4>
            <ul className="space-y-3 text-primary-foreground/60 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:+5511955506239" className="hover:text-accent transition-colors">
                  (11) 95550-6239
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:mario@teamextreme.com.br" className="hover:text-accent transition-colors">
                  mario@teamextreme.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-1" />
                <span>R. José de Oliveira, 1065 – Parque Peruche, São Paulo – SP</span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/teamextremesports"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Instagram className="text-accent" size={18} />
              </a>
              <a
                href="https://web.facebook.com/teamextremesportsmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Facebook className="text-accent" size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground/40 text-sm">
          <p>© {currentYear} Team Extreme. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
