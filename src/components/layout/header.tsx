
"use client";

import Link from 'next/link';
import { ShoppingCart, Instagram, Facebook } from 'lucide-react'; // Import Facebook, remove MessageSquare
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useIsClient } from '@/hooks/use-is-client';
import { Logo } from '@/components/icons/logo'; 

// SVG para el icono de WhatsApp
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 512 512" {...props}>
    <path d="M256.064 0h-0.128C114.784 0 0 114.784 0 256c0 71.008 28.672 135.616 75.008 182.272L0 512l79.712-74.976c46.624 46.368 111.264 75.008 182.336 75.008 141.312 0 256-114.752 256-256S397.376 0 256.064 0zM405.024 361.504c-6.176 17.44-30.688 31.904-50.24 36.128-13.376 2.848-30.848 5.12-89.664-19.264-75.232-31.168-123.68-107.616-127.456-112.576-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624 26.176-62.304c6.176-6.176 12.864-7.36 17.44-7.36s14.688 0.448 19.264 6.176c3.616 6.176 10.464 22.208 13.376 30.496s5.12 14.688 2.848 23.936c-2.848 10.464-10.464 14.688-15.808 19.264-2.272 2.272-6.176 4.544-3.616 8.736 2.848 3.616 21.568 34.688 66.72 66.72 37.472 27.52 49.28 30.496 55.968 30.496c6.176 0 19.264-10.464 26.176-15.808 10.464-6.176 22.208-8.736 30.496-5.12 10.464 3.616 30.496 21.568 34.112 28.352s6.176 15.808 5.12 23.936c-1.28 6.176-7.36 10.464-15.808 14.688z"/>
  </svg>
);


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
              <WhatsAppIcon className="w-6 h-6" />
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

