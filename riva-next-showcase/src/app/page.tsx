"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Menu, X, ArrowRight, TrendingUp, Users, Target, Activity, PhoneCall } from "lucide-react";

// Magnetic Button Component
const MagneticButton = ({ children, className, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// 3D Tilt Card Component
const TiltCard = ({ feature, index }: { feature: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative glass-panel p-10 rounded-3xl cursor-none"
    >
      <div style={{ transform: "translateZ(50px)" }}>
        <div className="w-16 h-16 rounded-2xl bg-riva-gold/20 flex items-center justify-center text-riva-gold mb-6 border border-riva-gold/30">
          {feature.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
        <p className="text-slate-400 leading-relaxed text-lg">{feature.text}</p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Custom Cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Scroll Parallax
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const navLinks = [
    { name: "Services", href: "#" },
    { name: "Industries", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "FAQ", href: "#" },
  ];

  const features = [
    { icon: <TrendingUp className="w-8 h-8" />, title: "Traffic Without Conversion", text: "People visit, scroll, and leave. You're paying for attention but not capturing demand." },
    { icon: <Users className="w-8 h-8" />, title: "Customers Don't Return", text: "You acquire customers but have no system to bring them back. Repeat business is accidental." },
    { icon: <Target className="w-8 h-8" />, title: "No Visibility Into Returns", text: "You're posting and running ads, but can't point to which activity actually drives revenue." },
    { icon: <Activity className="w-8 h-8" />, title: "Underperforming Platforms", text: "Your digital footprint exists, but isn't optimized to convert visitors into loyal clients." },
  ];

  // Text Animation
  const textTitle = "Find Exactly Where You're Losing Money.";
  const words = textTitle.split(" ");

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden noise-bg cursor-none">
      
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-riva-gold mix-blend-difference pointer-events-none z-[100] flex items-center justify-center"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", mass: 0.2, stiffness: 800, damping: 40 }}
      >
        <motion.div className="w-1 h-1 bg-riva-gold rounded-full" />
      </motion.div>

      {/* Dynamic Background Orbs tracked to scroll */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 500]) }} className="glow-orb bg-riva-gold w-[800px] h-[800px] top-[-300px] left-[-300px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }} className="glow-orb bg-riva-blue w-[1000px] h-[1000px] top-[30%] right-[-400px] opacity-60" />
      <motion.div style={{ x: useTransform(scrollYProgress, [0, 1], [0, 400]) }} className="glow-orb bg-riva-accent w-[600px] h-[600px] bottom-[-200px] left-[10%]" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? "glass-nav py-4" : "py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="/" className="text-3xl font-black tracking-tighter text-white z-10 hover:scale-105 transition-transform">
              RIVA<span className="text-riva-gold ml-1 font-light tracking-widest">STRATEGIES</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.5 }}
                  className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-riva-gold transition-all duration-500 group-hover:w-full"></span>
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
                <MagneticButton className="px-8 py-3 bg-transparent border border-riva-gold/50 text-riva-gold rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-riva-gold hover:text-background transition-colors shadow-[0_0_20px_rgba(201,162,77,0)] hover:shadow-[0_0_30px_rgba(201,162,77,0.3)]">
                  Book Strategy
                </MagneticButton>
              </motion.div>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 md:pt-60 md:pb-52 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center min-h-screen justify-center">
        
        {/* Animated Background Swoops */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
          <svg className="absolute w-[200%] h-[200%] opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <motion.path
              d="M-200,500 C100,200 400,800 1200,300"
              fill="none"
              stroke="var(--color-riva-gold)"
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
              style={{ filter: "blur(2px)" }}
            />
            <motion.path
              d="M-200,600 C300,900 600,100 1200,500"
              fill="none"
              stroke="var(--color-riva-blue)"
              strokeWidth="8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "mirror" }}
              style={{ filter: "blur(4px)" }}
            />
            <motion.path
              d="M0,800 Q500,-200 1000,800"
              fill="none"
              stroke="var(--color-riva-accent)"
              strokeWidth="15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 5, ease: "easeInOut", delay: 2, repeat: Infinity, repeatType: "mirror" }}
              style={{ filter: "blur(8px)" }}
            />
          </svg>
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="inline-block mb-10 px-6 py-2 rounded-full border border-riva-gold/40 bg-gradient-to-r from-riva-gold/5 to-riva-gold/20 backdrop-blur-md text-riva-gold text-xs font-black uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(201,162,77,0.2)]"
          >
            The Riva Revenue Audit
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1.05] text-white overflow-hidden flex flex-wrap justify-center gap-x-4 md:gap-x-8">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0, rotate: 10 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={i >= 3 ? "text-gradient" : ""}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light mix-blend-screen"
          >
            Most businesses don't have a marketing problem. They have a leak problem. We find the leaks and engineer systems to fix them.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5, type: "spring" }}
            className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center relative z-20"
          >
            <MagneticButton className="px-12 py-6 bg-gradient-to-r from-riva-gold to-riva-gold-dark text-background rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(201,162,77,0.5)] hover:shadow-[0_0_100px_rgba(201,162,77,0.8)] transition-shadow flex items-center group overflow-hidden relative">
              <span className="relative z-10 flex items-center">
                Request Audit
                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-3 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </MagneticButton>
            
            <MagneticButton className="px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-colors flex items-center">
              <PhoneCall className="mr-4 w-5 h-5 text-riva-gold animate-pulse" />
              Call 832-905-0570
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* 3D TILT PROBLEM SECTION */}
      <section className="py-40 relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-3xl" style={{ perspective: "1000px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-32"
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              You're Working Hard, But <br /> 
              <span className="text-riva-gold inline-block hover:scale-110 transition-transform duration-500 cursor-none">Revenue Isn't Moving.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {features.map((feature, idx) => (
              <TiltCard key={idx} feature={feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL HOW IT WORKS */}
      <section className="py-40 bg-gradient-to-b from-transparent to-black/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center mb-32"
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">Four Steps to <span className="text-gradient">Clarity.</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", text: "30-minute conversation. No pitch — just diagnosis." },
              { step: "02", title: "Data Collection", text: "We access analytics and audit your customer journey." },
              { step: "03", title: "Revenue Report", text: "Detailed report showing exactly where money is leaking." },
              { step: "04", title: "Action Plan", text: "Prioritized roadmap showing which fixes to implement first." }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, type: "spring" }}
                className="glass-panel p-10 rounded-[2rem] relative overflow-hidden group cursor-none hover:border-riva-gold/50 transition-colors"
              >
                <motion.div 
                  className="absolute -top-20 -right-20 w-64 h-64 bg-riva-gold/20 rounded-full blur-3xl group-hover:bg-riva-gold/40 transition-colors"
                />
                <div className="text-7xl font-black text-white/5 mb-8 group-hover:text-riva-gold/20 transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 relative z-10">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg relative z-10">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
