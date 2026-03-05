import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-100px" }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
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
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-2xl font-bold font-display"
        >
          <span className="text-purple-accent">&lt;/&gt;</span>
          <span className="gradient-text">Suraj</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Full Stack Web Developer';
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % 1; // Only one string for now, but expandable
      const full = fullText;
      
      setText(isDeleting 
        ? full.substring(0, text.length - 1) 
        : full.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === full) {
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
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-accent/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-pink/20 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="whileInView"
        >
          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-medium text-purple-accent mb-4">Hi, I'm Suraj</motion.h2>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6 min-h-[1.2em]">
            {text}<span className="animate-pulse text-purple-accent">|</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-text-secondary mb-8 max-w-lg">
            Specializing in the MERN Stack and modern web architecture. I build high-performance, user-centric web applications with a focus on clean design and exceptional user experience.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href="#portfolio" className="btn-primary">My Work</a>
            <a href="#contact" className="btn-secondary">Hire Me</a>
            <a 
              href="#" 
              download="Suraj_Resume.pdf"
              className="px-6 py-3 rounded-xl border border-white/10 glass hover:bg-white/10 transition-all flex items-center gap-2"
              onClick={(e) => {
                if (e.currentTarget.getAttribute('href') === '#') {
                  e.preventDefault();
                  alert('Please provide a valid link to your resume file in the code (App.tsx line 231).');
                }
              }}
            >
              Download CV <Download size={18} />
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 mt-12">
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
                whileHover={{ y: -5, color: '#8B5CF6' }}
                className="text-gray-400 transition-colors"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative hidden md:block"
        >
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass p-6 rounded-2xl absolute -top-10 -left-10 z-20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-32 bg-white/10 rounded"></div>
              <div className="h-2 w-24 bg-white/10 rounded"></div>
              <div className="h-2 w-40 bg-purple-accent/30 rounded"></div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass p-6 rounded-2xl absolute -bottom-10 -right-10 z-20 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-purple-accent/20 rounded-lg text-purple-accent">
                <Cpu size={20} />
              </div>
              <span className="text-sm font-semibold">Performance</span>
            </div>
            <div className="text-2xl font-bold">99%</div>
          </motion.div>

          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/coding/800/800" 
              alt="Developer Workspace" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent"></div>
          </div>
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
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-purple-accent/30 p-4">
              <img 
                src="https://i.ibb.co/YB1M8GWG/IMG-20251201-222015.jpg" 
                alt="Suraj" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-purple-accent">WEB</div>
              <div className="text-sm text-text-secondary">DEVELOPER</div>
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
                <p className="text-sm text-text-secondary">Web Development (BCA)</p>
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
          
          <div className="flex justify-center overflow-x-auto py-4 no-scrollbar">
            <div className="min-w-[800px] md:min-w-0">
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
          <h2 className="text-4xl font-bold font-display mb-4">Technical <span className="gradient-text">Skills</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">My technical toolkit covers everything from low-level programming to modern frontend frameworks.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="glass p-8 rounded-3xl hover:border-purple-accent/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-accent/20 rounded-xl text-purple-accent">
                  <cat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="space-y-6">
                {cat.skills.map((skill) => (
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
          ))}
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
      title: 'E-Commerce Dashboard',
      desc: 'A full-featured admin panel for managing products, orders, and analytics.',
      longDesc: 'This project is a comprehensive dashboard designed for e-commerce administrators. It features real-time sales tracking, inventory management, and customer behavior analytics. Built with a focus on performance and scalability, it uses advanced data visualization to help business owners make informed decisions.',
      image: 'https://picsum.photos/seed/dash/800/500',
      tags: ['React', 'Tailwind', 'Recharts'],
      category: 'Full-stack',
      github: 'https://github.com/surajjss05',
      live: 'https://ais-dev-6xtvmrqbtwma6opreghrhu-362840097352.asia-southeast1.run.app'
    },
    {
      title: 'AI Image Generator',
      desc: 'Web app that uses Gemini API to generate creative image descriptions and mockups.',
      longDesc: 'An innovative application that bridges the gap between text and visual creativity. By leveraging the Gemini API, users can generate detailed prompts and conceptual mockups. The app features a clean, intuitive interface and a history of generated content, making it a valuable tool for designers and content creators.',
      image: 'https://picsum.photos/seed/ai/800/500',
      tags: ['React', 'Gemini API', 'Node.js'],
      category: 'AI',
      github: 'https://github.com/surajjss05',
      live: 'https://ais-dev-6xtvmrqbtwma6opreghrhu-362840097352.asia-southeast1.run.app'
    },
    {
      title: 'Portfolio v1',
      desc: 'My previous portfolio built with pure HTML/CSS and minimal JS.',
      longDesc: 'My first step into the professional web development world. This portfolio showcases my early skills in semantic HTML, responsive CSS layouts, and basic JavaScript interactivity. It served as a foundation for my current expertise and demonstrates my growth as a developer over time.',
      image: 'https://picsum.photos/seed/port/800/500',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      github: 'https://github.com/surajjss05',
      live: 'https://ais-dev-6xtvmrqbtwma6opreghrhu-362840097352.asia-southeast1.run.app'
    }
  ];

  const categories = ['All', 'Frontend', 'Full-stack', 'AI'];
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
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold font-display mb-4">Featured <span className="gradient-text">Projects</span></h2>
            <p className="text-text-secondary">A selection of my recent work and personal experiments.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-purple-accent text-white' : 'glass text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid md:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="glass rounded-3xl overflow-hidden group cursor-pointer"
              >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-purple-accent/10 text-purple-accent rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-6">{project.desc}</p>
                <div className="flex gap-4">
                  <span className="text-sm font-semibold flex items-center gap-1 text-purple-accent">
                    View Details <ChevronRight size={14} />
                  </span>
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
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
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
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {selectedProject.longDesc}
                </p>
                
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
      year: '2025 - 2027',
      title: 'BCA [ Web Development & Computer Applications ]',
      company: 'Savitribai Phule Pune University',
      desc: 'College: NACAS AHILYANAGAR. Focused on modern web technologies, full-stack development, and core CS fundamentals.'
    },
    {
      year: '2025',
      title: 'Full Stack Web Development',
      company: 'Geeks for Geeks',
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

          <motion.div variants={itemVariants} className="flex flex-col justify-center items-center glass p-12 rounded-3xl text-center">
            <div className="p-6 bg-purple-accent/10 rounded-full text-purple-accent mb-6">
              <Download size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready to see more?</h3>
            <p className="text-text-secondary mb-8">Download my full resume to see my complete experience, certifications, and achievements.</p>
            <a 
              href="#" 
              download="Suraj_Resume.pdf"
              className="btn-primary flex items-center gap-2"
              onClick={(e) => {
                if (e.currentTarget.getAttribute('href') === '#') {
                  e.preventDefault();
                  alert('Please provide a valid link to your resume file in the code (App.tsx line 746).');
                }
              }}
            >
              Download Resume <Download size={18} />
            </a>
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
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 focus:border-purple-accent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 focus:border-purple-accent outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 focus:border-purple-accent outline-none transition-all" placeholder="Your message here..."></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
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
          © 2025 Suraj. All rights reserved.
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
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About theme={theme} />
        <Skills theme={theme} />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
