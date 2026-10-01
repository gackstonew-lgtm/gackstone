"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/engineering", label: "Engineering" },
    { href: "/insights", label: "Insights" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "glass border-black/[0.06] py-3.5"
            : "bg-background/85 backdrop-blur-sm border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 group z-50 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src={siteConfig.logoPath}
              alt={siteConfig.logoAlt}
              width={40}
              height={40}
              priority
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-semibold tracking-tight text-foreground text-base lg:text-lg whitespace-nowrap">
              <span className="hidden sm:inline">{siteConfig.brandName}</span>
              <span className="sm:hidden">{siteConfig.shortBrandName}</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 z-50 shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_14px_rgba(15,23,42,0.12)] whitespace-nowrap"
            >
              Start a Project
            </Link>
            <button
              className="md:hidden text-foreground p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 pb-8 px-6 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-5 mt-6" aria-label="Mobile Navigation">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-semibold tracking-tight ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-auto space-y-3"
            >
              <Link
                href="/contact"
                className="w-full inline-flex justify-center px-5 py-4 bg-primary text-primary-foreground text-base font-semibold rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
