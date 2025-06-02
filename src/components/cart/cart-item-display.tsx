
"use client";

import Image from 'next/image';
import type { CartItem, CartItemComponentDetail } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Package, Puzzle, Coffee as CoffeeIcon, Info } from 'lucide-react';

interface CartItemDisplayProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
}

function ComponentDetailDisplay({ component }: { component: CartItemComponentDetail }) {
  let icon = <Info className="inline mr-1 h-3 w-3 text-muted-foreground" />;
  if (component.type === 'coffee') icon = <Package className="inline mr-1 h-3 w-3 text-muted-foreground" />;
  else if (component.type === 'addon') icon = <Puzzle className="inline mr-1 h-3 w-3 text-muted-foreground" />;
  else if (component.type === 'mug') icon = <CoffeeIcon className="inline mr-1 h-3 w-3 text-muted-foreground" />;

  return (
    <div className="flex items-center justify-between text-xs">
      <span className="flex items-center">
        {icon}
        {component.name}
      </span>
      <span className="font-medium">${(component.price || 0).toFixed(2)}</span>
    </div>
  );
}


export function CartItemDisplay({ item, onRemove }: CartItemDisplayProps) {
  const fallbackImageText = encodeURIComponent(item.displayName?.substring(0,10) || 'Item');
  const displayImageUrl = item.displayImage || `https://placehold.co/100x100/EAEAEA/333333?text=${fallbackImageText}`;
  const imageHint = item.cartItemType === 'kit' ? (item.isPresetKit ? "preset gift" : "custom coffee kit") : "product item";

  return (
    <Card className="mb-4 shadow-md overflow-hidden">
      <div className="flex">
        <div className="w-1/4 p-2 flex items-center justify-center bg-secondary/20">
          <Image 
            src={displayImageUrl} 
            alt={item.displayName} 
            width={100} 
            height={100} 
            className="rounded-md object-contain" // Changed object-cover to object-contain
            data-ai-hint={imageHint}
            />
        </div>
        <div className="w-3/4">
          <CardHeader className="flex flex-row justify-between items-start pb-2 pt-4 px-4">
            <CardTitle className="text-lg font-semibold text-primary">{item.displayName}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => onRemove(item.id!)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
              <X className="h-5 w-5" />
              <span className="sr-only">Eliminar item</span>
            </Button>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-1 px-4 pb-2">
            {(item.components || []).map((component, index) => (
              <ComponentDetailDisplay key={`${item.id}-comp-${index}`} component={component} />
            ))}
          </CardContent>
          <CardContent className="px-4 pb-4 pt-1">
             <p className="font-semibold text-sm text-accent-foreground mt-1">
                Precio Total Artículo: ${(item.totalPrice || 0).toFixed(2)}
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

