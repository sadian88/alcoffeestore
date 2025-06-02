
"use client";

import type { KitConfig } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, RotateCcw, Sparkles, Package, Puzzle, Coffee as CoffeeIcon, DollarSign } from 'lucide-react';
import { 
  COFFEE_SIZES, 
  MUG_OPTIONS, 
  ADDON_OPTIONS,
  PACKAGING_COLORS,
  findOption,
  findVariation,
  findPackagingColor,
  findCoffeeSize
} from '@/lib/constants';

interface OrderSummaryProps {
  kitConfig: KitConfig;
  onReset: () => void;
  currentStep: number;
  navigateToStep: (step: number) => void;
  isStepValid: (step: number) => boolean;
  calculatePrice: (kitConfig: KitConfig) => number;
}

export function OrderSummary({ kitConfig, onReset, currentStep, navigateToStep, isStepValid, calculatePrice }: OrderSummaryProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const getCoffeeSizeLabel = (value?: string) => findCoffeeSize(value)?.label || 'No seleccionado';
  const getPackagingColorLabel = (value?: string) => findPackagingColor(value)?.label || 'No seleccionado';


  const getDisplayableSelection = (itemType: 'mug' | 'addon') => {
    const selection = itemType === 'mug' ? kitConfig.mug : kitConfig.addon;
    const configOptions = itemType === 'mug' ? MUG_OPTIONS : ADDON_OPTIONS;

    if (!selection.type) return '...';
    
    const typeConfig = findOption(configOptions, selection.type);
    let label = typeConfig?.label || 'No seleccionado';

    if (selection.variation) {
      const variationConfig = findVariation(typeConfig, selection.variation);
      if (variationConfig && (variationConfig.value !== 'default' || (typeConfig?.variations?.length ?? 0) > 1)) {
        label += `, ${variationConfig.label}`;
      }
    }
    return label;
  };


  const handleAddToCart = () => {
    if (!isEntireKitValid) {
       toast({ title: "Kit Incompleto", description: "Por favor, completa todos los pasos y selecciones de tu kit.", variant: "destructive" });
      if (!isStepValid(1)) navigateToStep(1);
      else if (!isStepValid(2)) navigateToStep(2);
      else if (!isStepValid(3)) navigateToStep(3);
      return;
    }

    const kitName = `Kit Personalizado ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const finalPrice = calculatePrice(kitConfig); // Use the passed function
    addToCart({ ...kitConfig, name: kitName, isPreset: false, price: finalPrice });
    toast({
      title: "¡Kit Agregado! 💖",
      description: `${kitName} ha sido añadido a tu carrito.`,
      className: "bg-primary/10 border-primary text-primary-foreground",
    });
    onReset();
  };
  

  const isKitEmpty = !kitConfig.coffee.size && !kitConfig.coffee.packagingColor && !kitConfig.addon.type && !kitConfig.mug.type;
  const isEntireKitValid = isStepValid(1) && isStepValid(2) && isStepValid(3);
  const currentPrice = kitConfig.price || 0;

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2 text-primary">
          <Sparkles className="w-7 h-7" /> Tu Creación Mágica
        </CardTitle>
        <CardDescription>Así va quedando tu kit de café personalizado:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {isKitEmpty && <p className="text-muted-foreground text-center py-4">¡Empieza a seleccionar componentes para ver tu kit aquí!</p>}
        
        {!isKitEmpty && (
          <>
            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><Package className="w-4 h-4 text-secondary-foreground"/>Café:</h4>
              <p>Tamaño: <span className="font-medium">{getCoffeeSizeLabel(kitConfig.coffee.size) || '...'}</span></p>
              <p>Empaque: <span className="font-medium">{getPackagingColorLabel(kitConfig.coffee.packagingColor) || '...'}</span></p>
              {currentStep !== 1 && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(1)}>Editar Café</Button>}
            </div>

            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><Puzzle className="w-4 h-4 text-secondary-foreground"/>Complemento:</h4>
              <p>Selección: <span className="font-medium">{getDisplayableSelection('addon')}</span></p>
              {kitConfig.addon.type === 'cuadro' && kitConfig.addon.cuadroDescription && (
                <p>Descripción Cuadro: <span className="font-medium italic">"{kitConfig.addon.cuadroDescription}"</span></p>
              )}
              {currentStep !== 2 && kitConfig.coffee.size && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(2)}>Editar Complemento</Button>}
            </div>

            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><CoffeeIcon className="w-4 h-4 text-secondary-foreground"/>Taza:</h4>
              <p>Selección: <span className="font-medium">{getDisplayableSelection('mug')}</span></p>
              {kitConfig.mug.type === 'termica' && (
                <>
                  <p>Personalizada: <span className="font-medium">{typeof kitConfig.mug.termicaMarked !== 'undefined' ? (kitConfig.mug.termicaMarked ? 'Sí' : 'No') : '...'}</span></p>
                  {kitConfig.mug.termicaMarked && kitConfig.mug.termicaPhrase && (
                    <p>Frase: <span className="font-medium italic">"{kitConfig.mug.termicaPhrase}"</span></p>
                  )}
                </>
              )}
              {currentStep !== 3 && kitConfig.addon.type && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(3)}>Editar Taza</Button>}
            </div>
            
            <div className="pt-3 mt-3 border-t border-border">
                 <h4 className="font-semibold flex items-center gap-2 text-lg text-primary">
                    <DollarSign className="w-5 h-5"/>Precio Estimado del Kit:
                </h4>
                <p className="text-2xl font-bold text-accent">
                    ${currentPrice.toFixed(2)}
                </p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleAddToCart} className="w-full font-semibold" disabled={isKitEmpty || !isEntireKitValid }>
          <ShoppingCart className="mr-2 h-5 w-5" /> Agregar al Carrito
        </Button>
        <Button variant="outline" onClick={onReset} className="w-full">
          <RotateCcw className="mr-2 h-5 w-5" /> Limpiar Kit
        </Button>
      </CardFooter>
    </Card>
  );
}
