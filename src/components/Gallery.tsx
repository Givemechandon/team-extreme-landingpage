import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, ZoomIn, Sparkles } from "lucide-react";

// Original images
import aeroSurf from "@/assets/aero-surf.png";
import surfeMecanico from "@/assets/surfe-mecanico.png";
import escaladaJeep from "@/assets/escalada-jeep.png";
import escaladaAmstel from "@/assets/escalada-amstel.png";
import escaladaEvento from "@/assets/escalada-evento.png";
import tirolesa from "@/assets/tirolesa.png";

// New gallery images
import camaElastica from "@/assets/gallery/cama-elastica.png";
import arvorismo from "@/assets/gallery/arvorismo.png";
import tirolesa2 from "@/assets/gallery/tirolesa-2.jpg";
import bungeeJump from "@/assets/gallery/bungee-jump.png";
import escalada from "@/assets/gallery/escalada.png";
import giroMaster from "@/assets/gallery/giro-master.png";
import bungeeShot from "@/assets/gallery/bungee-shot.png";

const galleryImages = [
  { src: bungeeJump, alt: "Bungee Jump" },
  { src: escalada, alt: "Parede de Escalada" },
  { src: giroMaster, alt: "Giro Master" },
  { src: bungeeShot, alt: "Bungee Shot" },
  { src: tirolesa2, alt: "Tirolesa" },
  { src: arvorismo, alt: "Arvorismo" },
  { src: camaElastica, alt: "Cama Elástica" },
  { src: aeroSurf, alt: "Aero Surf Extreme" },
  { src: surfeMecanico, alt: "Surfe Mecânico" },
  { src: escaladaJeep, alt: "Escalada Jeep" },
  { src: escaladaAmstel, alt: "Escalada Amstel Ultra" },
  { src: escaladaEvento, alt: "Evento com Escalada" },
  { src: tirolesa, alt: "Tirolesa Evento" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <section id="galeria" className="py-20 md:py-32 bg-muted relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm mb-4">
              <Sparkles size={16} />
              Galeria
              <Sparkles size={16} />
            </span>
            <h2 className="section-title text-foreground mb-6">
              Nossos <span className="text-primary">Eventos</span>
            </h2>
            <p className="section-subtitle text-muted-foreground mx-auto">
              Confira alguns dos nossos eventos e atrações em ação
            </p>
          </motion.div>

          {/* Gallery Grid - Smaller thumbnails */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-3">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 1500)}
                onClick={() => setSelectedImage(image.src)}
                className="group relative cursor-pointer perspective-1000"
              >
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.15 : 1,
                    rotateY: hoveredIndex === index ? 8 : 0,
                    rotateX: hoveredIndex === index ? -5 : 0,
                    z: hoveredIndex === index ? 50 : 0,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                  style={{ 
                    transformStyle: "preserve-3d",
                    boxShadow: hoveredIndex === index 
                      ? "0 25px 50px -12px rgba(8, 112, 185, 0.4), 0 0 30px rgba(250, 179, 27, 0.3)" 
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {/* Image */}
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.2 : 1,
                      filter: hoveredIndex === index ? "brightness(1.1) saturate(1.2)" : "brightness(1) saturate(1)"
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Overlay with gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 0.8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Sparkle effects */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-accent rounded-full"
                            initial={{ 
                              opacity: 0, 
                              scale: 0,
                              x: "50%",
                              y: "50%"
                            }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                              x: `${20 + Math.random() * 60}%`,
                              y: `${20 + Math.random() * 60}%`,
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.1,
                              repeat: Infinity,
                              repeatDelay: 0.5
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                  
                  {/* Zoom icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0,
                      rotate: hoveredIndex === index ? 0 : -180
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                      <ZoomIn className="text-accent-foreground" size={18} />
                    </div>
                  </motion.div>
                  
                  {/* Title on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : 20,
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-primary-foreground font-bold text-xs text-center truncate">
                      {image.alt}
                    </p>
                  </motion.div>
                  
                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    animate={{
                      boxShadow: hoveredIndex === index 
                        ? "inset 0 0 20px rgba(250, 179, 27, 0.5), 0 0 20px rgba(8, 112, 185, 0.5)" 
                        : "inset 0 0 0px rgba(0, 0, 0, 0)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                {/* Reflection effect */}
                <motion.div
                  className="absolute -bottom-2 left-1 right-1 h-4 bg-gradient-to-b from-foreground/10 to-transparent rounded-b-lg blur-sm"
                  animate={{
                    opacity: hoveredIndex === index ? 0.5 : 0.1,
                    scaleY: hoveredIndex === index ? 1.5 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-extreme-dark/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
            >
              <X className="text-primary-foreground" size={24} />
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.3, opacity: 0, rotateY: 90 }}
              transition={{ 
                type: "spring", 
                damping: 20,
                stiffness: 100
              }}
              src={selectedImage}
              alt="Galeria expandida"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
