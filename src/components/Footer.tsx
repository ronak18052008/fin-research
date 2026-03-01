import { AlertTriangle, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Disclaimer */}
          <div className="md:col-span-2">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-paragraph font-semibold text-lg mb-2">
                  Important Disclaimer
                </h3>
                <p className="font-paragraph text-sm text-primary-foreground/90 leading-relaxed">
                  This platform provides financial analysis, not investment advice. All information is for educational and research purposes only. Users should conduct their own due diligence and consult with qualified financial advisors before making any investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-paragraph font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:support@finresearch.ai"
                  className="font-paragraph text-sm hover:text-accent-muted transition-colors"
                >
                  support@finresearch.ai
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+911234567890"
                  className="font-paragraph text-sm hover:text-accent-muted transition-colors"
                >
                  +91 123 456 7890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} Financial Research AI Agent. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="font-paragraph text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
