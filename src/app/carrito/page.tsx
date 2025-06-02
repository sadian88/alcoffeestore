
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useCartStore } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItemDisplay } from '@/components/cart/cart-item-display';
import { ShoppingCart, Trash2, Send, Sparkles, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { 
  MUG_OPTIONS, 
  ADDON_OPTIONS,
  COFFEE_SIZES,
  PACKAGING_COLORS,
  findOption,
  findVariation,
  findPackagingColor
} from '@/lib/constants';
import type { CartItem } from '@/types';

export default function CarritoPage() {
  const { cartItems, removeFromCart, clearCart, getCartItemCount, isCartLoaded } = useCartStore();
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Carrito Vaciado 🛒💨",
      description: "Todos los artículos han sido eliminados de tu carrito.",
      className: "bg-secondary border-secondary text-secondary-foreground"
    });
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  const itemCount = getCartItemCount();

  const formatItemForWhatsApp = (item: CartItem): string => {
    const coffeeSizeLabel = COFFEE_SIZES.find(cs => cs.value === item.coffee.size)?.label || 'N/A';
    const packagingColorData = findPackagingColor(item.coffee.packagingColor);
    const packagingColorLabel = packagingColorData?.label || 'N/A';

    let addonDetails = 'N/A';
    if (item.addon.type) {
      const addonType = findOption(ADDON_OPTIONS, item.addon.type);
      addonDetails = addonType?.label || item.addon.type;
      if (item.addon.variation) {
        const variation = findVariation(addonType, item.addon.variation);
        if (variation && (variation.value !== 'default' || (addonType?.variations?.length ?? 0) > 1)) {
           addonDetails += `, ${variation.label}`;
        }
      }
      if (item.addon.type === 'cuadro' && item.addon.cuadroDescription) {
        addonDetails += ` ("${item.addon.cuadroDescription}")`;
      }
    }

    let mugDetails = 'N/A';
    if (item.mug.type) {
      const mugType = findOption(MUG_OPTIONS, item.mug.type);
      mugDetails = mugType?.label || item.mug.type;
      if (item.mug.variation) {
        const variation = findVariation(mugType, item.mug.variation);
        if (variation && (variation.value !== 'default' || (mugType?.variations?.length ?? 0) > 1)) {
          mugDetails += `, ${variation.label}`;
        }
      }
      if (item.mug.type === 'termica' && item.mug.termicaMarked && item.mug.termicaPhrase) {
        mugDetails += ` (Frase: "${item.mug.termicaPhrase}")`;
      } else if (item.mug.type === 'termica' && item.mug.termicaMarked) {
        mugDetails += ` (Personalizada)`;
      }
    }

    const priceString = item.price ? `$${item.price.toFixed(2)}` : 'Precio no disponible';

    return `
*${item.name || (item.isPreset ? 'Kit Prediseñado' : 'Kit Personalizado')}*
  ☕ Café: ${coffeeSizeLabel}, Empaque ${packagingColorLabel}
  🎁 Complemento: ${addonDetails}
  ✨ Taza: ${mugDetails}
  💰 Precio: ${priceString}
`;
  };

  const handleFinalizeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito Vacío",
        description: "Agrega algunos kits antes de finalizar el pedido.",
        variant: "destructive",
      });
      return;
    }

    const introMessage = "¡Hola alCoffee! 👋 Quisiera realizar el siguiente pedido:\n";
    const itemsMessage = cartItems.map(item => formatItemForWhatsApp(item)).join("\n");
    const totalMessage = `\n--- TOTAL ---\nTotal Estimado: $${totalPrice.toFixed(2)}`;
    const outroMessage = "\n\n¡Gracias! 😊";

    const fullMessage = introMessage + itemsMessage + totalMessage + outroMessage;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/3153042476?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    clearCart();
    // Redirect to a confirmation page instead of just showing a toast here
    router.push('/pedido-enviado');
  };


  if (!isCartLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Sparkles className="w-16 h-16 text-primary animate-pulse mb-4" />
        <p className="text-xl text-muted-foreground">Cargando tu carrito mágico...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12 space-y-3">
        <div className="inline-block p-3 bg-primary/10 rounded-full">
         <ShoppingCart className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold text-primary">
          Tu Carrito de Ensueño
        </h1>
        <p className="text-lg text-muted-foreground">
          {itemCount > 0 ? `Tienes ${itemCount} kit(s) listos para convertirse en realidad.` : 'Aún no has agregado ninguna maravilla a tu carrito.'}
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center py-10 flex flex-col items-center">
           <Image src="https://placehold.co/300x250/E6E6FA/FFB6C1?text=Carrito+Vacio+:(" alt="Carrito vacío" width={300} height={250} className="rounded-lg mb-6 shadow-md" data-ai-hint="empty cart" />
          <p className="text-xl text-muted-foreground mb-6">Tu carrito está esperando ser llenado de magia.</p>
          <div className="flex gap-4">
            <Link href="/crear-kit" passHref>
              <Button size="lg" className="font-semibold">Armar un Kit Personalizado</Button>
            </Link>
            <Link href="/kits-predisenados" passHref>
              <Button variant="secondary" size="lg" className="font-semibold">Ver Kits Prediseñados</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItemDisplay key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </div>

          <aside className="md:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kits en el carrito:</span>
                  <span className="font-semibold">{itemCount}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary">
                  <span>Total Estimado:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">El envío se gestionará por WhatsApp.</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button onClick={handleFinalizeOrder} size="lg" className="w-full font-semibold">
                  <Send className="mr-2 h-5 w-5" /> Finalizar Pedido por WhatsApp
                </Button>
                <Button variant="destructive" onClick={handleClearCart} size="lg" className="w-full">
                  <Trash2 className="mr-2 h-5 w-5" /> Vaciar Carrito
                </Button>
                 <Link href="/" passHref className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Seguir Comprando
                    </Button>
                </Link>
              </CardFooter>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
