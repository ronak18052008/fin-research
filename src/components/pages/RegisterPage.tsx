import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, ArrowRight, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate registration - in production, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage for demo purposes
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        registeredAt: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      setSuccess('Account created successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-paragraph overflow-x-hidden selection:bg-secondary selection:text-white">
      <Header />

      <main className="flex-1 flex flex-col lg:flex-row relative">
        
        {/* --- LEFT SECTION: Brand & Vision --- */}
        <div className="relative w-full lg:w-1/2 lg:h-[calc(100vh-80px)] lg:sticky lg:top-[80px] bg-primary overflow-hidden flex flex-col justify-between">
          
          {/* Background Layers */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-primary via-[#0f3057] to-secondary opacity-60 blur-3xl"></div>
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
                <span className="text-primary-foreground text-sm font-medium tracking-wide">JOIN OUR PLATFORM</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 variants={slideInLeft} className="font-heading text-4xl lg:text-6xl text-primary-foreground leading-[1.1]">
                Start Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                  Market Journey.
                </span>
              </motion.h1>

              <motion.p variants={slideInLeft} className="text-primary-foreground/70 text-lg max-w-md leading-relaxed">
                Create your account to access institutional-grade analytics and AI-driven insights for the Indian stock market.
              </motion.p>

              {/* Feature Grid (Mini) */}
              <motion.div variants={slideInLeft} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <Lock className="w-5 h-5 text-accent-muted" />
                  </div>
                  <div>
                    <h3 className="text-primary-foreground font-medium mb-1">Secure Registration</h3>
                    <p className="text-primary-foreground/50 text-xs">Your data is encrypted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <Shield className="w-5 h-5 text-accent-muted" />
                  </div>
                  <div>
                    <h3 className="text-primary-foreground font-medium mb-1">Instant Access</h3>
                    <p className="text-primary-foreground/50 text-xs">Start trading immediately</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --- RIGHT SECTION: Registration Form --- */}
        <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center items-center p-6 lg:p-12 min-h-[calc(100vh-80px)]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[28rem] space-y-8"
          >
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <h2 className="font-heading text-2xl text-primary">Create Account</h2>
              <p className="text-foreground/60 text-sm">Join thousands of traders</p>
            </div>

            {/* Registration Card */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-input-border/40 p-8 lg:p-10 relative overflow-hidden">
              
              {/* Decorative Top Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

              <div className="mb-8">
                <h2 className="font-heading text-2xl lg:text-3xl text-primary mb-2">Create Account</h2>
                <p className="font-paragraph text-sm text-foreground/60">
                  Fill in your details to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-accent-muted/10 border-l-4 border-accent-muted rounded-r-md p-4 flex items-start gap-3 overflow-hidden"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-muted flex-shrink-0 mt-0.5" />
                      <p className="font-paragraph text-sm text-accent-muted font-medium">{success}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* First Name */}
                <div className="space-y-2 group">
                  <Label htmlFor="firstName" className="font-paragraph text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all pl-4"
                    disabled={isLoading}
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2 group">
                  <Label htmlFor="lastName" className="font-paragraph text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all pl-4"
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="font-paragraph text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all pl-4"
                      disabled={isLoading}
                    />
                    {formData.email && formData.email.includes('@') && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-3.5 text-secondary">
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2 group">
                  <Label htmlFor="password" className="font-paragraph text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-foreground/50">Minimum 6 characters</p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2 group">
                  <Label htmlFor="confirmPassword" className="font-paragraph text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all"
                      disabled={isLoading}
                    />
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-3.5 text-secondary">
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-medium rounded-lg h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-input-border/50 text-center">
                <p className="text-sm text-foreground/60">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
