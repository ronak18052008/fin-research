// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Lock, Shield, TrendingUp, BarChart3, AlertCircle, CheckCircle2, ArrowRight, Globe, PieChart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from '@/components/ui/image';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Types & Interfaces ---
interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// --- Components ---

const MarketTicker = () => {
  // Simulating a live market ticker for background ambience
  const tickerItems = [
    { symbol: "NIFTY", change: "+1.2%" },
    { symbol: "SENSEX", change: "+0.8%" },
    { symbol: "BANKNIFTY", change: "-0.3%" },
    { symbol: "USD/INR", change: "+0.1%" },
    { symbol: "RELIANCE", change: "+1.5%" },
    { symbol: "TCS", change: "-0.4%" },
    { symbol: "INFY", change: "+0.9%" },
    { symbol: "HDFCBANK", change: "+0.2%" },
  ];

  return (
    <div className="flex overflow-hidden whitespace-nowrap opacity-20 select-none">
      <motion.div 
        className="flex gap-8 py-4"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-primary-foreground/80 font-paragraph text-sm">
            <span className="font-bold">{item.symbol}</span>
            <span className={item.change.startsWith('+') ? 'text-accent-muted' : 'text-destructive-foreground'}>
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  // --- Canonical Data Sources (Preserved) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- Logic Preservation ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Simulate authentication
    setTimeout(() => {
      setError('Demo mode: Authentication endpoint not configured');
      setIsLoading(false);
    }, 1000);
  };

  // --- Scroll Hooks for Parallax ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-paragraph overflow-x-hidden selection:bg-secondary selection:text-white">
      <Header />

      <main className="flex-1 flex flex-col lg:flex-row relative" ref={containerRef}>
        
        {/* --- LEFT SECTION: Brand & Vision (Sticky on Desktop) --- */}
        <div className="relative w-full lg:w-1/2 lg:h-[calc(100vh-80px)] lg:sticky lg:top-[80px] bg-primary overflow-hidden flex flex-col justify-between">
          
          {/* Background Layers */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-20"
            style={{ y: yBackground }}
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
             {/* Abstract Gradient Mesh */}
             <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-primary via-[#0f3057] to-secondary opacity-60 blur-3xl"></div>
          </motion.div>

          {/* Decorative Image Overlay */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10 pointer-events-none">
             <Image 
               src="https://static.wixstatic.com/media/b17fdf_9baa5ee932424b8099970cfecc351f16~mv2.png?originWidth=1280&originHeight=704" 
               alt="Financial Data Pattern" 
               className="w-full h-full object-cover grayscale"
             />
          </div>

          {/* Content Container */}
          <div className="relative z-10 p-8 lg:p-16 flex flex-col h-full justify-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Logo / Brand Mark */}
              <motion.div variants={slideInLeft} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 w-fit">
                <Shield className="w-5 h-5 text-accent-muted" />
                <span className="text-primary-foreground text-sm font-medium tracking-wide">SECURE ACCESS PORTAL</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 variants={slideInLeft} className="font-heading text-4xl lg:text-6xl text-primary-foreground leading-[1.1]">
                Intelligence for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                  Modern Market.
                </span>
              </motion.h1>

              <motion.p variants={slideInLeft} className="text-primary-foreground/70 text-lg max-w-md leading-relaxed">
                Access institutional-grade analytics and AI-driven insights for the Indian stock market. Precision, speed, and security in one platform.
              </motion.p>

              {/* Feature Grid (Mini) */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <TrendingUp className="w-5 h-5 text-accent-muted" />
                  </div>
                  <div>
                    <h3 className="text-primary-foreground font-medium mb-1">Real-time Analysis</h3>
                    <p className="text-primary-foreground/50 text-xs">Live market data processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <Lock className="w-5 h-5 text-accent-muted" />
                  </div>
                  <div>
                    <h3 className="text-primary-foreground font-medium mb-1">Bank-Grade Security</h3>
                    <p className="text-primary-foreground/50 text-xs">256-bit encryption standard</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Ticker */}
          <div className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <MarketTicker />
          </div>
        </div>

        {/* --- RIGHT SECTION: Login Form (Scrollable on Mobile, Full Height on Desktop) --- */}
        <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center items-center p-6 lg:p-12 min-h-[calc(100vh-80px)]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[28rem] space-y-8"
          >
            {/* Mobile Header (Visible only on small screens if needed, but we keep the layout clean) */}
            <div className="lg:hidden text-center mb-8">
               <h2 className="font-heading text-2xl text-primary">Welcome Back</h2>
               <p className="text-foreground/60 text-sm">Sign in to your research dashboard</p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-input-border/40 p-8 lg:p-10 relative overflow-hidden">
              
              {/* Decorative Top Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

              <div className="mb-8">
                <h2 className="font-heading text-2xl lg:text-3xl text-primary mb-2">Sign In</h2>
                <p className="font-paragraph text-sm text-foreground/60">
                  Enter your credentials to access the terminal.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-destructive/5 border-l-4 border-destructive rounded-r-md p-4 flex items-start gap-3 overflow-hidden"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="font-paragraph text-sm text-destructive font-medium">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2 group">
                  <Label htmlFor="email" className="font-paragraph text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all pl-4"
                      disabled={isLoading}
                    />
                    {email && email.includes('@') && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-3.5 text-secondary">
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 group">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-paragraph text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">
                      Password
                    </Label>
                    <button
                      type="button"
                      className="text-xs font-medium text-primary/70 hover:text-primary hover:underline transition-colors"
                      onClick={() => setError('Password recovery is not available in demo mode')}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-medium rounded-lg h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-spin" /> Authenticating...
                    </span>
                  ) : (
                    <>
                      Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-input-border/50 text-center">
                <p className="text-sm text-foreground/60">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-primary font-semibold hover:text-secondary transition-colors"
                    onClick={() => navigate('/register')}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center opacity-60">
               <div className="flex flex-col items-center gap-1">
                 <Globe className="w-5 h-5 text-primary" />
                 <span className="text-[10px] uppercase tracking-wider font-medium">Global Data</span>
               </div>
               <div className="flex flex-col items-center gap-1">
                 <PieChart className="w-5 h-5 text-primary" />
                 <span className="text-[10px] uppercase tracking-wider font-medium">Deep Analytics</span>
               </div>
               <div className="flex flex-col items-center gap-1">
                 <Shield className="w-5 h-5 text-primary" />
                 <span className="text-[10px] uppercase tracking-wider font-medium">Secure Core</span>
               </div>
            </div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}