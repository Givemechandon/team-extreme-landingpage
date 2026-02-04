import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Shield, Users, CheckCircle } from "lucide-react";
import bungeeJump from "@/assets/gallery/bungee-jump.png";
import bungeeShot from "@/assets/gallery/bungee-shot.png";
import marioPhoto from "@/assets/marioteamextreme.png";

const features = [
  {
    icon: Award,
    title: "Certificação Internacional",
    description: "Operation Master certificado pela A.D.A./U.S.A. desde 1997",
  },
  {
    icon: Shield,
    title: "Segurança Máxima",
    description: "Sistema exclusivo de segurança e manutenção constante",
  },
  {
    icon: Users,
    title: "Equipe Qualificada",
    description: "Profissionais treinados nacionalmente e internacionalmente",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
              Sobre a Team Extreme
            </span>
            <h2 className="section-title text-foreground mb-6">
              Uma Experiência{" "}
              <span className="text-primary">Única</span> Para Seu Evento
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Fundada em 1996, a Team Extreme foi uma das primeiras empresas a introduzir 
              esportes radicais como componente para ações de marketing promocional no mercado nacional.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Com mais de <strong className="text-foreground">30 anos de experiência</strong>, 
              revolucionamos o mercado de promoção, onde sua empresa, marca ou produto 
              está presente em eventos onde o público vivencia muita emoção com inovadoras atrações radicais.
            </p>

            {/* Bungee images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={bungeeJump}
                  alt="Bungee Jump em ação"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={bungeeShot}
                  alt="Bungee Shot em evento"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
              </motion.div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Importante: <strong className="text-foreground">não somos um espaço de locação</strong>. Nós
              <strong className="text-foreground"> alugamos, levamos, montamos e operamos</strong> as atrações
              no seu evento, com equipe especializada e foco total em segurança.
            </p>

            {/* Checkmarks */}
            <ul className="space-y-3 mb-8">
              {[
                "Sistema exclusivo de segurança no País",
                "Profissionais especializados e treinados",
                "Manutenção constante dos equipamentos",
                "Treinamentos nacionais e internacionais",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <CheckCircle className="text-accent flex-shrink-0" size={20} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contato"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-extreme-blue-dark transition-colors duration-300"
            >
              Saiba Mais
            </motion.a>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                className="card-extreme p-6 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2 tracking-widest">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Director highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="bg-primary p-6 md:p-8 rounded-xl text-primary-foreground"
            >
              <p className="text-sm uppercase tracking-wider mb-2 text-primary-foreground/70">Sócio-Diretor</p>
              <p className="font-bold text-xl md:text-2xl mb-4">Mário Mendes</p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mb-4 overflow-hidden rounded-xl flex items-center justify-center bg-primary-foreground/10 p-2"
              >
                <img
                  src={marioPhoto}
                  alt="Mário Mendes - Sócio-Diretor Team Extreme"
                  className="w-full max-h-64 md:max-h-80 object-contain rounded-xl"
                />
              </motion.div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Certificado de Operation Master desde 1997 pela Adrenalin Dream Adventure (A.D.A./U.S.A.)
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
