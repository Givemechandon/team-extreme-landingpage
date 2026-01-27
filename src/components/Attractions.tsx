import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Flame, 
  Wind, 
  Mountain, 
  Waves, 
  TreeDeciduous, 
  Target,
  ArrowUpCircle,
  Gauge,
  Sparkles,
  Zap,
  Cable,
  CircleDot
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

const exclusiveAttractions = [
  { icon: Sparkles, name: "Giro Master", description: "Giros 360° de pura emoção" },
  { icon: Zap, name: "Aero Surf Extreme", description: "Exclusivo balanço radical" },
];

const attractions = [
  { icon: Flame, name: "Bungee Jump", description: "Salto de altura máxima adrenalina" },
  { icon: ArrowUpCircle, name: "Bungee Shot", description: "Catapulta vertical radical" },
  { icon: Target, name: "Bungee Trampolim", description: "Saltos acrobáticos seguros" },
  { icon: Mountain, name: "Parede de Escalada", description: "Escalada com tirolesa integrada" },
  { icon: Cable, name: "Rapel", description: "Descida controlada emocionante" },
  { icon: Wind, name: "Tirolesa", description: "Voo livre sobre o evento" },
  { icon: TreeDeciduous, name: "Arvorismo", description: "Percurso entre obstáculos" },
  { icon: Waves, name: "Surfe Mecânico", description: "Simulador de ondas perfeitas" },
  { icon: CircleDot, name: "Cama Elástica", description: "Saltos para todas as idades" },
  { icon: Gauge, name: "Full Pipe", description: "Manobras radicais no tubo" },
];

const Attractions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="atracoes" className="py-20 md:py-32 bg-extreme-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(204_91%_38%/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Exclusividades (acima) */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-r from-primary/20 to-accent/20 border border-accent/30 rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="text-center mb-10">
            <span className="inline-block text-accent font-bold uppercase tracking-wider text-sm mb-3">
              Exclusividades
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-primary-foreground">
              Destaques <span className="text-accent">Team Extreme</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {exclusiveAttractions.map((item) => (
              <div
                key={item.name}
                className="relative bg-extreme-dark/40 border border-primary/20 rounded-2xl p-6 md:p-8 overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Exclusivo
                </div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="font-display text-2xl md:text-3xl text-primary-foreground mb-3">
                      {item.name === "Aero Surf Extreme" ? (
                        <>
                          Aero Surf <span className="text-accent">Extreme</span>
                        </>
                      ) : (
                        <>
                          Giro <span className="text-accent">Master</span>
                        </>
                      )}
                    </h4>
                    <p className="text-primary-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: item.name === "Aero Surf Extreme" ? 3 : 3.2, repeat: Infinity }}
                    className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0"
                  >
                    <item.icon className="text-accent" size={34} />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent font-bold uppercase tracking-wider text-sm mb-4">
            Nossas Atrações
          </span>
          <h2 className="section-title text-primary-foreground mb-6">
            Qualidade e <span className="text-accent">Inovação</span>
          </h2>
          <p className="section-subtitle text-primary-foreground/70 mx-auto">
            10 atrações radicais para transformar seu evento em uma experiência inesquecível
          </p>
        </motion.div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {attractions.map((attraction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl p-4 text-center cursor-pointer hover:bg-primary/20 hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <attraction.icon className="text-accent" size={24} />
              </div>
              <h3 className="font-bold text-primary-foreground text-sm mb-2 leading-snug line-clamp-1 tracking-widest">
                {attraction.name}
              </h3>
              <p className="text-primary-foreground/60 text-xs leading-snug line-clamp-2">
                {attraction.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/5511955506239"
            className="btn-extreme"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={18} />
            Solicitar Orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Attractions;
