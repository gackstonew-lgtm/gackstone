import Link from "next/link";
import { Code2, Globe, Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <Terminal size={24} className="text-accent group-hover:text-primary transition-colors" />
              <span className="font-bold tracking-tight text-primary text-xl">GacksDev</span>
            </Link>
            <div className="text-muted-foreground text-sm leading-relaxed">
              Software Engineering by<br/>
              <span className="text-primary font-medium">Quantum Code Technologies</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-primary mb-6 text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-accent transition-colors font-medium">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-accent transition-colors font-medium">Portfolio</Link></li>
              <li><Link href="/insights" className="hover:text-accent transition-colors font-medium">Insights</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors font-medium">About</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-6 text-sm tracking-wider uppercase">Professional</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com/gackstonew-lgtm" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors inline-flex items-center gap-2 font-medium">
                  <Code2 size={16} /> GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors inline-flex items-center gap-2 font-medium">
                  <Globe size={16} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-6 text-sm tracking-wider uppercase">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-medium">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground font-medium">
          <div>&copy; {currentYear} Quantum Code Technologies. All rights reserved.</div>
          <div className="font-mono text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full">Engineered in Kenya</div>
        </div>
      </div>
    </footer>
  );
}
