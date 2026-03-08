import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Instagram, 
  Download, 
  Code, 
  Menu, 
  X, 
  ExternalLink, 
  ChevronRight,
  Terminal,
  Cpu,
  Globe,
  Database,
  Sun,
  Moon,
  Filter
} from 'lucide-react';

// --- Components ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className={`hidden lg:block ${isHovering ? 'cursor-active' : ''}`}>
      <div 
        className="custom-cursor"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`
        }}
      />
      <div 
        className="custom-cursor-ring"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.2)' : 'scale(1)'}`
        }}
      />
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

const Background = ({ theme }: { theme: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div 
        className={`absolute inset-0 opacity-[0.15] ${theme === 'dark' ? 'invert-0' : 'invert'}`}
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(0, 0, 0, 0.1)'} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }}
      />
      
      {/* Animated Blobs */}
      <motion.div 
        animate={{ 
          x: mousePos.x * 50,
          y: mousePos.y * 50,
        }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-accent/10 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          x: mousePos.x * -50,
          y: mousePos.y * -50,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 rounded-full blur-[120px]"
      />
    </div>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)'
  },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  },
  whileInView: {
    transition: {
      staggerChildren: 0.12
    }
  },
  viewport: { once: true, margin: "-50px" }
};

const heroItemVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  whileInView: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  const elem = document.getElementById(targetId);
  if (elem) {
    const offset = 80; // Navbar height offset
    const bodyRect = document.body.getBoundingClientRect().top;
    const elemRect = elem.getBoundingClientRect().top;
    const elemPosition = elemRect - bodyRect;
    const offsetPosition = elemPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  if (callback) callback();
};

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Smoothly interpolate values based on scroll
  // We use scrollYProgress or just scrollY with a threshold
  useEffect(() => {
    const handleScroll = () => {
      // Trigger glass effect when hero section is scrolled past
      // Using a slightly more generous threshold for a smoother feel
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSectionLocal = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToSection(e, href, () => setIsMobileMenuOpen(false));
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={false}
      animate={{
        backgroundColor: isScrolled 
          ? (theme === 'dark' ? 'rgba(10, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.8)') 
          : 'rgba(0, 0, 0, 0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        borderBottomColor: isScrolled 
          ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)') 
          : 'rgba(0, 0, 0, 0)',
        paddingTop: isScrolled ? '1rem' : '1.5rem',
        paddingBottom: isScrolled ? '1rem' : '1.5rem',
        boxShadow: isScrolled 
          ? (theme === 'dark' ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : '0 10px 30px -10px rgba(0, 0, 0, 0.05)') 
          : 'none'
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 w-full z-50 border-b border-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-2xl font-bold font-display cursor-pointer"
        >
          <span className="text-purple-accent">&lt;/&gt;</span>
          <span className="gradient-text">Suraj</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSectionLocal(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm font-medium hover:text-purple-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-accent transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:bg-purple-accent/20 transition-all text-purple-accent"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass text-purple-accent"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSectionLocal(e, link.href)}
                  className="text-lg font-medium hover:text-purple-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const toRotate = ['Web Developer', 'A Freelancer'];

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];
      
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0A0A12]">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-accent/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]"></div>
      
      {/* Background Code Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden font-mono text-[10px] leading-tight">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {`const portfolio = { name: "Suraj", role: "Freelancer", skills: ["React", "Node", "TypeScript"], passion: "Building UIs" }; `.repeat(10)}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.p variants={heroItemVariants} className="text-xl md:text-2xl font-medium text-gray-400 mb-2">Hello, I'm</motion.p>
          <motion.h1 variants={heroItemVariants} className="text-6xl md:text-8xl font-bold font-display leading-tight text-white mb-2">
            Suraj
          </motion.h1>
          <motion.h2 variants={heroItemVariants} className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6 min-h-[1.2em]">
            <span className="gradient-text">{text}</span>
            <span className="animate-pulse text-neon-pink">|</span>
          </motion.h2>
          <motion.p variants={heroItemVariants} className="text-sm md:text-base tracking-[0.2em] font-bold text-gray-500 mb-10 uppercase">
            FRONTEND DEVELOPER / C / JAVA / REACT+
          </motion.p>
          
          <motion.div variants={heroItemVariants} className="flex flex-wrap gap-6 mb-12">
            <a href="#portfolio" onClick={(e) => scrollToSection(e, '#portfolio')} className="btn-primary px-10 py-4 rounded-2xl">My Work</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="px-10 py-4 rounded-2xl border border-purple-accent/30 text-white font-semibold hover:bg-purple-accent/10 transition-all">Hire Me</a>
          </motion.div>

          <motion.div variants={heroItemVariants} className="flex gap-4">
            {[
              { icon: Github, href: 'https://github.com/surajjss05' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/suraj-shinde26' },
              { icon: Instagram, href: 'https://www.instagram.com/surajj__s3' },
              { icon: Mail, href: 'mailto:surajjss05@gmail.com' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-accent transition-all"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative hidden md:block"
        >
          {/* Code Window */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-3xl border border-white/10 shadow-2xl bg-[#0D0D1A]/80 backdrop-blur-xl relative z-10"
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            
            <div className="font-mono text-sm md:text-base leading-relaxed">
              <div className="flex gap-2">
                <span className="text-purple-accent">const</span>
                <span className="text-blue-400">developer</span>
                <span className="text-white">=</span>
                <span className="text-white">{'{'}</span>
              </div>
              <div className="pl-6 flex gap-2">
                <span className="text-gray-400 text-opacity-80">name:</span>
                <span className="text-neon-pink">"Suraj"</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-6 flex gap-2">
                <span className="text-gray-400 text-opacity-80">skills:</span>
                <span className="text-white">[</span>
                <span className="text-neon-pink">"React"</span>
                <span className="text-white">,</span>
                <span className="text-neon-pink">"TypeScript"</span>
                <span className="text-white">]</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-6 flex gap-2">
                <span className="text-gray-400 text-opacity-80">passion:</span>
                <span className="text-neon-pink">"Building UIs"</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-6 flex gap-2">
                <span className="text-gray-400 text-opacity-80">available:</span>
                <span className="text-blue-400">true</span>
              </div>
              <div className="text-white">{'};'}</div>
            </div>
          </motion.div>

          {/* Floating Stat Cards */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass p-5 rounded-2xl absolute -bottom-6 -left-10 z-20 shadow-2xl border border-white/10 bg-[#161625]/90 overflow-hidden group"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                animate={{ 
                  left: ["-100%", "100%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-accent to-transparent"
              />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Portfolio</p>
              <p className="text-xs text-gray-500 mb-1">Projects</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-purple-accent">25+</p>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full border border-[#161625] bg-purple-accent/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-purple-accent"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass p-5 rounded-2xl absolute -top-10 -right-6 z-20 shadow-2xl border border-white/10 bg-[#161625]/90 overflow-hidden group"
          >
            {/* Animated Snake Border */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                animate={{ 
                  left: ["-100%", "100%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-accent to-transparent"
              />
              <motion.div 
                animate={{ 
                  top: ["-100%", "100%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                className="absolute right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-accent to-transparent"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">GitHub Stats</p>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[8px] text-green-500 font-bold uppercase">Live</span>
                </div>
              </div>
              
              <div className="flex items-end gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Commits</p>
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="pb-1">
                  <p className="text-[10px] text-purple-accent font-bold">+4 today</p>
                </div>
              </div>

              {/* Mini Contribution Grid with "Snake" Animation */}
              <div className="relative grid grid-cols-7 gap-1">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`w-3 h-3 rounded-sm ${i < 8 ? 'bg-purple-accent/20' : 'bg-[#1e1e2e]'}`}
                  />
                ))}
                {/* The Snake */}
                <motion.div 
                  animate={{ 
                    x: [0, 16, 32, 48, 64, 80, 96, 96, 80, 64, 48, 32, 16, 0, 0],
                    y: [0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 16, 16, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-3 h-3 bg-purple-accent rounded-sm shadow-[0_0_10px_#8B5CF6]"
                />
              </div>
            </div>
          </motion.div>

          {/* Background Decorative Image/Pattern */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-purple-accent/10 to-neon-pink/10 blur-3xl -z-10 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

const About = ({ theme }: { theme: string }) => {
  return (
    <section id="about" className="py-24 bg-midnight/50">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            {/* Decorative Frames */}
            <div className="absolute -inset-4 border border-purple-accent/10 rounded-[2.5rem] -z-10 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute -inset-2 border border-purple-accent/20 rounded-[2rem] -z-10 group-hover:scale-102 transition-transform duration-500"></div>
            
            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-purple-accent/30 p-4 bg-midnight/40 backdrop-blur-sm relative z-0">
              <img 
                src="https://i.ibb.co/N66W2ZBD/IMG-20260307-WA0044.jpg" 
                alt="Suraj" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border border-white/10 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
              <div className="text-3xl font-bold text-purple-accent">WEB</div>
              <div className="text-sm text-text-secondary tracking-widest">DEVELOPER</div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold font-display mb-6">About <span className="gradient-text">Me</span></h2>
            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              I am a passionate Full Stack Web Developer dedicated to building high-performance, accessible, and user-centric web applications. My journey in tech began with a deep curiosity for software architecture, which led me to master the MERN stack and modern frontend frameworks.
            </p>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Currently, I focus on creating interactive, user-centric interfaces using React and Tailwind CSS. I believe in writing clean, maintainable code and staying updated with the latest industry trends.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Education</h4>
                <p className="text-sm text-text-secondary">BCA</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Experience</h4>
                <p className="text-sm text-text-secondary">Freelance Web Developer</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Contribution Graph */}
        <motion.div
          variants={itemVariants}
          className="mt-20 glass p-8 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-accent/20 rounded-xl text-purple-accent">
                <Github size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">GitHub Contributions</h3>
                <p className="text-sm text-text-secondary">My open source activity and coding journey</p>
              </div>
            </div>
            <a 
              href="https://github.com/surajjss05" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-semibold text-purple-accent hover:underline flex items-center gap-1"
            >
              View Profile <ExternalLink size={14} />
            </a>
          </div>
          
          <div className="flex justify-center overflow-x-auto py-4 no-scrollbar relative">
            <div className="min-w-[800px] md:min-w-0 relative">
              <GitHubCalendar 
                username="surajjss05" 
                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                theme={{
                  light: ['#f0f0f0', '#c084fc', '#a855f7', '#9333ea', '#7e22ce'],
                  dark: ['#1e1e2e', '#4c1d95', '#6d28d9', '#7c3aed', '#8b5cf6'],
                }}
                renderBlock={(block, activity) =>
                  React.cloneElement(block as React.ReactElement, {
                    'data-tooltip-id': 'github-tooltip',
                    'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                  })
                }
              />
              {/* The "Running Snake" Animation Overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden mt-1 ml-1">
                <motion.div 
                  animate={{ 
                    x: [0, 800, 800, 0, 0, 800, 800, 0, 0, 800, 800, 0, 0],
                    y: [0, 0, 16, 16, 32, 32, 48, 48, 64, 64, 80, 80, 0]
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-purple-accent rounded-sm shadow-[0_0_15px_#8B5CF6] z-10"
                />
              </div>
              <ReactTooltip id="github-tooltip" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Skills = ({ theme }: { theme: string }) => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Globe,
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3/Tailwind', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React.js', level: 80 },
      ]
    },
    {
      title: 'Programming',
      icon: Terminal,
      skills: [
        { name: 'C Language', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'Python', level: 70 },
      ]
    },
    {
      title: 'Tools & Backend',
      icon: Database,
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Node.js', level: 65 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Technical <span className="gradient-text">Skills</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto px-4 md:px-0">My technical toolkit covers everything from low-level programming to modern frontend frameworks.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Category 1: Frontend */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 glass p-8 rounded-3xl hover:border-purple-accent/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe size={120} />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-accent/20 rounded-xl text-purple-accent">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold">Frontend Development</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'HTML5', level: 95 },
                { name: 'CSS3/Tailwind', level: 90 },
                { name: 'JavaScript', level: 85 },
                { name: 'React.js', level: 80 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-text-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-purple-accent/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-accent to-neon-pink"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main Category 2: Programming */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 glass p-8 rounded-3xl hover:border-purple-accent/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal size={120} />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-accent/20 rounded-xl text-purple-accent">
                <Terminal size={24} />
              </div>
              <h3 className="text-2xl font-bold">Programming Languages</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'C Language', level: 85 },
                { name: 'Java', level: 80 },
                { name: 'Python', level: 70 },
                { name: 'TypeScript', level: 75 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-text-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-purple-accent/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-accent to-neon-pink"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Small Category 1: Tools */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 glass p-6 rounded-3xl hover:border-purple-accent/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-accent/20 rounded-lg text-purple-accent">
                <Cpu size={20} />
              </div>
              <h3 className="font-bold">Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'VS Code', 'Vite', 'Postman'].map(tool => (
                <span key={tool} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium border border-white/5">{tool}</span>
              ))}
            </div>
          </motion.div>

          {/* Small Category 2: Backend */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 glass p-6 rounded-3xl hover:border-purple-accent/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-accent/20 rounded-lg text-purple-accent">
                <Database size={20} />
              </div>
              <h3 className="font-bold">Backend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express', 'MongoDB', 'SQL'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium border border-white/5">{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* Highlight Card: Learning */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 glass p-6 rounded-3xl bg-gradient-to-br from-purple-accent/10 to-transparent border-purple-accent/20 flex items-center justify-between group"
          >
            <div>
              <h3 className="text-lg font-bold mb-1">Currently Learning</h3>
              <p className="text-sm text-text-secondary">Next.js & Advanced System Design</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-accent flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <Code size={24} />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const projects = [
    {
      title: 'Student Grade Calculator',
      desc: 'An interactive web application to calculate and manage student grades with a clean, intuitive interface.',
      longDesc: 'The Student Grade Calculator is designed to help students and teachers easily track academic performance. Built with vanilla JavaScript, it provides a seamless experience for inputting marks and receiving instant feedback on grades and percentages.',
      lessons: 'Mastered DOM manipulation and state management in vanilla JS. Learned how to handle edge cases in mathematical calculations within the browser.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      github: 'https://github.com/surajjss05/student-grade-calculator',
      live: 'https://gradecalculat.netlify.app/'
    },
    {
      title: 'Python Mini Projects Collection',
      desc: 'A comprehensive collection of useful Python utilities including Water Reminder app, Password Generator, and more.',
      longDesc: 'This collection showcases a variety of Python-based tools designed for everyday utility. From desktop notifications for hydration to secure password generation, these projects highlight the versatility of Python for automation and GUI development using Tkinter.',
      lessons: 'Deepened understanding of Python libraries like Tkinter and time. Learned how to package Python scripts for desktop use.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      tags: ['Python', 'Tkinter', 'Automation'],
      category: 'Python',
      github: 'https://github.com/surajjss05/python-mini-project-s-',
      live: 'https://ais-dev-6xtvmrqbtwma6opreghrhu-362840097352.asia-southeast1.run.app'
    },
    {
      title: 'Car Rush Arcade',
      desc: 'An exciting browser-based car racing game built with vanilla JavaScript. Features smooth animations and collision detection.',
      longDesc: 'Experience the thrill of the track with this JavaScript-powered racing game. It utilizes the Canvas API for high-performance rendering and features responsive controls, making it playable on both desktop and mobile browsers.',
      lessons: 'Gained expertise in the HTML5 Canvas API and game loop logic. Improved skills in collision detection algorithms and performance optimization.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      github: 'https://github.com/surajjss05/car-rush-arcade',
      live: 'https://carrushed.netlify.app/'
    }
  ];

  const categories = ['All', 'Frontend', 'Python'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter || p.tags.includes(filter));

  return (
    <section id="portfolio" className="py-24 bg-midnight/30">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-5xl font-bold font-display mb-4">
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-text-secondary max-w-2xl mx-auto">
            A selection of my recent work and personal experiments.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex justify-center mb-12 px-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full sm:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 sm:px-6 sm:py-2 rounded-2xl sm:rounded-full text-sm font-bold transition-all min-h-[48px] sm:min-h-0 flex items-center justify-center ${filter === cat ? 'bg-purple-accent text-white shadow-lg shadow-purple-accent/20' : 'glass text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="glass rounded-3xl overflow-hidden group cursor-pointer flex flex-col"
              >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image.includes('unsplash') ? `${project.image}?auto=format&fit=crop&w=600&q=75` : project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-6 line-clamp-3">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 bg-purple-accent/10 text-purple-accent rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl border border-purple-accent/30 flex items-center justify-center gap-2 text-sm font-medium hover:bg-purple-accent/10 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedProject.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 no-scrollbar"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all z-20"
              >
                <X size={20} />
              </button>
              
              <div className="h-64 md:h-80 w-full overflow-hidden">
                <img 
                  src={selectedProject.image.includes('unsplash') ? `${selectedProject.image}?auto=format&fit=crop&w=1200&q=85` : selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag: string) => (
                    <span key={tag} className="text-xs uppercase tracking-wider font-bold px-3 py-1 bg-purple-accent/10 text-purple-accent rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-purple-accent mb-3">Description</h4>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {selectedProject.longDesc}
                  </p>
                </div>

                <div className="mb-8 p-6 bg-purple-accent/5 rounded-2xl border border-purple-accent/10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-purple-accent mb-3">Lessons Learned</h4>
                  <p className="text-text-secondary italic">
                    "{selectedProject.lessons}"
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    Live Demo <ExternalLink size={18} />
                  </a>
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    GitHub Repository <Github size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Resume = () => {
  const timeline = [
    {
      year: '2026 - Present',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      desc: 'Building responsive websites and web applications for various clients.'
    },
    {
      year: '2025 - 2028',
      title: 'BCA',
      company: 'Savitribai Phule Pune University',
      desc: 'College: NACAS AHILYANAGAR. Focused on modern web technologies, full-stack development, and core CS fundamentals.'
    },
    {
      year: '2025',
      title: '30 DAYS Full Stack Web Bootcamp Development',
      company: 'PLATFORM - GEEKS FOR GEEKS',
      desc: 'Intensive training on MERN Stack (MongoDB, Express, React, Node.js) and modern web architecture.'
    }
  ];

  return (
    <section id="resume" className="py-24">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <motion.h2 variants={itemVariants} className="text-4xl font-bold font-display mb-8">My <span className="gradient-text">Journey</span></motion.h2>
            <div className="space-y-8 relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-white/10 ml-4 pl-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-bg-primary border-2 border-purple-accent"></div>
                  <span className="text-sm text-purple-accent font-bold mb-1 block">{item.year}</span>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary mb-3">{item.company}</p>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants} className="glass p-8 md:p-12 rounded-3xl text-center relative overflow-hidden group">
            {/* Subtle Resume Preview Background */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
              <img 
                src="https://i.ibb.co/3Q5mT62/IMG-20260225-224506.jpg" 
                alt="Resume Background" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="p-6 bg-purple-accent/10 rounded-full text-purple-accent mb-6 ring-4 ring-purple-accent/5">
                <Download size={48} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Curriculum Vitae</h3>
              <p className="text-text-secondary mb-8 max-w-sm">
                Click below to view or download my professional resume. It contains detailed information about my technical skills and project experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative group/btn">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-accent to-neon-pink rounded-2xl blur opacity-25 group-hover/btn:opacity-75 transition duration-1000 group-hover/btn:duration-200"></div>
                  <a 
                    href="https://ibb.co/fV2sm2YB" 
                    target="_blank"
                    rel="noreferrer"
                    className="relative btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl"
                  >
                    View Resume <ExternalLink size={18} />
                  </a>
                </div>
                
                <a 
                  href="https://i.ibb.co/3Q5mT62/IMG-20260225-224506.jpg" 
                  download="Suraj_Resume.jpg"
                  className="px-8 py-4 rounded-2xl border border-purple-accent/30 text-text-primary font-semibold hover:bg-purple-accent/10 transition-all flex items-center gap-2"
                >
                  Download <Download size={18} />
                </a>
              </div>
              
              <p className="mt-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                PDF / JPG Format Available
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-midnight/50">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold font-display mb-6">Let's <span className="gradient-text">Connect</span></h2>
            <p className="text-text-secondary text-lg mb-12">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email Me', value: 'surajjss05@gmail.com' },
                { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/suraj-shinde26' },
                { icon: Instagram, label: 'Instagram', value: '@surajj__s3' },
                { icon: Github, label: 'GitHub', value: 'github.com/surajjss05' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-3 glass rounded-xl text-purple-accent">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase font-bold">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl">
            <form 
              action="https://formspree.io/f/xpwqzvda" 
              method="POST"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Name</label>
                  <input 
                    name="name"
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 focus:border-purple-accent outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Email</label>
                  <input 
                    name="email"
                    required
                    type="email" 
                    className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 focus:border-purple-accent outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4} 
                  className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 focus:border-purple-accent outline-none transition-all" 
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full group flex items-center justify-center gap-2">
                Send Message <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-xl font-bold font-display">
          <span className="text-purple-accent">&lt;/&gt;</span>
          <span className="gradient-text">Suraj</span>
        </div>
        
        <p className="text-text-secondary text-sm">
          © 2026 Suraj. All rights reserved.
        </p>

        <div className="flex gap-6">
          {[
            { Icon: Github, href: 'https://github.com/surajjss05' },
            { Icon: Linkedin, href: 'https://www.linkedin.com/in/suraj-shinde26' },
            { Icon: Instagram, href: 'https://www.instagram.com/surajj__s3' },
            { Icon: Mail, href: 'mailto:surajjss05@gmail.com' }
          ].map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-purple-accent transition-colors">
              <social.Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="bg-bg-primary min-h-screen selection:bg-purple-accent/30 selection:text-white transition-colors duration-300">
      <CustomCursor />
      <ScrollProgress />
      <Background theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About theme={theme} />
        <Skills theme={theme} />
        <Projects />
        <Resume />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  );
}
