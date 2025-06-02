import { PresetKitCard } from '@/components/kits/preset-kit-card';
import { PRESET_KITS_DATA } from '@/lib/constants';
import { Gift } from 'lucide-react';

export default function KitsPredisenadosPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12 space-y-3">
        <div className="inline-block p-3 bg-accent/20 rounded-full">
         <Gift className="w-12 h-12 text-accent" />
        </div>
        <h1 className="text-4xl font-headline font-bold text-primary">
          Nuestros Kits Prediseñados Encantadores
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Selecciones hechas con amor, listas para alegrar tu día o el de alguien especial.
        </p>
      </header>

      {PRESET_KITS_DATA.length === 0 ? (
        <p className="text-center text-muted-foreground text-xl">
          ¡Oh no! Parece que nuestros duendes del café están preparando nuevos kits. Vuelve pronto. 🧚☕
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRESET_KITS_DATA.map((kit) => (
            <PresetKitCard key={kit.id} kit={kit} />
          ))}
        </div>
      )}
    </div>
  );
}
