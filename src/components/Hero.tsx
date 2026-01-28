import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, Users } from "lucide-react";
import heroVideo from "@/assets/IMG_7877.mp4";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover contrast-110"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-80" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full border border-accent/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full border border-primary/10 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full mb-8 border border-accent/30"
          >
            <Zap size={18} className="animate-pulse" />
            <span className="font-semibold text-sm uppercase tracking-widest">+30 anos de experiência</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-7xl lg:text-8xl text-primary-foreground uppercase leading-tight md:leading-none mb-6 px-2">
            Locações{" "}
            <span className="text-accent">Radicais</span>
            <br />
            Para Seu Evento
          </h1>

          {/* Subtitle */}
          <p className="text-primary-foreground/90 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed px-2">
            Transforme seu evento corporativo em uma experiência inesquecível com
            equipamentos de alta qualidade e uma equipe altamente qualificada.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 px-2">
            <motion.a
              href="https://wa.me/5511955506239"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-extreme animate-pulse-glow text-sm sm:text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Zap size={20} />
              Quero locar equipamentos para meu evento!
            </motion.a>
            <motion.a
              href="#atracoes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-extreme-outline"
            >
              Ver Atrações
            </motion.a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto px-2"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="text-accent" size={20} />
                <span className="font-display text-3xl md:text-4xl text-primary-foreground">12+</span>
              </div>
              <span className="text-primary-foreground/60 text-sm uppercase tracking-wider">Atrações</span>
            </div>
            <div className="text-center border-x border-primary-foreground/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="text-accent" size={20} />
                <span className="font-display text-3xl md:text-4xl text-primary-foreground">100%</span>
              </div>
              <span className="text-primary-foreground/60 text-sm uppercase tracking-wider">Segurança</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="text-accent" size={20} />
                <span className="font-display text-3xl md:text-4xl text-primary-foreground">500+</span>
              </div>
              <span className="text-primary-foreground/60 text-sm uppercase tracking-wider">Eventos</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="text-primary-foreground/60" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
