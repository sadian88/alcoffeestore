"use client";

import Image from 'next/image';
import type { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Package, Puzzle, Coffee as CoffeeIcon } from 'lucide-react';
import { PRESET_KITS_DATA, PACKAGING_COLORS, COFFEE_SIZES, ADDON_TYPES, MUG_TYPES } from '@/lib/constants';


interface CartItemDisplayProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
}

export function CartItemDisplay({ item, onRemove }: CartItemDisplayProps) {
  const presetData = item.isPreset ? PRESET_KITS_DATA.find(pk => pk.id === item.id) : null;
  const imageUrl = item.image || presetData?.image || `https://placehold.co/100x100/${item.isPreset ? 'E6E6FA/4A4A4A' : 'FFC0CB/4A4A4A'}?text=${encodeURIComponent(item.name?.substring(0,10) || 'Kit')}`;

  const getLabel = (options: {value: string; label: string}[], value?: string) => options.find(opt => opt.value === value)?.label || 'N/A';
  
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
            data-ai-hint="coffee product"
            />
        </div>
        <div className="w-3/4">
          <CardHeader className="flex flex-row justify-between items-start pb-2 pt-4 px-4">
            <CardTitle className="text-lg font-semibold text-primary">{item.name || 'Kit Personalizado'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => onRemove(item.id!)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
              <X className="h-5 w-5" />
              <span className="sr-only">Eliminar item</span>
            </Button>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-1 px-4 pb-4">
            <p><Package className="inline mr-1 h-3 w-3" />Café: {getLabel(COFFEE_SIZES, item.coffee.size)}, Empaque {getLabel(PACKAGING_COLORS, item.coffee.packagingColor)}</p>
            <p><Puzzle className="inline mr-1 h-3 w-3" />Complemento: {getLabel(ADDON_TYPES, item.addon.type)}
              {item.addon.type === 'cuadro' && item.addon.cuadroDescription && <span className="italic"> "{item.addon.cuadroDescription}"</span>}
            </p>
            <p><CoffeeIcon className="inline mr-1 h-3 w-3" />Taza: {getLabel(MUG_TYPES, item.mug.type)}
              {item.mug.type === 'termica' && item.mug.termicaMarked && <span className="italic"> (Frase: "{item.mug.termicaPhrase}")</span>}
            </p>
            {item.price && <p className="font-semibold text-sm text-accent-foreground mt-1">Precio: ${item.price.toFixed(2)}</p>}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
