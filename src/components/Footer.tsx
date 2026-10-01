import Link from "next/link";
import Image from "next/image";
import { Code2, Globe, Mail, ShieldCheck } from "lucide-react";
import SystemStatusBadge from "@/components/SystemStatusBadge";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/85 backdrop-blur-md border-t border-black/[0.07] pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={siteConfig.logoPath}
                alt={siteConfig.logoAlt}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-semibold tracking-tight text-foreground text-lg md:text-xl">
                {siteConfig.brandName}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Profile and engineering portfolio of{" "}
              <span className="text-foreground font-semibold">{siteConfig.engineerName}</span>,{" "}
              {siteConfig.engineerTitle}.
            </p>
            <div className="pt-1 space-y-2 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground">
                <ShieldCheck size={14} className="text-accent shrink-0" />
                <span>{siteConfig.businessRegistrationLabel}</span>
              </div>
              <div>
                <a
                  href={siteConfig.mailtoUrl}
                  className="inline-flex items-center gap-2 text-accent hover:underline break-all"
                >
                  <Mail size={14} className="shrink-0" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold text-foreground mb-5 text-xs font-mono tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-accent transition-colors font-medium">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-accent transition-colors font-medium">Portfolio</Link></li>
              <li><Link href="/engineering" className="hover:text-accent transition-colors font-medium">Engineering</Link></li>
              <li><Link href="/insights" className="hover:text-accent transition-colors font-medium">Insights</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors font-medium">About</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-semibold text-foreground mb-5 text-xs font-mono tracking-wider uppercase">
              Professional &amp; Direct Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center gap-2 font-medium"
                >
                  <Code2 size={16} /> GitHub ({siteConfig.githubUsername})
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.mailtoUrl}
                  className="hover:text-accent transition-colors inline-flex items-center gap-2 font-medium break-all"
                >
                  <Mail size={16} className="shrink-0" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors inline-flex items-center gap-2 font-medium"
                >
                  <Globe size={16} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold text-foreground mb-5 text-xs font-mono tracking-wider uppercase">
              Legal
            </h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors font-medium">Terms of Service</Link></li>
              <li className="text-xs font-mono text-muted-foreground pt-1">
                {siteConfig.businessRegistrationLabel}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/[0.06] pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-medium text-center lg:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>&copy; {currentYear} {siteConfig.brandName}. All rights reserved.</span>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="font-mono text-xs text-foreground">
              {siteConfig.businessRegistrationLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <SystemStatusBadge />
            <div className="font-mono text-xs px-3.5 py-1.5 bg-secondary border border-black/[0.06] text-foreground rounded-full">
              Engineered in Kenya
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
