
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Heart } from 'lucide-react'; // For the footer

// Smiley face SVG component
const SmileyFace = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <circle cx="30" cy="30" r="28" fill="#FFB6C1" stroke="#E7A5B1" strokeWidth="3"/>
    <circle cx="20" cy="25" r="3" fill="#4A2C2A"/>
    <circle cx="40" cy="25" r="3" fill="#4A2C2A"/>
    <path d="M20 38 Q30 45 40 38" stroke="#4A2C2A" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 text-foreground">
      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center pt-8 pb-12 md:pt-12 md:pb-16 relative">
          <div className="absolute top-10 right-10 md:top-16 md:right-24 z-0">
            <SmileyFace />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}>
            Diseño <br className="sm:hidden"/>Encantador
          </h1>
          <p className="text-lg sm:text-xl text-pink-50/90 max-w-lg mx-auto mb-8" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>
            Una experiencia visual dulce y moderna que te enamorará.
          </p>
        </section>

        {/* CTA Cards Section */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12 md:mb-20">
          <Link href="/crear-kit" passHref>
            <Card className="bg-secondary/80 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer rounded-3xl overflow-hidden p-6 text-center">
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Image
                  src="https://placehold.co/150x150/FF69B4/FFFFFF?text=Kit"
                  alt="Arma tu kit de café"
                  width={120}
                  height={120}
                  className="rounded-2xl mb-3"
                  data-ai-hint="pink coffee cup illustration"
                />
                <Button size="lg" className="font-semibold text-lg w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
                  Arma tu kit
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/kits-predisenados" passHref>
            <Card className="bg-secondary/80 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer rounded-3xl overflow-hidden p-6 text-center">
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Image
                  src="https://placehold.co/150x150/FFFFFF/E75480?text=Kits"
                  alt="Kits de café disponibles"
                  width={120}
                  height={120}
                  className="rounded-2xl mb-3"
                  data-ai-hint="coffee mug gift illustration"
                />
                <Button size="lg" variant="outline" className="font-semibold text-lg w-full rounded-xl border-primary text-primary hover:bg-primary/10">
                  Kits disponibles
                </Button>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Features Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12 md:mb-20 max-w-5xl mx-auto">
          <div className="w-1/3 md:w-1/4 flex justify-center">
            <Image
              src="https://placehold.co/200x250/FFFFFF/FFB6C1?text=Unicorn"
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
              src="https://placehold.co/180x220/FFB6C1/FFFFFF?text=Tree"
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
      <section className="bg-pink-200/70 py-10 md:py-16 text-center mt-auto">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-pink-700 mb-6">
            ¡Disfruta tu café perfecto!
          </h2>
        </div>
      </section>
    </div>
  );
}
