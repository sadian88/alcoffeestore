"use client";

import Link from 'next/link';
import { ShoppingCart, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useIsClient } from '@/hooks/use-is-client';

export function Header() {
  const { getCartItemCount } = useCartStore();
  const isClient = useIsClient();
  const itemCount = isClient ? getCartItemCount() : 0;

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-semibold text-primary hover:text-primary/80 transition-colors">
          <Coffee className="w-8 h-8" />
          <span>Kawa-Coffee Kit</span>
        </Link>
        <nav>
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
        </nav>
      </div>
    </header>
  );
}
