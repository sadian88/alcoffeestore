
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card/50 py-8 mt-auto"> {/* Changed mt-12 to mt-auto */}
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          Hecho con <Heart className="w-4 h-4 text-primary inline-block" /> por alCoffee Devs &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs mt-1">¡Disfruta tu café perfecto!</p>
      </div>
    </footer>
  );
}

    