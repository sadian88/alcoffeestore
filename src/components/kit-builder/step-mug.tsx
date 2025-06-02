"use client";

import type { MugSelection } from '@/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MUG_TYPES, THERMAL_MUG_OPTIONS } from '@/lib/constants';
import { Coffee as CoffeeIcon, Leaf, Thermos } from 'lucide-react'; // Renamed to avoid conflict

interface StepMugProps {
  mug: MugSelection;
  onChange: (mug: Partial<MugSelection>) => void;
}

const mugIcons = {
  termica: <CoffeeIcon className="w-6 h-6" />,
  ecologica: <Leaf className="w-6 h-6" />,
  termo: <Thermos className="w-6 h-6" />
};

export function StepMug({ mug, onChange }: StepMugProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <CoffeeIcon className="w-7 h-7 text-primary" /> Paso 3: Elige tu Taza
        </CardTitle>
        <CardDescription>
          Escoge la taza perfecta para disfrutar tu café.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-medium">Tipo de Taza:</Label>
          <RadioGroup
            value={mug.type}
            onValueChange={(value) => {
              const newType = value as MugSelection['type'];
              const resetOptions = newType !== 'termica' ? { termicaMarked: undefined, termicaPhrase: '' } : {};
              onChange({ type: newType, ...resetOptions });
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {MUG_TYPES.map((type) => (
              <Label
                key={type.value}
                htmlFor={`mug-${type.value}`}
                className={`flex flex-col items-center justify-center space-y-2 border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-primary ${mug.type === type.value ? 'border-primary bg-primary/10' : 'border-input-border'}`}
              >
                 <RadioGroupItem value={type.value} id={`mug-${type.value}`} className="sr-only" />
                 <div className="text-primary">{mugIcons[type.value]}</div>
                <span>{type.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {mug.type === 'termica' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-2">
              <Label className="text-lg font-medium">Personalización Taza Térmica:</Label>
              <RadioGroup
                value={mug.termicaMarked ? 'marcada' : 'sin_marcar'}
                onValueChange={(value) => {
                  const isMarked = value === 'marcada';
                  onChange({ termicaMarked: isMarked, termicaPhrase: !isMarked ? '' : mug.termicaPhrase });
                }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {THERMAL_MUG_OPTIONS.map(opt => (
                   <Label
                    key={opt.value}
                    htmlFor={`thermal-${opt.value}`}
                    className={`flex items-center space-x-2 border-2 p-3 rounded-lg cursor-pointer transition-all hover:border-primary ${ (mug.termicaMarked && opt.value === 'marcada') || (!mug.termicaMarked && opt.value === 'sin_marcar') ? 'border-primary bg-primary/10' : 'border-input-border'}`}
                  >
                    <RadioGroupItem value={opt.value} id={`thermal-${opt.value}`} />
                    <span>{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

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
