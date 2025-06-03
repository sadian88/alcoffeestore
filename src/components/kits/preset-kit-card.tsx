
"use client";

import Image from 'next/image';
import type { PresetKit, CartItem, CartItemComponentDetail, CoffeeSelection, AddonSelection, MugSelection } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Package, Puzzle, Coffee as CoffeeIcon, Paperclip } from 'lucide-react';
import { findCoffeeSize, findPackagingColor, findOption, findVariation, ADDON_OPTIONS, MUG_OPTIONS } from '@/lib/constants';
import { calculateCoffeePrice, calculateAddonPrice, calculateMugPrice } from '@/app/crear-kit/page'; 
import { formatPrice } from '@/lib/utils';
import { getAnalyticsInstance } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';


interface PresetKitCardProps {
  kit: PresetKit;
}

export function PresetKitCard({ kit }: PresetKitCardProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const getCoffeeComponentDetail = (selection: CoffeeSelection): CartItemComponentDetail => {
    const sizeLabel = findCoffeeSize(selection.size)?.label || '';
    const colorLabel = findPackagingColor(selection.packagingColor)?.label || '';
    const colorData = findPackagingColor(selection.packagingColor);
    return {
      type: 'coffee',
      name: `Café ${sizeLabel}, Empaque ${colorLabel}`,
      price: calculateCoffeePrice(selection),
      selectionDetails: selection,
      image: colorData?.image.replace(/100x100/g, '80x80') || 'https://placehold.co/80x80.png'
    };
  };

  const getAddonComponentDetail = (selection: AddonSelection): CartItemComponentDetail => {
    const addonTypeInfo = findOption(ADDON_OPTIONS, selection.type);
    const variationInfo = findVariation(addonTypeInfo, selection.variation);
    let name = addonTypeInfo?.label || 'Complemento';
    if (variationInfo && (variationInfo.value !== 'default' || (addonTypeInfo?.variations?.length ?? 0) > 1)) {
      name += `, ${variationInfo.label}`;
    }
    if (selection.type === 'cuadro' && selection.cuadroDescription) {
      name += ` ("${selection.cuadroDescription}")`;
    }
    return {
      type: 'addon',
      name: name,
      price: calculateAddonPrice(selection),
      selectionDetails: selection,
      image: variationInfo?.image.replace(/120x150|120x120/g, '80x80') || 'https://placehold.co/80x80.png'
    };
  };

  const getMugComponentDetail = (selection: MugSelection): CartItemComponentDetail => {
    const mugTypeInfo = findOption(MUG_OPTIONS, selection.type);
    const variationInfo = findVariation(mugTypeInfo, selection.variation);
    let name = mugTypeInfo?.label || 'Taza';
    if (variationInfo && (variationInfo.value !== 'default' || (mugTypeInfo?.variations?.length ?? 0) > 1)) {
      name += `, ${variationInfo.label}`;
    }
    if (selection.type === 'termica' && selection.termicaMarked && selection.termicaPhrase) {
      name += ` (Frase: "${selection.termicaPhrase}")`;
    } else if (selection.type === 'termica' && selection.termicaMarked) {
      name += ` (Personalizada)`;
    }
    return {
      type: 'mug',
      name: name,
      price: calculateMugPrice(selection),
      selectionDetails: selection,
      image: variationInfo?.image.replace(/120x120/g, '80x80') || 'https://placehold.co/80x80.png'
    };
  };

  const handleAddToCart = async () => {
    const coffeeComp = getCoffeeComponentDetail(kit.coffee);
    const addonComp = getAddonComponentDetail(kit.addon); // Main addon (agenda/cuadro)
    const cucharaComp = getAddonComponentDetail(kit.cuchara); // Spoon component
    const mugComp = getMugComponentDetail(kit.mug);

    const cartItemToAdd: Omit<CartItem, 'id' | 'quantity'> = {
      cartItemType: 'kit',
      displayName: kit.name,
      totalPrice: kit.price, 
      components: [coffeeComp, cucharaComp, addonComp, mugComp], 
      isPresetKit: true,
      presetKitId: kit.id,
      displayImage: kit.image,
    };

    addToCart(cartItemToAdd);
    toast({
      title: "¡Kit Prediseñado Agregado! 🎁",
      description: `${kit.name} ha sido añadido a tu carrito.`,
      className: "bg-primary border-primary text-primary-foreground",
    });

    try {
      const analytics = await getAnalyticsInstance();
      if (analytics) {
        logEvent(analytics, 'add_to_cart', {
          currency: 'COP',
          value: kit.price,
          items: [{
            item_id: kit.id,
            item_name: kit.name,
            item_category: 'preset_kit',
            price: kit.price,
            quantity: 1
          }]
        });
      }
    } catch (error) {
      console.error("Error logging GA event for add preset kit to cart:", error);
    }
  };

  const coffeeDetails = getCoffeeComponentDetail(kit.coffee);
  const addonDetails = getAddonComponentDetail(kit.addon); 
  const cucharaDetails = getAddonComponentDetail(kit.cuchara); 
  const mugDetails = getMugComponentDetail(kit.mug);


  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader>
        <div className="relative w-full h-52 mb-4">
          <Image
            src={kit.image}
            alt={kit.name}
            fill={true}
            style={{objectFit: "cover"}}
            className="rounded-t-lg"
            data-ai-hint={kit.id === 'preset1' ? "kawaii coffee" : kit.id === 'preset2' ? "pastel coffee" : "luxury coffee"}
          />
        </div>
        <CardTitle className="text-2xl font-headline text-primary">{kit.name}</CardTitle>
        <CardDescription>{kit.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="font-semibold text-xl text-accent">
          ${formatPrice(kit.price)}
        </div>
        <ul className="list-none space-y-1 text-muted-foreground">
          <li className="flex items-center gap-2"><Package className="w-4 h-4 text-secondary-foreground" /> {coffeeDetails.name} (${formatPrice(coffeeDetails.price)})</li>
          <li className="flex items-center gap-2"><Paperclip className="w-4 h-4 text-secondary-foreground" /> {cucharaDetails.name} (${formatPrice(cucharaDetails.price)})</li>
          <li className="flex items-center gap-2"><Puzzle className="w-4 h-4 text-secondary-foreground" /> {addonDetails.name} (${formatPrice(addonDetails.price)})</li>
          <li className="flex items-center gap-2"><CoffeeIcon className="w-4 h-4 text-secondary-foreground" /> {mugDetails.name} (${formatPrice(mugDetails.price)})</li>
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
