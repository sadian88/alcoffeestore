
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; // Added import
import { useCartStore } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItemDisplay } from '@/components/cart/cart-item-display';
import { Checkbox } from '@/components/ui/checkbox'; // Added import
import { Input } from '@/components/ui/input'; // Added import
import { Label } from '@/components/ui/label'; // Added import
import { ShoppingCart, Trash2, Send, Sparkles, ArrowLeft, Gift } from 'lucide-react'; // Added Gift
import Image from 'next/image';
import type { CartItem, CartItemComponentDetail } from '@/types';

export default function CarritoPage() {
  const { cartItems, removeFromCart, clearCart, getCartItemCount, isCartLoaded } = useCartStore();
  const { toast } = useToast();
  const router = useRouter();

  const [includeGiftCard, setIncludeGiftCard] = useState(false);
  const [giftCardFrom, setGiftCardFrom] = useState('');
  const [giftCardTo, setGiftCardTo] = useState('');

  const handleClearCart = () => {
    clearCart();
    setIncludeGiftCard(false);
    setGiftCardFrom('');
    setGiftCardTo('');
    toast({
      title: "Carrito Vaciado 🛒💨",
      description: "Todos los artículos han sido eliminados de tu carrito.",
      className: "bg-secondary border-secondary text-secondary-foreground"
    });
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.totalPrice || 0) * item.quantity, 0);
  const itemCount = getCartItemCount();

  const formatComponentForWhatsApp = (component: CartItemComponentDetail): string => {
    return `    - ${component.name}: $${component.price.toFixed(2)}`;
  };

  const formatItemForWhatsApp = (item: CartItem): string => {
    let message = `\n*${item.displayName}* - $${item.totalPrice.toFixed(2)}`;
    if (item.cartItemType === 'kit' && item.components.length > 1) {
      message += "\n  Componentes:";
      item.components.forEach(comp => {
        message += `\n  ${formatComponentForWhatsApp(comp)}`;
      });
    }
    return message;
  };

  const handleFinalizeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito Vacío",
        description: "Agrega algunos productos o kits antes de finalizar el pedido.",
        variant: "destructive",
      });
      return;
    }

    const introMessage = "¡Hola alCoffee! 👋 Quisiera realizar el siguiente pedido:\n";
    const itemsMessage = cartItems.map(item => formatItemForWhatsApp(item)).join("\n");
    const totalMessage = `\n\n--- TOTAL DEL PEDIDO ---\nTotal Estimado: $${totalPrice.toFixed(2)}`;
    
    let giftCardMessage = "";
    if (includeGiftCard && (giftCardFrom.trim() || giftCardTo.trim())) {
      giftCardMessage += "\n\n--- TARJETA DE REGALO 🎁 ---";
      if (giftCardFrom.trim()) {
        giftCardMessage += `\nDe: ${giftCardFrom.trim()}`;
      }
      if (giftCardTo.trim()) {
        giftCardMessage += `\nPara: ${giftCardTo.trim()}`;
      }
    }
    
    const outroMessage = "\n\n¡Gracias! 😊";

    const fullMessage = introMessage + itemsMessage + totalMessage + giftCardMessage + outroMessage;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/3153042476?text=${encodedMessage}`; 

    window.open(whatsappUrl, '_blank');
    
    // Consider clearing cart and gift card fields after confirmation from user
    // For now, redirecting. State will be lost on navigation.
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
          {itemCount > 0 ? `Tienes ${itemCount} artículo(s) en tu carrito.` : 'Aún no has agregado ninguna maravilla a tu carrito.'}
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center py-10 flex flex-col items-center">
           <Image src="https://placehold.co/300x250/F8BFC9/4A3B31?text=Carrito+Vacio+:(" alt="Carrito vacío" width={300} height={250} className="rounded-lg mb-6 shadow-md" data-ai-hint="empty cart" />
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
                <p className="text-xs text-muted-foreground pt-1">
                  Si deseas agregar algo adicional al kit escríbenos un mensaje adicional al whatsapp.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Artículos en el carrito:</span>
                  <span className="font-semibold">{itemCount}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary">
                  <span>Total Estimado:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                {/* Gift Card Section */}
                <div className="pt-3 border-t mt-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="giftCard" 
                      checked={includeGiftCard} 
                      onCheckedChange={(checked) => setIncludeGiftCard(Boolean(checked))}
                      aria-label="Incluir tarjeta de regalo"
                    />
                    <Label htmlFor="giftCard" className="text-sm font-medium flex items-center">
                      <Gift className="w-4 h-4 mr-2 text-primary" /> Incluir tarjeta de regalo
                    </Label>
                  </div>
                  {includeGiftCard && (
                    <div className="space-y-2 mt-3 animate-in fade-in-50">
                      <div>
                        <Label htmlFor="giftCardFrom" className="text-xs text-muted-foreground">De:</Label>
                        <Input 
                          id="giftCardFrom" 
                          value={giftCardFrom} 
                          onChange={(e) => setGiftCardFrom(e.target.value)} 
                          placeholder="Ej: Tu Nombre" 
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="giftCardTo" className="text-xs text-muted-foreground">Para:</Label>
                        <Input 
                          id="giftCardTo" 
                          value={giftCardTo} 
                          onChange={(e) => setGiftCardTo(e.target.value)} 
                          placeholder="Ej: Nombre del Destinatario" 
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
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

