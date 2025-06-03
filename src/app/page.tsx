
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Heart } from 'lucide-react'; // For the footer

// SmileyFace component removed as requested

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[hsl(var(--secondary)/0.8)] via-[hsl(var(--background))] to-[hsl(var(--background))] text-foreground">
      {/* Main content area */}
      <main className="flex-grow py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center pt-8 pb-12 md:pt-12 md:pb-16 relative">
          {/* SmileyFace instance removed */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-primary mb-4">
            Kits cafeteros Alcoffee.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto mb-8">
            Un kit personalizado y lleno de amor.
          </p>
        </section>

        {/* CTA Cards Section */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12 md:mb-20 px-4">
          <Link href="/crear-kit" passHref>
            <Card className="bg-card hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer rounded-3xl overflow-hidden p-6 text-center">
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Image
                  src="https://placehold.co/150x150/F8BFC9/4A3B31?text=Kit" /* Light Pink BG, Dark Brown Text */
                  alt="Arma tu kit de café"
                  width={120}
                  height={120}
                  className="rounded-2xl mb-3"
                  data-ai-hint="pink coffee cup illustration"
                />
                <Button size="lg" className="font-semibold text-lg w-full rounded-xl"> {/* Relies on default primary button style */}
                  Arma tu kit
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/kits-predisenados" passHref>
            <Card className="bg-card hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer rounded-3xl overflow-hidden p-6 text-center">
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Image
                  src="https://placehold.co/150x150/FFFFFF/D67AA4?text=Kits" /* White BG, Medium Pink Text */
                  alt="Kits de café disponibles"
                  width={120}
                  height={120}
                  className="rounded-2xl mb-3"
                  data-ai-hint="coffee mug gift illustration"
                />
                <Button size="lg" variant="outline" className="font-semibold text-lg w-full rounded-xl border-primary text-primary hover:bg-primary/10"> {/* Outline uses accent, ensure good contrast */}
                  Kits disponibles
                </Button>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Features Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12 md:mb-20 max-w-5xl mx-auto px-4">
          <div className="w-1/3 md:w-1/4 flex justify-center">
            <Image
              src="https://placehold.co/200x250/FFFFFF/D67AA4?text=Unicorn" /* White BG, Medium Pink Text */
              alt="Unicornio"
              width={180}
              height={220}
              className="object-contain"
              data-ai-hint="cute unicorn illustration"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Totalmente Tuyo ✨</h2>
              <p className="text-muted-foreground">
                Crea combinaciones únicas que reflejen tu personalidad.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Momentos Mágicos 💖</h2>
              <p className="text-muted-foreground">
                Perfecto para consentirte o para un regalo inolvidable.
              </p>
            </div>
          </div>
           <div className="w-1/3 md:w-1/4 flex justify-center">
            <Image
              src="https://placehold.co/180x220/F8BFC9/4A3B31?text=Tree" /* Light Pink BG, Dark Brown Text */
              alt="Árbol rosa"
              width={150}
              height={190}
              className="object-contain"
              data-ai-hint="pink cherry tree illustration"
            />
          </div>
        </section>
      </main>

      {/* Final CTA Section */}
      <section className="bg-secondary/70 py-10 md:py-16 text-center mt-auto">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
            💖 Amor en cada taza. ☕️
          </h2>
        </div>
      </section>
    </div>
  );
}
