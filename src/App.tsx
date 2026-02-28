/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { 
  Search, 
  Cpu, 
  Zap, 
  ChevronRight, 
  ShieldCheck, 
  Menu,
  X,
  Instagram,
  Mail,
  ArrowUpRight,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

const Logo = ({ className = "-ml-10" }: { className?: string }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`relative group cursor-pointer ${className}`} 
      onClick={scrollToTop}
    >
      <div className="absolute top-[100%] -translate-y-1/2 left-0">
        <img 
          src="4.png" 
          alt="Fixnyze Logo" 
          className="h-[100px] md:h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-none"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

const NavItem = ({ label, active = false }: { label: string, active?: boolean }) => {
  const href = `#${label.toLowerCase().replace(/\s+/g, '')}`;
  return (
    <a 
      href={href} 
      className={`text-base font-medium transition-all duration-300 hover:text-blue-400 relative group ${active ? 'text-blue-400' : 'text-slate-400'}`}
    >
      {label}
      {active && (
        <motion.div 
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </a>
  );
};

const ServiceCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="glass p-8 rounded-2xl group hover:border-blue-500/50 transition-all duration-500 relative overflow-hidden cursor-default"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
      <Icon className="text-blue-400" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    const serviceId = "service_m4qe3f6";
    const templateId = "template_yeux7kk";
    const publicKey = "AKo6fKAbtZCn5So20";

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
          console.log('Email successfully sent!', result.text);
          setFormSubmitted(true);
      }, (error) => {
          console.error('Failed to send email:', error);
          const errorMsg = error?.text || error?.message || 'Unknown error';
          alert(`Failed to send message: ${errorMsg}. Please check your EmailJS settings.`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for active section
    const sections = ['hero', 'howitworks', 'contactus', 'aboutus'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const logoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setShowNavLogo(true);
        } else {
          setShowNavLogo(false);
        }
      },
      { threshold: 0 }
    );

    if (featuresRef.current) logoObserver.observe(featuresRef.current);
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      logoObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 bg-slate-950 text-slate-200 overflow-x-hidden">
      <div className="atmosphere" />
      <div className="stars" />
      <div className="fixed inset-0 circuit-pattern pointer-events-none" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'h-12 glass border-b border-white/5 shadow-lg shadow-blue-500/5' : 'h-16'}`}>
        <div className="max-w-7xl mx-auto pl-0 pr-8 h-full flex items-center justify-between">
          <AnimatePresence>
            {showNavLogo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Logo />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <NavItem label="How It Works" active={activeSection === 'howitworks'} />
            <NavItem label="Contact us" active={activeSection === 'contactus'} />
            <NavItem label="About Us" active={activeSection === 'aboutus'} />
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 glass pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#howitworks" onClick={() => setMobileMenuOpen(false)} className={`text-2xl font-semibold transition-colors ${activeSection === 'howitworks' ? 'text-blue-400' : 'text-white'}`}>How It Works</a>
              <a href="#contactus" onClick={() => setMobileMenuOpen(false)} className={`text-2xl font-semibold transition-colors ${activeSection === 'contactus' ? 'text-blue-400' : 'text-white'}`}>Contact us</a>
              <a href="#aboutus" onClick={() => setMobileMenuOpen(false)} className={`text-2xl font-semibold transition-colors ${activeSection === 'aboutus' ? 'text-blue-400' : 'text-white'}`}>About Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative pt-10 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-[60%] z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-2 -ml-20"
              >
                <img 
                  src="4.png" 
                  alt="Fixnyze Hero Logo" 
                  className="h-32 md:h-48 w-auto object-contain"
                />
              </motion.div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                AI-DRIVEN BUSINESS EVOLUTION
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
                Precision <span className="text-blue-500 italic font-serif">Analysis</span>. <br />
                <span className="lg:whitespace-nowrap">Autonomous <span className="text-blue-500 italic font-serif">Solutions</span>.</span>
              </h1>
              <p className="text-xl text-slate-400 mb-6 max-w-xl leading-relaxed">
                Reduce operating costs, eliminate manual labor, expand without hiring workers in your company, and implement scalable and self-operating solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contactus" className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
                  Contact us <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="mt-12 flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">500+</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400">Problems Fixed</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">98%</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400">Efficiency Gain</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full lg:w-[40%] mt-12 lg:mt-0"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full" />
              <div className="relative glass border-white/10 p-2 rounded-[2.5rem] overflow-hidden">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="rounded-[2rem] w-full aspect-square object-cover opacity-80 mix-blend-luminosity"
                >
                  <source src="/Video Project.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 relative" id="howitworks" ref={featuresRef}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">Our Methodology</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">The Fixnyze Ecosystem</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We don't just provide tools; we build autonomous workflows that understand your business context and evolve with your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard 
                icon={Search} 
                title="Deep Analysis (Nyze)" 
                description="We use proprietary AI models to scan your entire business operation, identifying bottlenecks and hidden costs you didn't know existed."
                delay={0.1}
              />
              <ServiceCard 
                icon={Cpu} 
                title="AI Automation (Fix)" 
                description="Our engineers deploy custom-built AI agents that automate repetitive tasks, decision-making processes, and customer interactions."
                delay={0.2}
              />
              <ServiceCard 
                icon={Zap} 
                title="Real-time Evolution" 
                description="The systems we build aren't static. They learn from your data in real-time, constantly finding new ways to improve efficiency."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 px-6 bg-slate-950/50 relative overflow-hidden" id="contactus">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono">01</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Discovery & Audit</h4>
                    <p className="text-slate-400">We perform a comprehensive audit of your current tech stack and human workflows.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono">02</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">AI Blueprinting</h4>
                    <p className="text-slate-400">Our team designs a custom AI architecture tailored to solve your specific bottlenecks.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono">03</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Deployment & Scaling</h4>
                    <p className="text-slate-400">We integrate the AI solutions seamlessly into your existing environment with zero downtime.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-12 rounded-[3rem] border-white/5 relative min-h-[500px] flex flex-col justify-center">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600 rounded-full blur-[60px] opacity-50" />
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Ready to automate?</h3>
                    <form ref={formRef} className="space-y-6" onSubmit={handleFormSubmit}>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Full Name</label>
                          <input required name="name" type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Work Email</label>
                          <input required name="email" type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="john@company.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Company Name</label>
                        <input required name="title" type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="Acme Inc." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Explain your problem</label>
                        <textarea required name="message" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all h-32" placeholder="Tell us what you want to fix..."></textarea>
                      </div>
                      <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : 'Get Your AI Audit'}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-center space-y-6"
                  >
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="text-emerald-400 w-10 h-10" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Request Received</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Thank you for your interest. Our AI architects are reviewing your request and will reach out within <span className="text-blue-400 font-bold">24 hours</span> to schedule your deep-dive audit.
                    </p>
                    <div className="pt-6">
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="text-sm text-slate-500 hover:text-blue-400 transition-colors underline underline-offset-4"
                      >
                        Send another request
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-6 relative overflow-hidden" id="aboutus">
          <div className="max-w-7xl mx-auto">
            <div className="glass p-12 md:p-20 rounded-[3rem] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -z-10" />
              
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">The Identity</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    Who is <span className="text-blue-500">Fixnyze</span>?
                  </h3>
                  <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                    <p>
                      Fixnyze is not just a tech company; we are the architects of business evolution. Our name is a fusion of <span className="text-white font-bold">"Fix"</span> (to repair and optimize) and <span className="text-white font-bold">"Analysis"</span> (to understand and decode).
                    </p>
                    <p>
                      We specialize in identifying the hidden "friction" within business operations—the complex, manual, and repetitive problems that slow down growth. By combining deep analytical intelligence with autonomous AI automation, we transform these challenges into seamless, self-evolving workflows.
                    </p>
                    <p className="text-blue-400 font-medium italic">
                      "We don't just solve problems; we engineer their disappearance."
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="glass p-6 rounded-2xl border-white/10 hover:bg-white/5 transition-all">
                      <div className="text-blue-400 mb-4"><Search size={32} /></div>
                      <h4 className="text-white font-bold mb-2">The Analysis</h4>
                      <p className="text-slate-400 text-sm">Deep decoding of operational DNA to find inefficiencies.</p>
                    </div>
                    <div className="glass p-6 rounded-2xl border-white/10 hover:bg-white/5 transition-all">
                      <div className="text-emerald-400 mb-4"><Zap size={32} /></div>
                      <h4 className="text-white font-bold mb-2">The Fix</h4>
                      <p className="text-slate-400 text-sm">Deployment of autonomous AI agents to handle complexity.</p>
                    </div>
                  </div>
                  <div className="space-y-6 pt-12">
                    <div className="glass p-6 rounded-2xl border-white/10 hover:bg-white/5 transition-all">
                      <div className="text-purple-400 mb-4"><Cpu size={32} /></div>
                      <h4 className="text-white font-bold mb-2">The AI</h4>
                      <p className="text-slate-400 text-sm">Custom-built neural networks tailored to your logic.</p>
                    </div>
                    <div className="glass p-6 rounded-2xl border-white/10 hover:bg-white/5 transition-all">
                      <div className="text-orange-400 mb-4"><ArrowUpRight size={32} /></div>
                      <h4 className="text-white font-bold mb-2">The Scale</h4>
                      <p className="text-slate-400 text-sm">Infinite growth potential through automated systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <Logo className="-ml-14 -mt-4" />
              <p className="mt-12 text-slate-400 max-w-sm leading-relaxed">
                Fixnyze is a global leader in AI-driven business transformation. We specialize in identifying operational friction and engineering autonomous solutions.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="https://www.instagram.com/fixnyze/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="mailto:fixnyze@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400 transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-6">Solutions</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Process Automation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Data Analysis</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">AI Consulting</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Custom Agents</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#aboutus" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2026 Fixnyze AI Solutions. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-slate-500">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <a href="#" className="hover:text-slate-300">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
