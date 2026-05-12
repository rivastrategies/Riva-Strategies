import { useState, useEffect } from 'react';
import { Menu, Phone, ArrowDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white text-gray-800 antialiased selection-gold overflow-x-hidden">
      {/* HEADER */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-header shadow-lg py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center group">
              {/* Replace with actual image in public folder if available, or text placeholder */}
              <span className="text-2xl font-bold tracking-tighter text-riva-blue">RIVA<span className="font-light tracking-widest text-riva-gold ml-1">STRATEGIES</span></span>
            </a>
            <nav className="hidden md:flex space-x-10 items-center">
              <a href="#home" className="nav-link text-sm font-semibold tracking-wide text-gray-500 hover:text-riva-blue">Home</a>
              <a href="#services" className="nav-link text-sm font-semibold tracking-wide text-gray-500 hover:text-riva-blue">Services</a>
              <a href="#industries" className="nav-link text-sm font-semibold tracking-wide text-gray-500 hover:text-riva-blue">Industries</a>
              <a href="#faq" className="nav-link text-sm font-semibold tracking-wide text-gray-500 hover:text-riva-blue">FAQ</a>
              <a href="#contact" className="px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest bg-riva-gold text-riva-blue hover:bg-riva-gold-dark hover:scale-105 transition-all shadow-md">Book Strategy Call</a>
            </nav>
            <button
              className="md:hidden text-riva-blue p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 space-y-4">
            <a href="#home" className="block text-lg font-bold text-riva-blue" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#services" className="block text-lg font-bold text-riva-blue" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#industries" className="block text-lg font-bold text-riva-blue" onClick={() => setMobileMenuOpen(false)}>Industries</a>
            <a href="#faq" className="block text-lg font-bold text-riva-blue" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" className="block w-full text-center py-4 rounded font-bold uppercase tracking-widest bg-riva-gold text-riva-blue" onClick={() => setMobileMenuOpen(false)}>Book Strategy Call</a>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          
          {/* SECTION 1: HEADLINE */}
          <section className="bg-riva-blue pt-28 pb-20" id="home">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h1 variants={fadeIn} className="text-[10px] font-black uppercase tracking-[0.3em] text-riva-gold mb-6">
                Riva Revenue Audit
              </motion.h1>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]">
                Find Exactly Where<br />Your Business Is<br />Losing Money.
              </motion.h2>
              <motion.p variants={fadeIn} className="mt-8 text-xl text-blue-100/80 leading-relaxed max-w-2xl">
                Most businesses don't have a marketing problem. They have a leak problem. Traffic that doesn't convert. Customers that don't return. Platforms that aren't pulling their weight. We find the leaks and fix them.
              </motion.p>
              <motion.div variants={fadeIn} className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="tel:+18329050570" className="inline-flex items-center justify-center px-8 py-4 bg-riva-gold text-riva-blue rounded-sm font-black text-sm uppercase tracking-widest hover:bg-riva-gold-dark transition-all shadow-lg">
                  <Phone className="w-5 h-5 mr-3" /> Call 832-905-0570
                </a>
                <a href="#request-audit" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  Request Audit <ArrowDown className="w-5 h-5 ml-3" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* SECTION 2: PROBLEM */}
          <section className="py-20 bg-gray-50" id="problem">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-riva-gold mb-4">The Problem</h3>
                <h4 className="text-3xl md:text-4xl font-black text-riva-blue tracking-tight mb-12">You're Working Hard But Revenue Isn't Moving.</h4>
              </motion.div>
              
              <motion.div 
                className="grid md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  { icon: "📉", title: "Traffic Without Conversion", text: "People visit your website, scroll through your social, see your Google listing — then leave. You're paying for attention but not capturing demand." },
                  { icon: "🚪", title: "Customers Don't Return", text: "You spend real money acquiring new customers, but there's no system to bring them back. Repeat business is accidental, not engineered." },
                  { icon: "📊", title: "No Visibility Into What's Working", text: "You're posting on social, running ads, updating the website — but you can't point to which activity is actually driving revenue." },
                  { icon: "⚠️", title: "Platforms Are Underperforming", text: "Your Google Business Profile, website, and social channels exist — but none of them are optimized to convert visitors into customers." }
                ].map((item, index) => (
                  <motion.div key={index} variants={fadeIn} className="bg-white p-8 rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h5 className="text-xl font-bold text-riva-blue mb-3">{item.title}</h5>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="mt-12 bg-riva-blue/5 border-l-4 border-riva-blue p-6 rounded-r-sm"
              >
                <p className="text-lg text-riva-blue font-medium">
                  <strong>The real issue:</strong> You don't need more marketing. You need to find where the money is leaking and plug the holes before investing another dollar.
                </p>
              </motion.div>
            </div>
          </section>

          {/* SECTION 4: HOW IT WORKS */}
          <section className="py-20 bg-white" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-riva-gold mb-4">How It Works</h3>
                <h4 className="text-3xl md:text-4xl font-black text-riva-blue tracking-tight mb-12">Four Steps to Revenue Clarity.</h4>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              >
                {[
                  { step: "1", title: "Discovery Call", text: "30-minute conversation to understand your business, current marketing activities, and where you think the problems are. No pitch — just diagnosis." },
                  { step: "2", title: "Data Collection", text: "We access your analytics, review your platforms, audit your customer journey, and analyze your competitive landscape. Takes 3-5 business days." },
                  { step: "3", title: "Revenue Report", text: "You receive a detailed report showing exactly where money is leaking, what's underperforming, and what's missing — with specific numbers and evidence." },
                  { step: "4", title: "Action Plan", text: "A prioritized roadmap showing which fixes to implement first, expected impact, and whether you can do it yourself or need support. No obligation to hire us." }
                ].map((item, index) => (
                  <motion.div key={index} variants={fadeIn} className="flex items-start gap-6 bg-white p-8 rounded-sm border border-gray-200 shadow-sm gold-glow transition-all">
                    <div className="step-number bg-riva-gold text-riva-blue">{item.step}</div>
                    <div>
                      <h5 className="text-xl font-bold text-riva-blue mb-2">{item.title}</h5>
                      <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* SECTION 6: CALL TO ACTION */}
          <section id="request-audit" className="py-24 bg-riva-blue">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-riva-gold mb-4">Get Started</h3>
                <h4 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">Request Your Revenue Audit.</h4>
                <p className="text-xl text-blue-100/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                  Call now to schedule your discovery call, or fill out the form and we'll reach out within 24 hours.
                </p>
              </motion.div>

              {/* Primary CTA: Call */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-12">
                <a href="tel:+18329050570" className="inline-flex items-center justify-center px-10 py-5 bg-riva-gold text-riva-blue rounded-sm font-black text-lg uppercase tracking-widest hover:bg-riva-gold-dark transition-all shadow-xl">
                  <Phone className="w-6 h-6 mr-4" /> 832-905-0570
                </a>
                <p className="mt-4 text-blue-100/60 text-sm">Available Monday–Friday, 9am–5pm CT</p>
              </motion.div>

              {/* Secondary CTA: Form */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white/10 backdrop-blur-sm p-8 rounded-sm border border-white/20 text-left">
                <h5 className="text-lg font-bold text-white mb-6">Or request a callback:</h5>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Form submitted in Playground Mode!"); }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-riva-gold transition-colors" />
                    <input type="text" name="business" placeholder="Business Name" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-riva-gold transition-colors" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="email" name="email" placeholder="Email Address" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-riva-gold transition-colors" />
                    <input type="tel" name="phone" placeholder="Phone Number" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-riva-gold transition-colors" />
                  </div>
                  <select name="business_type" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white focus:outline-none focus:border-riva-gold transition-colors">
                    <option value="" disabled selected className="text-gray-800">Business Type</option>
                    <option value="restaurant-bar" className="text-gray-800">Restaurant / Bar</option>
                    <option value="local-service" className="text-gray-800">Local Service Business</option>
                    <option value="industrial-b2b" className="text-gray-800">Industrial / B2B</option>
                    <option value="other" className="text-gray-800">Other</option>
                  </select>
                  <textarea name="message" rows="3" placeholder="Briefly describe your biggest revenue challenge..." className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-riva-gold transition-colors resize-none"></textarea>
                  <button type="submit" className="w-full py-4 bg-riva-gold text-riva-blue rounded-sm font-black text-sm uppercase tracking-widest hover:bg-riva-gold-dark transition-all">
                    Request Revenue Audit
                  </button>
                </form>
              </motion.div>
            </div>
          </section>

        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="bg-riva-blue text-white pt-24 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-2xl font-bold tracking-tighter">RIVA<span className="font-light tracking-widest text-riva-gold ml-1">STRATEGIES</span></span>
              <p className="mt-6 text-blue-100/70 text-base leading-relaxed max-w-sm">Revenue-focused marketing and business development for restaurants, local services, and industrial companies.</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-riva-gold mb-8">Riva Systems</h4>
              <ul className="space-y-4 text-sm text-blue-100/80">
                <li><a href="#/" className="hover:text-white transition-colors">Revenue Audit</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Foundation</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Rollout</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Reach</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Engine</a></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-riva-gold mb-8">Industries</h4>
              <ul className="space-y-4 text-sm text-blue-100/80">
                <li><a href="#/" className="hover:text-white transition-colors">Restaurants & Bars</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Local Services</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Industrial / B2B</a></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-riva-gold mb-8">Contact</h4>
              <div className="space-y-6">
                <a href="tel:+18329050570" className="flex items-center text-blue-100 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center mr-3 group-hover:bg-riva-gold transition-colors"><Phone className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold">832-905-0570</span>
                </a>
                <a href="#request-audit" className="group inline-flex items-center px-6 py-3 border border-riva-gold text-riva-gold rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-riva-gold hover:text-riva-blue transition-all">
                  Request Audit <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            <p>© 2024 Riva Strategies. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-8">
              <a href="#/" className="hover:text-white transition-colors">FAQ</a>
              <a href="#/" className="hover:text-white transition-colors">Privacy</a>
              <a href="#/" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
