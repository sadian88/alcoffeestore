import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gift, Edit3, Smile, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      <header className="space-y-4">
        <div className="inline-block p-4 bg-primary/20 rounded-full">
          <Zap className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-5xl font-headline font-bold text-primary">
          Bienvenida a Kawa-Coffee Kit <Smile className="inline-block w-12 h-12 text-accent" />
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          ¡Crea tu momento café perfecto! Elige entre nuestros kits prediseñados llenos de encanto o arma el tuyo paso a paso.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader className="items-center">
            <div className="p-3 bg-secondary rounded-full mb-2">
              <Edit3 className="w-10 h-10 text-secondary-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline">Arma tu Propio Kit</CardTitle>
            <CardDescription className="text-md">
              Personaliza cada detalle, desde el café hasta la taza. ¡Tu kit, tus reglas!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Image 
              src="https://placehold.co/400x300/FFB6C1/4A4A4A?text=Crea+tu+Kit" 
              alt="Ilustración de armado de kit" 
              width={400} 
              height={300}
              className="rounded-lg shadow-md"
              data-ai-hint="coffee customization"
            />
            <Link href="/crear-kit" passHref>
              <Button size="lg" className="font-semibold text-lg w-full">
                Empezar a Crear
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader className="items-center">
            <div className="p-3 bg-accent/20 rounded-full mb-2">
              <Gift className="w-10 h-10 text-accent-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline">Kits Prediseñados</CardTitle>
            <CardDescription className="text-md">
              Descubre nuestras selecciones especiales, listas para disfrutar o regalar.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
             <Image 
              src="https://placehold.co/400x300/E6E6FA/4A4A4A?text=Kits+Listos" 
              alt="Ilustración de kits prediseñados" 
              width={400} 
              height={300}
              className="rounded-lg shadow-md"
              data-ai-hint="gift box"
            />
            <Link href="/kits-predisenados" passHref>
              <Button variant="secondary" size="lg" className="font-semibold text-lg w-full">
                Ver Kits Listos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <section className="w-full max-w-4xl pt-8">
          <h2 className="text-3xl font-headline font-semibold text-primary mb-6">¿Por qué Kawa-Coffee?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Diseño Encantador 💖</h3>
              <p className="text-muted-foreground">Una experiencia visual dulce y moderna que te enamorará.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Totalmente Tuyo 🎨</h3>
              <p className="text-muted-foreground">Crea combinaciones únicas que reflejen tu personalidad.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Momentos Mágicos ✨</h3>
              <p className="text-muted-foreground">Perfecto para consentirte o para un regalo inolvidable.</p>
            </div>
          </div>
        </section>
    </div>
  );
}
