"use client";

import type { AddonSelection } from '@/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ADDON_TYPES } from '@/lib/constants';
import { Puzzle, BookOpen, Frame, Paperclip } from 'lucide-react';

interface StepAddonProps {
  addon: AddonSelection;
  onChange: (addon: Partial<AddonSelection>) => void;
}

const addonIcons = {
  agenda: <BookOpen className="w-6 h-6" />,
  cuadro: <Frame className="w-6 h-6" />,
  cuchara: <Paperclip className="w-6 h-6" />
};


export function StepAddon({ addon, onChange }: StepAddonProps) {
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
            onValueChange={(value) => {
              onChange({ type: value as AddonSelection['type'], cuadroDescription: value !== 'cuadro' ? '' : addon.cuadroDescription });
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {ADDON_TYPES.map((type) => (
              <Label
                key={type.value}
                htmlFor={`addon-${type.value}`}
                className={`flex flex-col items-center justify-center space-y-2 border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-primary ${addon.type === type.value ? 'border-primary bg-primary/10' : 'border-input-border'}`}
              >
                <RadioGroupItem value={type.value} id={`addon-${type.value}`} className="sr-only" />
                <div className="text-primary">{addonIcons[type.value]}</div>
                <span>{type.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {addon.type === 'cuadro' && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <Label htmlFor="cuadroDescription" className="text-lg font-medium">Descripción para tu Cuadro:</Label>
            <Textarea
              id="cuadroDescription"
              placeholder="Escribe una frase inspiradora, un nombre, ¡lo que quieras!"
              value={addon.cuadroDescription}
              onChange={(e) => onChange({ cuadroDescription: e.target.value })}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">Máximo 100 caracteres.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
