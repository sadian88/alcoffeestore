
"use client";

import type { KitConfig, CoffeeSelection, AddonSelection, MugSelection } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, RotateCcw, Sparkles, Package, Puzzle, Coffee as CoffeeIcon, DollarSign, PlusCircle } from 'lucide-react';
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
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
  kitConfig: KitConfig;
  onReset: () => void;
  currentStep: number;
  navigateToStep: (step: number) => void;
  isStepValid: (step: number) => boolean;
  calculateCoffeePrice: (coffee: CoffeeSelection) => number;
  calculateAddonPrice: (addon: AddonSelection) => number;
  calculateMugPrice: (mug: MugSelection) => number;
  onAddFullKit: () => void;
  onAddIndividualComponent: (componentType: 'coffee' | 'addon' | 'mug') => void;
}

export function OrderSummary({ 
  kitConfig, 
  onReset, 
  currentStep, 
  navigateToStep, 
  isStepValid,
  calculateCoffeePrice,
  calculateAddonPrice,
  calculateMugPrice,
  onAddFullKit,
  onAddIndividualComponent
}: OrderSummaryProps) {
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

  const coffeePrice = isStepValid(1) ? calculateCoffeePrice(kitConfig.coffee) : 0;
  const addonPrice = isStepValid(2) ? calculateAddonPrice(kitConfig.addon) : 0;
  const mugPrice = isStepValid(3) ? calculateMugPrice(kitConfig.mug) : 0;
  const totalKitPrice = coffeePrice + addonPrice + mugPrice;

  const isKitEmpty = !kitConfig.coffee.size && !kitConfig.coffee.packagingColor && !kitConfig.addon.type && !kitConfig.mug.type;
  const isEntireKitValid = isStepValid(1) && isStepValid(2) && isStepValid(3);

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2 text-primary">
          <Sparkles className="w-7 h-7" /> Tu Creación Mágica
        </CardTitle>
        <CardDescription>Así va quedando tu kit y sus componentes:</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {isKitEmpty && <p className="text-muted-foreground text-center py-4">¡Empieza a seleccionar componentes para ver tu kit aquí!</p>}
        
        {!isKitEmpty && (
          <>
            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><Package className="w-4 h-4 text-secondary-foreground"/>Café: ${formatPrice(coffeePrice)}</h4>
              <p>Tamaño: <span className="font-medium">{getCoffeeSizeLabel(kitConfig.coffee.size) || '...'}</span></p>
              <p>Empaque: <span className="font-medium">{getPackagingColorLabel(kitConfig.coffee.packagingColor) || '...'}</span></p>
              {currentStep !== 1 && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(1)}>Editar Café</Button>}
               <Button variant="outline" size="sm" className="w-full mt-1 text-xs" onClick={() => onAddIndividualComponent('coffee')} disabled={!isStepValid(1)}>
                <PlusCircle className="mr-1 h-3 w-3" /> Agregar Sólo Café
              </Button>
            </div>

            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><Puzzle className="w-4 h-4 text-secondary-foreground"/>Complemento: ${formatPrice(addonPrice)}</h4>
              <p>Selección: <span className="font-medium">{getDisplayableSelection('addon')}</span></p>
              {kitConfig.addon.type === 'cuadro' && kitConfig.addon.cuadroDescription && (
                <p>Descripción Cuadro: <span className="font-medium italic">"{kitConfig.addon.cuadroDescription}"</span></p>
              )}
              {currentStep !== 2 && kitConfig.coffee.size && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => navigateToStep(2)}>Editar Complemento</Button>}
              <Button variant="outline" size="sm" className="w-full mt-1 text-xs" onClick={() => onAddIndividualComponent('addon')} disabled={!isStepValid(2)}>
                <PlusCircle className="mr-1 h-3 w-3" /> Agregar Sólo Complemento
              </Button>
            </div>

            <div className="space-y-1 p-3 bg-secondary/30 rounded-md">
              <h4 className="font-semibold flex items-center gap-2"><CoffeeIcon className="w-4 h-4 text-secondary-foreground"/>Taza: ${formatPrice(mugPrice)}</h4>
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
              <Button variant="outline" size="sm" className="w-full mt-1 text-xs" onClick={() => onAddIndividualComponent('mug')} disabled={!isStepValid(3)}>
                <PlusCircle className="mr-1 h-3 w-3" /> Agregar Sólo Taza
              </Button>
            </div>
            
            <div className="pt-3 mt-3 border-t border-border">
                 <h4 className="font-semibold flex items-center gap-2 text-lg text-primary">
                    <DollarSign className="w-5 h-5"/>Precio Total del Kit:
                </h4>
                <p className="text-2xl font-bold text-accent">
                    ${formatPrice(totalKitPrice)}
                </p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={onAddFullKit} className="w-full font-semibold" disabled={isKitEmpty || !isEntireKitValid }>
          <ShoppingCart className="mr-2 h-5 w-5" /> Agregar Kit Completo
        </Button>
        <Button variant="outline" onClick={onReset} className="w-full">
          <RotateCcw className="mr-2 h-5 w-5" /> Limpiar Selección Actual
        </Button>
      </CardFooter>
    </Card>
  );
}
