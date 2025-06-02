"use client";

import { useState } from 'react';
import type { KitConfig, CoffeeSelection, AddonSelection, MugSelection } from '@/types';
import { Button } from '@/components/ui/button';
import { StepCoffee } from '@/components/kit-builder/step-coffee';
import { StepAddon } from '@/components/kit-builder/step-addon';
import { StepMug } from '@/components/kit-builder/step-mug';
import { OrderSummary } from '@/components/kit-builder/order-summary';
import { KitProgressBar } from '@/components/kit-builder/kit-progress-bar';
import { ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';

const initialCoffeeState: CoffeeSelection = { size: '', packagingColor: '' };
const initialAddonState: AddonSelection = { type: '' };
const initialMugState: MugSelection = { type: '' };

const initialKitConfig: Readonly<KitConfig> = {
  name: 'Kit Personalizado',
  coffee: initialCoffeeState,
  addon: initialAddonState,
  mug: initialMugState,
  isPreset: false,
};

const TOTAL_STEPS = 3;
const STEP_NAMES = ["Café", "Complemento", "Taza"];


export default function CrearKitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [kitConfig, setKitConfig] = useState<KitConfig>({...initialKitConfig});

  const updateCoffee = (coffee: Partial<CoffeeSelection>) => setKitConfig(prev => ({ ...prev, coffee: { ...prev.coffee, ...coffee } }));
  const updateAddon = (addon: Partial<AddonSelection>) => setKitConfig(prev => ({ ...prev, addon: { ...prev.addon, ...addon } }));
  const updateMug = (mug: Partial<MugSelection>) => setKitConfig(prev => ({ ...prev, mug: { ...prev.mug, ...mug } }));

  const resetKit = () => {
    setKitConfig({...initialKitConfig}); // Create a new object to ensure re-render
    setCurrentStep(1);
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      // Allow navigation to previous/completed steps or current step.
      // For future steps, only allow if current path is valid or it's the next logical step.
      // For simplicity, only allow if step <= currentStep or step === currentStep + 1 (and current is valid)
      // For this version, simpler: if step <= currentStep or if it's step 1.
      if(step <= currentStep || step === 1) {
         setCurrentStep(step);
      } else if (step === currentStep + 1 && isStepValid(currentStep)) {
         setCurrentStep(step);
      }
    }
  };

  const isStepValid = (step: number): boolean => {
    switch(step) {
      case 1: return !!kitConfig.coffee.size && !!kitConfig.coffee.packagingColor;
      case 2: return !!kitConfig.addon.type && (kitConfig.addon.type !== 'cuadro' || !!kitConfig.addon.cuadroDescription);
      case 3: return !!kitConfig.mug.type && (kitConfig.mug.type !== 'termica' || typeof kitConfig.mug.termicaMarked !== 'undefined') && (kitConfig.mug.type !== 'termica' || !kitConfig.mug.termicaMarked || !!kitConfig.mug.termicaPhrase);
      default: return false;
    }
  }


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepCoffee coffee={kitConfig.coffee} onChange={updateCoffee} />;
      case 2:
        return <StepAddon addon={kitConfig.addon} onChange={updateAddon} />;
      case 3:
        return <StepMug mug={kitConfig.mug} onChange={updateMug} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <KitProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} onStepClick={navigateToStep} stepNames={STEP_NAMES} />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          {renderStepContent()}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="text-lg px-6 py-3">
              <ArrowLeft className="mr-2 h-5 w-5" /> Anterior
            </Button>
            {currentStep < TOTAL_STEPS ? (
              <Button onClick={nextStep} disabled={!isStepValid(currentStep)} className="text-lg px-6 py-3">
                Siguiente <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button onClick={() => { /* Final review/action if needed, otherwise summary handles add to cart */ }} disabled={!isStepValid(currentStep)} className="text-lg px-6 py-3 bg-green-500 hover:bg-green-600">
                Revisar Kit Completo <CheckSquare className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <aside className="lg:w-1/3">
          <OrderSummary kitConfig={kitConfig} onReset={resetKit} currentStep={currentStep} navigateToStep={navigateToStep} />
        </aside>
      </div>
    </div>
  );
}
