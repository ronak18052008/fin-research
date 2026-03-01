import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, CheckCircle2, AlertCircle, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'email' | 'otp' | 'password' | 'success';

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // Simulate OTP sending
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setStep('otp');
      setOtpTimer(300); // 5 minutes
      setIsLoading(false);
    }, 1500);
  };

  // Simulate OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (otp === '123456') {
        setStep('password');
        setIsLoading(false);
      } else {
        setError('Invalid OTP. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  // Simulate password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all password fields');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStep('success');
      setIsLoading(false);
    }, 1500);
  };

  // Timer effect for OTP
  React.useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (step === 'success') {
      setStep('email');
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setOtpSent(false);
      setOtpTimer(0);
      onClose();
    } else {
      setStep('email');
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setOtpSent(false);
      setOtpTimer(0);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary to-secondary p-6 flex items-center justify-between">
                <h2 id="modal-title" className="font-heading text-xl text-primary-foreground">
                  {step === 'email' && 'Reset Password'}
                  {step === 'otp' && 'Verify OTP'}
                  {step === 'password' && 'Create New Password'}
                  {step === 'success' && 'Success!'}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Email */}
                  {step === 'email' && (
                    <motion.form
                      key="email"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSendOtp}
                      className="space-y-5"
                    >
                      <p className="text-sm text-foreground/70 mb-6">
                        Enter your registered email address and we'll send you an OTP to reset your password.
                      </p>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-destructive/5 border-l-4 border-destructive rounded-r-md p-4 flex items-start gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive font-medium">{error}</p>
                        </motion.div>
                      )}

                      <div className="space-y-2 group">
                        <Label htmlFor="reset-email" className="font-paragraph text-sm font-medium text-foreground/80">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-foreground/40" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all pl-10"
                            disabled={isLoading}
                            aria-label="Email address for password reset"
                          />
                          {email && email.includes('@') && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-3.5 text-secondary">
                              <CheckCircle2 className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-medium rounded-lg h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Sending OTP...
                          </span>
                        ) : (
                          <>
                            Send OTP <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}

                  {/* Step 2: OTP Verification */}
                  {step === 'otp' && (
                    <motion.form
                      key="otp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleVerifyOtp}
                      className="space-y-5"
                    >
                      <p className="text-sm text-foreground/70 mb-6">
                        We've sent a 6-digit OTP to <span className="font-semibold text-foreground">{email}</span>
                      </p>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-destructive/5 border-l-4 border-destructive rounded-r-md p-4 flex items-start gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive font-medium">{error}</p>
                        </motion.div>
                      )}

                      <div className="space-y-2 group">
                        <Label htmlFor="otp-input" className="font-paragraph text-sm font-medium text-foreground/80">
                          Enter OTP
                        </Label>
                        <Input
                          id="otp-input"
                          type="text"
                          placeholder="000000"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          maxLength={6}
                          className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all text-center text-2xl tracking-widest"
                          disabled={isLoading}
                          aria-label="One-time password"
                        />
                      </div>

                      {otpTimer > 0 && (
                        <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
                          <Clock className="w-4 h-4" />
                          <span>OTP expires in {formatTime(otpTimer)}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-medium rounded-lg h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          <>
                            Verify OTP <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>

                      <button
                        type="button"
                        onClick={() => {
                          setStep('email');
                          setOtp('');
                          setError('');
                        }}
                        className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Back to Email
                      </button>
                    </motion.form>
                  )}

                  {/* Step 3: New Password */}
                  {step === 'password' && (
                    <motion.form
                      key="password"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleResetPassword}
                      className="space-y-5"
                    >
                      <p className="text-sm text-foreground/70 mb-6">
                        Create a strong new password for your account.
                      </p>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-destructive/5 border-l-4 border-destructive rounded-r-md p-4 flex items-start gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive font-medium">{error}</p>
                        </motion.div>
                      )}

                      <div className="space-y-2 group">
                        <Label htmlFor="new-password" className="font-paragraph text-sm font-medium text-foreground/80">
                          New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-foreground/40" />
                          <Input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all pl-10"
                            disabled={isLoading}
                            aria-label="New password"
                          />
                        </div>
                        <p className="text-xs text-foreground/50 mt-2">
                          Must be at least 6 characters long
                        </p>
                      </div>

                      <div className="space-y-2 group">
                        <Label htmlFor="confirm-password" className="font-paragraph text-sm font-medium text-foreground/80">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-foreground/40" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="font-paragraph h-12 bg-input-background border-input-border focus:border-primary focus:ring-primary/20 transition-all pl-10"
                            disabled={isLoading}
                            aria-label="Confirm password"
                          />
                          {newPassword && confirmPassword && newPassword === confirmPassword && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-3.5 text-secondary">
                              <CheckCircle2 className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-medium rounded-lg h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Resetting...
                          </span>
                        ) : (
                          <>
                            Reset Password <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}

                  {/* Step 4: Success */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6 text-center py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="flex justify-center"
                      >
                        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-secondary" />
                        </div>
                      </motion.div>

                      <div>
                        <h3 className="font-heading text-xl text-primary mb-2">Password Reset Successfully!</h3>
                        <p className="text-sm text-foreground/70">
                          Your password has been updated. You can now sign in with your new password.
                        </p>
                      </div>

                      <Button
                        onClick={handleClose}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-medium rounded-lg h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                      >
                        Back to Sign In
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
