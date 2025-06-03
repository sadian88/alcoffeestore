
"use client";

import Image from 'next/image';
import type { AddonSelection } from '@/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ADDON_OPTIONS, findOption } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Puzzle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface StepAddonProps {
  addon: AddonSelection;
  onChange: (addon: Partial<AddonSelection>) => void;
}

export function StepAddon({ addon, onChange }: StepAddonProps) {
  const selectedAddonTypeConfig = findOption(ADDON_OPTIONS, addon.type);

  const handleTypeChange = (newType: string) => {
    const newTypeConfig = findOption(ADDON_OPTIONS, newType);
    onChange({
      type: newType,
      variation: newTypeConfig?.variations?.[0]?.value || '',
      cuadroDescription: newType !== 'cuadro' ? '' : addon.cuadroDescription,
    });
  };

  const handleVariationChange = (newVariation: string) => {
    onChange({ variation: newVariation });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <Puzzle className="w-7 h-7 text-primary" /> Paso 2: Elige un Complemento
        </CardTitle>
        <CardDescription>
          Añade un toque extra a tu kit. ¿Qué te apetece hoy?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-medium">Selecciona tu Complemento:</Label>
          <RadioGroup
            value={addon.type}
            onValueChange={handleTypeChange}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {ADDON_OPTIONS.map((option) => (
              <Label
                key={option.value}
                htmlFor={`addon-type-${option.value}`}
                className={cn(
                  "flex flex-col items-center justify-center space-y-2 border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-primary",
                  addon.type === option.value ? 'border-primary bg-primary/10' : 'border-input-border'
                )}
              >
                <RadioGroupItem value={option.value} id={`addon-type-${option.value}`} className="sr-only" />
                {option.icon && <option.icon className="w-6 h-6 text-primary" />}
                <span>{option.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {selectedAddonTypeConfig?.variations && selectedAddonTypeConfig.variations.length > 0 && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <Label className="text-lg font-medium">Diseño de {selectedAddonTypeConfig.label}:</Label>
            <RadioGroup
              value={addon.variation}
              onValueChange={handleVariationChange}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {selectedAddonTypeConfig.variations.map((variation) => (
                <Label
                  key={variation.value}
                  htmlFor={`addon-variation-${variation.value}`}
                  className={cn(
                    "flex flex-col items-center justify-center space-y-1 border-2 p-2 rounded-lg cursor-pointer transition-all hover:border-primary", 
                    "aspect-[4/5]", 
                    addon.variation === variation.value ? 'border-primary bg-primary/10 ring-2 ring-primary' : 'border-input-border'
                  )}
                >
                  <RadioGroupItem value={variation.value} id={`addon-variation-${variation.value}`} className="sr-only" />
                  <Image src={variation.image} alt={variation.label} width={96} height={120} className="rounded-md object-contain" data-ai-hint={variation.dataAiHint}/>
                  <span className="text-xs text-center">{variation.label} (${formatPrice(variation.price)})</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {selectedAddonTypeConfig?.requiresDescription && addon.type === 'cuadro' && (
          <div className="space-y-2 animate-in fade-in duration-300 pt-4 border-t mt-6">
            <Label htmlFor="cuadroDescription" className="text-lg font-medium">Descripción para tu Cuadro:</Label>
            <Textarea
              id="cuadroDescription"
              placeholder="Escribe una frase inspiradora, un nombre, ¡lo que quieras!"
              value={addon.cuadroDescription}
              onChange={(e) => onChange({ cuadroDescription: e.target.value })}
              className="min-h-[100px]"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">Máximo 100 caracteres.
              {selectedAddonTypeConfig.descriptionFee && selectedAddonTypeConfig.descriptionFee > 0 && (
                <span className="font-medium"> (Costo adicional por descripción: ${formatPrice(selectedAddonTypeConfig.descriptionFee)})</span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
