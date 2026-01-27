import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  message: z.string().trim().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(1000),
});

const ContactForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptContact: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, acceptContact: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validated = contactSchema.parse(formData);
      
      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          message: validated.message,
          acceptContact: formData.acceptContact,
        },
      });

      if (error) {
        throw new Error(error.message || 'Erro ao enviar mensagem');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Erro ao enviar mensagem');
      }
      
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Verifique seu email!",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        acceptContact: false,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        const message = error instanceof Error ? error.message : undefined;
        toast({
          title: "Erro ao enviar",
          description: message || "Tente novamente ou entre em contato pelo WhatsApp.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 md:py-32 bg-extreme-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(42_96%_54%/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-accent font-bold uppercase tracking-wider text-sm mb-4">
              Entre em Contato
            </span>
            <h2 className="section-title text-primary-foreground mb-6">
              Precisa de Uma Experiência{" "}
              <span className="text-accent">Única</span>?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-10">
              Entre em contato que nós temos a solução perfeita para o seu evento!
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <motion.a
                href="tel:+5511955506239"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-primary-foreground/80 hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="text-accent" size={22} />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/50">Telefone</p>
                  <p className="font-semibold">(11) 95550-6239</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:mario@teamextreme.com.br"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-primary-foreground/80 hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="text-accent" size={22} />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/50">Email</p>
                  <p className="font-semibold">mario@teamextreme.com.br</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-primary-foreground/80 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="text-accent" size={22} />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/50">Endereço</p>
                  <p className="font-semibold">R. José de Oliveira, 1065 - São Paulo/SP</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/teamextremesports"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Instagram className="text-accent" size={22} />
              </a>
              <a
                href="https://web.facebook.com/teamextremesportsmkt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Facebook className="text-accent" size={22} />
              </a>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-primary-foreground/70 text-sm mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-extreme-dark border ${
                      errors.name ? "border-destructive" : "border-primary/30"
                    } text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-primary-foreground/70 text-sm mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-extreme-dark border ${
                      errors.email ? "border-destructive" : "border-primary/30"
                    } text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-primary-foreground/70 text-sm mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-extreme-dark border ${
                      errors.phone ? "border-destructive" : "border-primary/30"
                    } text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors`}
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-primary-foreground/70 text-sm mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-extreme-dark border ${
                      errors.message ? "border-destructive" : "border-primary/30"
                    } text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors resize-none`}
                    placeholder="Conte-nos sobre seu evento..."
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptContact}
                    onChange={handleCheckbox}
                    className="mt-1 w-5 h-5 rounded border-primary/30 bg-extreme-dark text-accent focus:ring-accent"
                  />
                  <span className="text-primary-foreground/60 text-sm">
                    Aceito receber comunicação via e-mail ou WhatsApp sobre as atrações
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-extreme disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensagem
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
