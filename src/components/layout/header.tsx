
"use client";

import Link from 'next/link';
import { ShoppingCart, Instagram, Facebook, MessageSquare } from 'lucide-react'; // Import Facebook and MessageSquare
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useIsClient } from '@/hooks/use-is-client';
import { Logo } from '@/components/icons/logo'; 

export function Header() {
  const { cartItems } = useCartStore(); 
  const isClient = useIsClient();
  
  const itemCount = isClient ? cartItems.reduce((count, item) => count + (item.quantity || 0), 0) : 0;

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo className="h-10 w-auto text-primary fill-primary/50" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/crear-kit" passHref legacyBehavior>
              <a className="text-primary hover:text-link-hover-blue text-sm font-medium px-3 py-2 rounded-md transition-colors">
                Arma tu kit
              </a>
            </Link>
            <Link href="/kits-predisenados" passHref legacyBehavior>
              <a className="text-primary hover:text-link-hover-blue text-sm font-medium px-3 py-2 rounded-md transition-colors">
                Kits disponibles
              </a>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center">
          <Link href="https://www.instagram.com/alcoffee_col/" target="_blank" rel="noopener noreferrer" passHref>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-primary hover:text-link-hover-blue hover:bg-transparent mr-2"
              aria-label="Síguenos en Instagram"
            >
              <Instagram className="w-6 h-6" />
            </Button>
          </Link>
          <Link href="https://www.facebook.com/share/1J6rxxbSq8/" target="_blank" rel="noopener noreferrer" passHref>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-primary hover:text-link-hover-blue hover:bg-transparent mr-2"
              aria-label="Síguenos en Facebook"
            >
              <Facebook className="w-6 h-6" />
            </Button>
          </Link>
          <Link href="https://wa.me/3153042476" target="_blank" rel="noopener noreferrer" passHref>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-primary hover:text-link-hover-blue hover:bg-transparent mr-2"
              aria-label="Contáctanos por WhatsApp"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </Link>
          <Link href="/carrito" passHref>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-primary hover:text-link-hover-blue hover:bg-transparent"
              aria-label="Ver Carrito"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
           {/* Mobile Menu Trigger - can be implemented with a Sheet component if needed */}
          <div className="md:hidden ml-2">
             {/* Example: <SheetTrigger asChild><Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button></SheetTrigger> */}
          </div>
        </div>
      </div>
    </header>
  );
}
