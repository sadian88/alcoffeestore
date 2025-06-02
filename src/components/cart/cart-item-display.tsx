
"use client";

import Image from 'next/image';
import type { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Package, Puzzle, Coffee as CoffeeIcon } from 'lucide-react';
import { 
  PRESET_KITS_DATA, 
  MUG_OPTIONS, 
  ADDON_OPTIONS,
  COFFEE_SIZES,
  PACKAGING_COLORS,
  findOption,
  findVariation,
  findPackagingColor
} from '@/lib/constants';


interface CartItemDisplayProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
}

export function CartItemDisplay({ item, onRemove }: CartItemDisplayProps) {
  const presetData = item.isPreset ? PRESET_KITS_DATA.find(pk => pk.id === item.id) : null;
  
  const coffeeSizeLabel = COFFEE_SIZES.find(cs => cs.value === item.coffee.size)?.label || 'N/A';
  const packagingColorData = findPackagingColor(item.coffee.packagingColor);
  const packagingColorLabel = packagingColorData?.label || 'N/A';

  const getAddonDisplay = () => {
    if (!item.addon.type) return 'N/A';
    const addonType = findOption(ADDON_OPTIONS, item.addon.type);
    let label = addonType?.label || item.addon.type;
    if (item.addon.variation) {
      const variation = findVariation(addonType, item.addon.variation);
      if (variation && (variation.value !== 'default' || (addonType?.variations?.length ?? 0) > 1)) {
         label += `, ${variation.label}`;
      }
    }
    if (item.addon.type === 'cuadro' && item.addon.cuadroDescription) {
      label += ` ("${item.addon.cuadroDescription}")`;
    }
    return label;
  };

  const getMugDisplay = () => {
    if (!item.mug.type) return 'N/A';
    const mugType = findOption(MUG_OPTIONS, item.mug.type);
    let label = mugType?.label || item.mug.type;
    if (item.mug.variation) {
      const variation = findVariation(mugType, item.mug.variation);
      if (variation && (variation.value !== 'default' || (mugType?.variations?.length ?? 0) > 1)) {
        label += `, ${variation.label}`;
      }
    }
    if (item.mug.type === 'termica' && item.mug.termicaMarked && item.mug.termicaPhrase) {
      label += ` (Frase: "${item.mug.termicaPhrase}")`;
    } else if (item.mug.type === 'termica' && item.mug.termicaMarked) {
      label += ` (Personalizada)`;
    }
    return label;
  };
  
  const fallbackImageText = encodeURIComponent(item.name?.substring(0,10) || 'Kit');
  let imageUrl = item.image || presetData?.image;
  let imageHint = "coffee product";

  if (!imageUrl && !item.isPreset) {
    const mugConfig = findOption(MUG_OPTIONS, item.mug.type);
    const mugVariationConfig = findVariation(mugConfig, item.mug.variation);
    if (mugVariationConfig?.image) {
      imageUrl = mugVariationConfig.image.replace(/120x120|150x150/g, '100x100');
      imageHint = mugVariationConfig.dataAiHint;
    }

    if (!imageUrl) {
      const addonConfig = findOption(ADDON_OPTIONS, item.addon.type);
      const addonVariationConfig = findVariation(addonConfig, item.addon.variation);
      if (addonVariationConfig?.image) {
        imageUrl = addonVariationConfig.image.replace(/120x120|150x150/g, '100x100');
        imageHint = addonVariationConfig.dataAiHint;
      }
    }
    
    if (!imageUrl && packagingColorData?.image) {
        imageUrl = packagingColorData.image.replace(/100x100/g, '100x100'); // Assuming packaging images are already 100x100
        imageHint = packagingColorData.dataAiHint;
    }
  }
  
  if (!imageUrl) {
    imageUrl = `https://placehold.co/100x100/${item.isPreset ? 'E6E6FA/4A4A4A' : 'FFC0CB/4A4A4A'}?text=${fallbackImageText}`;
    imageHint = item.isPreset ? "preset gift" : "custom coffee";
  }


  return (
    <Card className="mb-4 shadow-md overflow-hidden">
      <div className="flex">
        <div className="w-1/4 p-2 flex items-center justify-center bg-secondary/20">
          <Image 
            src={imageUrl} 
            alt={item.name || 'Kit de Café'} 
            width={100} 
            height={100} 
            className="rounded-md object-cover"
            data-ai-hint={imageHint}
            />
        </div>
        <div className="w-3/4">
          <CardHeader className="flex flex-row justify-between items-start pb-2 pt-4 px-4">
            <CardTitle className="text-lg font-semibold text-primary">{item.name || (item.isPreset ? 'Kit Prediseñado' : 'Kit Personalizado')}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => onRemove(item.id!)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
              <X className="h-5 w-5" />
              <span className="sr-only">Eliminar item</span>
            </Button>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-1 px-4 pb-4">
            <p><Package className="inline mr-1 h-3 w-3" />Café: {coffeeSizeLabel}, Empaque {packagingColorLabel}</p>
            <p><Puzzle className="inline mr-1 h-3 w-3" />Complemento: {getAddonDisplay()}</p>
            <p><CoffeeIcon className="inline mr-1 h-3 w-3" />Taza: {getMugDisplay()}</p>
            {item.price && <p className="font-semibold text-sm text-accent-foreground mt-1">Precio: ${item.price.toFixed(2)}</p>}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
