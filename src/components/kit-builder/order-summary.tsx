"use client";

import type { KitConfig } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, RotateCcw, Sparkles, Package, Puzzle, Coffee as CoffeeIcon } from 'lucide-react';
import { PACKAGING_COLORS, COFFEE_SIZES, ADDON_TYPES, MUG_TYPES } from '@/lib/constants';

interface OrderSummaryProps {
  kitConfig: KitConfig;
  onReset: () => void;
  currentStep: number;
  navigateToStep: (step: number) => void;
}

export function OrderSummary({ kitConfig, onReset, currentStep, navigateToStep }: OrderSummaryProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    // Basic validation: ensure essential parts are selected before adding to cart
    if (!kitConfig.coffee.size || !kitConfig.coffee.packagingColor || !kitConfig.addon.type || !kitConfig.mug.type) {
      toast({
        title: "Kit Incompleto",
        description: "Por favor, completa todos los pasos para agregar el kit al carrito.",
        variant: "destructive",
      });
      return;
    }

    const kitName = `Kit Personalizado ${new Date().toLocaleTimeString()}`;
    addToCart({ ...kitConfig, name: kitName, isPreset: false });
    toast({
      title: "¡Kit Agregado! 💖",
      description: `${kitName} ha sido añadido a tu carrito.`,
      className: "bg-primary/10 border-primary text-primary-foreground",
    });
    onReset(); // Reset for a new kit
  };
  
  const getLabel = (options: {value: string; label: string}[], value?: string) => options.find(opt => opt.value === value)?.label || 'No seleccionado';

  const isKitEmpty = !kitConfig.coffee.size && !kitConfig.coffee.packagingColor && !kitConfig.addon.type && !kitConfig.mug.type;

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2 text-primary">
          <Sparkles className="w-7 h-7" /> Tu Creación Mágica
        </CardTitle>
        <CardDescription>Así va quedando tu kit de café personalizado:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {isKitEmpty && <p className="text-muted-foreground text-center py-4">¡Empieza a seleccionar componentes para ver tu kit aquí!</p>}
        
        {!isKitEmpty && (
          <>
            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><Package className="w-4 h-4 text-secondary-foreground"/>Café:</h4>
              <p>Tamaño: <span className="font-medium">{getLabel(COFFEE_SIZES, kitConfig.coffee.size) || '...'}</span></p>
              <p>Empaque: <span className="font-medium">{getLabel(PACKAGING_COLORS, kitConfig.coffee.packagingColor) || '...'}</span></p>
              {currentStep !== 1 && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(1)}>Editar Café</Button>}
            </div>

            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><Puzzle className="w-4 h-4 text-secondary-foreground"/>Complemento:</h4>
              <p>Tipo: <span className="font-medium">{getLabel(ADDON_TYPES, kitConfig.addon.type) || '...'}</span></p>
              {kitConfig.addon.type === 'cuadro' && kitConfig.addon.cuadroDescription && (
                <p>Descripción Cuadro: <span className="font-medium italic">"{kitConfig.addon.cuadroDescription}"</span></p>
              )}
              {currentStep !== 2 && kitConfig.coffee.size && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(2)}>Editar Complemento</Button>}
            </div>

            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><CoffeeIcon className="w-4 h-4 text-secondary-foreground"/>Taza:</h4>
              <p>Tipo: <span className="font-medium">{getLabel(MUG_TYPES, kitConfig.mug.type) || '...'}</span></p>
              {kitConfig.mug.type === 'termica' && (
                <>
                  <p>Personalizada: <span className="font-medium">{kitConfig.mug.termicaMarked ? 'Sí' : 'No'}</span></p>
                  {kitConfig.mug.termicaMarked && kitConfig.mug.termicaPhrase && (
                    <p>Frase: <span className="font-medium italic">"{kitConfig.mug.termicaPhrase}"</span></p>
                  )}
                </>
              )}
              {currentStep !== 3 && kitConfig.addon.type && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(3)}>Editar Taza</Button>}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleAddToCart} className="w-full font-semibold" disabled={isKitEmpty}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Agregar al Carrito
        </Button>
        <Button variant="outline" onClick={onReset} className="w-full">
          <RotateCcw className="mr-2 h-5 w-5" /> Limpiar Kit
        </Button>
      </CardFooter>
    </Card>
  );
}
