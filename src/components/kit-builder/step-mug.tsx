
"use client";

import Image from 'next/image';
import type { MugSelection } from '@/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MUG_OPTIONS, THERMAL_MUG_CUSTOMIZATION_OPTIONS, findOption } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Coffee as CoffeeIcon, Leaf, Rocket } from 'lucide-react'; 

interface StepMugProps {
  mug: MugSelection;
  onChange: (mug: Partial<MugSelection>) => void;
}

export function StepMug({ mug, onChange }: StepMugProps) {
  const selectedMugTypeConfig = findOption(MUG_OPTIONS, mug.type);

  const handleTypeChange = (newType: string) => {
    const newTypeConfig = findOption(MUG_OPTIONS, newType);
    onChange({
      type: newType,
      variation: newTypeConfig?.variations?.[0]?.value || '', 
      termicaMarked: newType === 'termica' ? mug.termicaMarked ?? false : undefined,
      termicaPhrase: newType === 'termica' ? mug.termicaPhrase : '',
    });
  };

  const handleVariationChange = (newVariation: string) => {
    onChange({ variation: newVariation });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <CoffeeIcon className="w-7 h-7 text-primary" /> Paso 3: Elige tu Taza
        </CardTitle>
        <CardDescription>
          Escoge la taza perfecta para disfrutar tu café. Selecciona el tipo y luego el diseño que más te guste.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-medium">Tipo de Taza:</Label>
          <RadioGroup
            value={mug.type}
            onValueChange={handleTypeChange}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {MUG_OPTIONS.map((option) => (
              <Label
                key={option.value}
                htmlFor={`mug-type-${option.value}`}
                className={cn(
                  "flex flex-col items-center justify-center space-y-2 border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-primary",
                  mug.type === option.value ? 'border-primary bg-primary/10' : 'border-input-border'
                )}
              >
                <RadioGroupItem value={option.value} id={`mug-type-${option.value}`} className="sr-only" />
                {option.icon && <option.icon className="w-6 h-6 text-primary" />}
                <span>{option.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {selectedMugTypeConfig?.variations && selectedMugTypeConfig.variations.length > 0 && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <Label className="text-lg font-medium">Diseño de {selectedMugTypeConfig.label}:</Label>
            <RadioGroup
              value={mug.variation}
              onValueChange={handleVariationChange}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {selectedMugTypeConfig.variations.map((variation) => (
                <Label
                  key={variation.value}
                  htmlFor={`mug-variation-${variation.value}`}
                  className={cn(
                    "flex flex-col items-center justify-center space-y-2 border-2 p-3 rounded-lg cursor-pointer transition-all hover:border-primary",
                    "aspect-square",
                    mug.variation === variation.value ? 'border-primary bg-primary/10 ring-2 ring-primary' : 'border-input-border'
                  )}
                >
                  <RadioGroupItem value={variation.value} id={`mug-variation-${variation.value}`} className="sr-only" />
                  <Image src={variation.image} alt={variation.label} width={80} height={80} className="rounded-md object-cover" data-ai-hint={variation.dataAiHint} />
                  <span className="text-xs text-center">{variation.label} (${variation.price.toFixed(2)})</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {selectedMugTypeConfig?.isPersonalizable && mug.type === 'termica' && (
          <div className="space-y-4 animate-in fade-in duration-300 pt-4 border-t mt-6">
            <Label className="text-lg font-medium">
              Personalización Taza Térmica:
              {selectedMugTypeConfig.personalizationFee && selectedMugTypeConfig.personalizationFee > 0 && (
                <span className="text-xs text-muted-foreground font-normal"> (Costo adicional por personalización: ${selectedMugTypeConfig.personalizationFee.toFixed(2)})</span>
              )}
            </Label>
            <RadioGroup
              value={mug.termicaMarked ? 'marcada' : 'sin_marcar'}
              onValueChange={(value) => {
                const isMarked = value === 'marcada';
                onChange({ termicaMarked: isMarked, termicaPhrase: !isMarked ? '' : mug.termicaPhrase });
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {THERMAL_MUG_CUSTOMIZATION_OPTIONS.map(opt => (
                 <Label
                  key={opt.value}
                  htmlFor={`thermal-${opt.value}`}
                  className={cn(
                    "flex items-center space-x-2 border-2 p-3 rounded-lg cursor-pointer transition-all hover:border-primary",
                    (mug.termicaMarked && opt.value === 'marcada') || (!mug.termicaMarked && opt.value === 'sin_marcar') ? 'border-primary bg-primary/10' : 'border-input-border'
                  )}
                >
                  <RadioGroupItem value={opt.value} id={`thermal-${opt.value}`} />
                  <span>{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>

            {mug.termicaMarked && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <Label htmlFor="termicaPhrase" className="text-lg font-medium">Frase para tu Taza Térmica:</Label>
                <Input
                  id="termicaPhrase"
                  placeholder="Escribe tu frase aquí (máx. 50 caracteres)"
                  value={mug.termicaPhrase}
                  onChange={(e) => onChange({ termicaPhrase: e.target.value })}
                  maxLength={50}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
