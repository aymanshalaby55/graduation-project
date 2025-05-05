'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { ModeToggle } from './ThemeToggle';
import { useUserContext } from '@/context/UserContext';
import { Logo } from './Logo';
import Dropdown from './Dropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user }: any = useUserContext();
  const loggedIn = !!user;
  return (
    <nav className=" w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex gap-2 items-center">
              <Logo
                title={'VisionAI Chrono'}
                styles="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent text-2xl md:text-4xl font-medium tracking-tight text-center"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/#home"
              className="text-foreground/80 hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="text-foreground/80 hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/community"
              className="text-foreground/80 hover:text-foreground"
            >
              Community
            </Link>
            <Link
              href="/#contact"
              className="text-foreground/80 hover:text-foreground"
            >
              Contact
            </Link>
            <ModeToggle />
            <Dropdown />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Dropdown />
            <Button
              variant="ghost"
              className="ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/#home"
                className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#features"
                className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/community"
                className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <Link
                href="/#contact"
                className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
