
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-transparent py-6"> 
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p className="flex items-center justify-center gap-1 text-sm">
          Hecho con <Heart className="w-4 h-4 text-primary inline-block fill-primary/30" /> por alCoffee Devs &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
