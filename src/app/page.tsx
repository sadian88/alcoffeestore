
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gift, Edit3, Heart, Coffee } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden min-h-screen flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-[10%] left-[5%] w-8 h-8 bg-accent/20 rounded-full -z-10 opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[10%] w-12 h-12 bg-secondary/20 rounded-lg -z-10 opacity-70 animate-blob animation-delay-2000 transform rotate-12"></div>
      <div className="absolute bottom-[30%] left-[15%] w-10 h-10 bg-primary/10 rounded-full -z-10 opacity-60 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-[10%] right-[15%] w-6 h-6 bg-accent/10 rounded-sm -z-10 opacity-80 animate-blob animation-delay-6000 transform -rotate-12"></div>

      {/* Hero Section with Wavy Bottom */}
      <section className="relative bg-primary/5 pt-12 pb-20 md:pt-16 md:pb-28 text-center">
        <div className="container mx-auto relative z-10 space-y-6 px-4">
          <div className="inline-block p-4 bg-primary/20 rounded-full">
            <Coffee className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary">
            Bienvenida a alCoffee
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Amor en cada taza. <Heart className="inline-block w-5 h-5 text-accent mb-1" /> ¡Crea tu momento café perfecto! Elige entre nuestros kits prediseñados llenos de encanto o arma el tuyo paso a paso.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 md:h-32 overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" fill="hsl(var(--background))" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,112C840,117,960,107,1080,90.7C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Cards Section */}
      <section className="relative z-10 container mx-auto px-4 py-8 md:-mt-20">
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
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
                src="https://placehold.co/400x300/FFB6C1/4A4A4A?text=Crea+alCoffee"
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
                src="https://placehold.co/400x300/E6E6FA/4A4A4A?text=alCoffee+Listos"
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
      </section>

      {/* "Why Choose Us" Section with Wavy Top */}
      <section className="relative bg-secondary/20 pt-24 pb-12 mt-12 md:mt-16 flex-grow">
         <div className="absolute top-0 left-0 w-full h-20 md:h-32 overflow-hidden leading-[0] transform rotate-180">
          <svg viewBox="0 0 1440 120" fill="hsl(var(--background))" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,112C840,117,960,107,1080,90.7C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
        <div className="container mx-auto relative z-10 text-center px-4">
          <h2 className="text-3xl font-headline font-semibold text-primary mb-8">¿Por qué alCoffee?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Diseño Encantador <Heart className="inline-block w-4 h-4 text-primary" /></h3>
              <p className="text-muted-foreground">Una experiencia visual dulce y moderna que te enamorará.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Totalmente Tuyo 🎨</h3>
              <p className="text-muted-foreground">Crea combinaciones únicas que reflejen tu personalidad.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Momentos Mágicos ✨</h3>
              <p className="text-muted-foreground">Perfecto para consentirte o para un regalo inolvidable.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    