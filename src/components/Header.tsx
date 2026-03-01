import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-input-background border-b border-input-border">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-xl text-primary leading-tight">
                Financial Research AI
              </h2>
              <p className="font-paragraph text-xs text-foreground/60">
                Secure Platform
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="font-paragraph text-sm text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="font-paragraph text-sm text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="font-paragraph text-sm text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
