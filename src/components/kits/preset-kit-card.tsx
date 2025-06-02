"use client";

import Image from 'next/image';
import type { PresetKit } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Sparkles, Package, Puzzle, Coffee as CoffeeIcon } from 'lucide-react';

interface PresetKitCardProps {
  kit: PresetKit;
}

export function PresetKitCard({ kit }: PresetKitCardProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(kit);
    toast({
      title: "¡Kit Prediseñado Agregado! 🎁",
      description: `${kit.name} ha sido añadido a tu carrito.`,
      className: "bg-primary/10 border-primary text-primary-foreground",
    });
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader>
        <div className="relative w-full h-52 mb-4">
          <Image
            src={kit.image}
            alt={kit.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            data-ai-hint={kit.id === 'preset1' ? "kawaii coffee" : kit.id === 'preset2' ? "pastel coffee" : "luxury coffee"}
          />
        </div>
        <CardTitle className="text-2xl font-headline text-primary">{kit.name}</CardTitle>
        <CardDescription>{kit.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="font-semibold text-xl text-accent">
          ${kit.price.toFixed(2)}
        </div>
        <ul className="list-none space-y-1 text-muted-foreground">
          <li className="flex items-center gap-2"><Package className="w-4 h-4 text-secondary-foreground" /> Café: {kit.coffee.size}, Empaque {kit.coffee.packagingColor}</li>
          <li className="flex items-center gap-2"><Puzzle className="w-4 h-4 text-secondary-foreground" /> Complemento: {kit.addon.type}{kit.addon.type === 'cuadro' && kit.addon.cuadroDescription ? ` ("${kit.addon.cuadroDescription}")` : ''}</li>
          <li className="flex items-center gap-2"><CoffeeIcon className="w-4 h-4 text-secondary-foreground" /> Taza: {kit.mug.type}{kit.mug.type === 'termica' && kit.mug.termicaMarked ? ' (Personalizada)' : ''}</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full font-semibold">
          <ShoppingCart className="mr-2 h-5 w-5" /> Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
