"use client";

import type { CoffeeSelection } from '@/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COFFEE_SIZES, PACKAGING_COLORS } from '@/lib/constants';
import { Package, Palette } from 'lucide-react';

interface StepCoffeeProps {
  coffee: CoffeeSelection;
  onChange: (coffee: Partial<CoffeeSelection>) => void;
}

export function StepCoffee({ coffee, onChange }: StepCoffeeProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <Package className="w-7 h-7 text-primary" /> Paso 1: Elige tu Café
        </CardTitle>
        <CardDescription>
          Selecciona el tamaño y el color del empaque para tu café especial.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-medium">Tamaño del Café:</Label>
          <RadioGroup
            value={coffee.size}
            onValueChange={(value) => onChange({ size: value as CoffeeSelection['size'] })}
            className="flex flex-col sm:flex-row gap-4"
          >
            {COFFEE_SIZES.map((size) => (
              <Label
                key={size.value}
                htmlFor={`size-${size.value}`}
                className={`flex items-center space-x-2 border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-primary ${coffee.size === size.value ? 'border-primary bg-primary/10' : 'border-input-border'}`}
              >
                <RadioGroupItem value={size.value} id={`size-${size.value}`} />
                <span>{size.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-lg font-medium">Color del Empaque:</Label>
          <RadioGroup
            value={coffee.packagingColor}
            onValueChange={(value) => onChange({ packagingColor: value as CoffeeSelection['packagingColor'] })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {PACKAGING_COLORS.map((color) => (
              <Label
                key={color.value}
                htmlFor={`color-${color.value}`}
                className={`flex flex-col items-center justify-center space-y-2 border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-primary ${coffee.packagingColor === color.value ? 'border-primary bg-primary/10' : 'border-input-border'}`}
              >
                 <RadioGroupItem value={color.value} id={`color-${color.value}`} className="sr-only" />
                 <div className={`w-10 h-10 rounded-full border-2 ${
                    color.value === 'blanco' ? 'bg-white border-gray-300' : 
                    color.value === 'rosa' ? 'bg-pink-300 border-pink-400' : 
                    'bg-yellow-400 border-yellow-500'
                  }`}
                />
                <span>{color.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
