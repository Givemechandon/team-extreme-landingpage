import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Attractions from "@/components/Attractions";
import Gallery from "@/components/Gallery";
import Clients from "@/components/Clients";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Attractions />
        <Gallery />
        <Clients />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
