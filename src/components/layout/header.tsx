
"use client";

import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useIsClient } from '@/hooks/use-is-client';
import { Logo } from '@/components/icons/logo'; 

export function Header() {
  const { cartItems } = useCartStore(); 
  const isClient = useIsClient();
  
  const itemCount = isClient ? cartItems.reduce((count, item) => count + (item.quantity || 0), 0) : 0;

  return (
    <header className="bg-secondary/70 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            {/* Using a simple heart icon, logo can be re-added if desired */}
            <Heart className="h-6 w-6 text-primary fill-primary/20" />
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/crear-kit" passHref>
              <Button variant="ghost" className="text-sm font-medium text-primary-foreground hover:bg-primary/10 hover:text-primary">
                Arma tu kit
              </Button>
            </Link>
            <Link href="/kits-predisenados" passHref>
              <Button variant="ghost" className="text-sm font-medium text-primary-foreground hover:bg-primary/10 hover:text-primary">
                Kits disponibles
              </Button>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center">
          <Link href="/carrito" passHref>
            <Button variant="ghost" size="icon" className="relative text-primary hover:text-primary/80 hover:bg-primary/10">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Ver Carrito</span>
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
