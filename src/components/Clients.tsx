import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "Playcenter",
  "Skol",
  "Sundown",
  "Nescau",
  "Pepsi",
  "Jeep",
  "Amstel",
];

const Clients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary font-bold uppercase tracking-wider text-sm mb-4">
            Clientes Satisfeitos
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            Empresas que <span className="text-primary">Confiam</span> em Nós
          </h2>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="px-6 py-4 bg-muted rounded-lg border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <span className="font-display text-xl md:text-2xl text-muted-foreground hover:text-primary transition-colors">
                {client}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
