
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home } from 'lucide-react';

export default function PedidoEnviadoPage() {
  return (
    <div className="container mx-auto py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">
            ¡Pedido en Camino!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Image 
            src="https://placehold.co/300x200/E6E6FA/FFB6C1?text=%C2%A1Gracias%21+%F0%9F%8E%89"
            alt="Confirmación de pedido"
            width={300}
            height={200}
            className="rounded-lg mx-auto shadow-md"
            data-ai-hint="thank you order celebration"
          />
          <p className="text-lg text-muted-foreground">
            Hemos preparado tu mensaje para WhatsApp. Por favor, ábrelo y envía tu pedido a alCoffee.
          </p>
          <p className="text-sm text-muted-foreground">
            Si la ventana de WhatsApp no se abrió automáticamente, revisa tus pestañas o pop-ups bloqueados.
          </p>
          <Link href="/" passHref>
            <Button size="lg" className="w-full font-semibold mt-6">
              <Home className="mr-2 h-5 w-5" /> Volver al Inicio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
