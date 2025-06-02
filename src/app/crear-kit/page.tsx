
"use client";

import { useState, useEffect } from 'react';
import type { KitConfig, CoffeeSelection, AddonSelection, MugSelection } from '@/types';
import { Button } from '@/components/ui/button';
import { StepCoffee } from '@/components/kit-builder/step-coffee';
import { StepAddon } from '@/components/kit-builder/step-addon';
import { StepMug } from '@/components/kit-builder/step-mug';
import { OrderSummary } from '@/components/kit-builder/order-summary';
import { KitProgressBar } from '@/components/kit-builder/kit-progress-bar';
import { ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';
import { MUG_OPTIONS, ADDON_OPTIONS, PACKAGING_COLORS, COFFEE_SIZES, findOption } from '@/lib/constants';

const initialCoffeeState: CoffeeSelection = { size: '', packagingColor: '' };
const initialAddonState: AddonSelection = { type: '', variation: '', cuadroDescription: '' };
const initialMugState: MugSelection = { type: '', variation: '', termicaMarked: false, termicaPhrase: '' };

const initialKitConfig: Readonly<KitConfig> = {
  name: 'Kit Personalizado',
  coffee: { ...initialCoffeeState },
  addon: { ...initialAddonState },
  mug: { ...initialMugState },
  isPreset: false,
};

const TOTAL_STEPS = 3;
const STEP_NAMES = ["Café", "Complemento", "Taza"];

export default function CrearKitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [kitConfig, setKitConfig] = useState<KitConfig>({
    ...initialKitConfig,
    coffee: { ...initialCoffeeState },
    addon: { ...initialAddonState },
    mug: { ...initialMugState }
  });

  useEffect(() => {
    // Set default coffee selections
    if (!kitConfig.coffee.size && COFFEE_SIZES.length > 0) {
      updateCoffee({ size: COFFEE_SIZES[0].value });
    }
    if (!kitConfig.coffee.packagingColor && PACKAGING_COLORS.length > 0) {
      updateCoffee({ packagingColor: PACKAGING_COLORS[0].value });
    }

    // Set default addon selections if not already set
    if (!kitConfig.addon.type && ADDON_OPTIONS.length > 0) {
      const defaultAddonType = ADDON_OPTIONS[0];
      updateAddon({
        type: defaultAddonType.value,
        variation: defaultAddonType.variations?.[0]?.value || '',
      });
    }

    // Set default mug selections if not already set
    if (!kitConfig.mug.type && MUG_OPTIONS.length > 0) {
      const defaultMugType = MUG_OPTIONS[0];
      updateMug({
        type: defaultMugType.value,
        variation: defaultMugType.variations?.[0]?.value || '',
        termicaMarked: defaultMugType.value === 'termica' ? false : undefined,
        termicaPhrase: defaultMugType.value === 'termica' ? '' : undefined,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount to set initial defaults

  const updateCoffee = (coffee: Partial<CoffeeSelection>) => setKitConfig(prev => ({ ...prev, coffee: { ...prev.coffee, ...coffee } }));
  
  const updateAddon = (addon: Partial<AddonSelection>) => {
    const newType = addon.type === undefined ? kitConfig.addon.type : addon.type;
    const addonConfig = findOption(ADDON_OPTIONS, newType);
    const newVariation = addon.variation === undefined 
        ? (newType === kitConfig.addon.type ? kitConfig.addon.variation : addonConfig?.variations?.[0]?.value || '')
        : addon.variation;

    setKitConfig(prev => ({
      ...prev,
      addon: {
        ...prev.addon,
        ...addon,
        type: newType,
        variation: newVariation,
        cuadroDescription: newType !== 'cuadro' ? '' : (addon.cuadroDescription ?? prev.addon.cuadroDescription),
      }
    }));
  };

  const updateMug = (mug: Partial<MugSelection>) => {
    const newType = mug.type === undefined ? kitConfig.mug.type : mug.type;
    const mugConfig = findOption(MUG_OPTIONS, newType);
    const newVariation = mug.variation === undefined
        ? (newType === kitConfig.mug.type ? kitConfig.mug.variation : mugConfig?.variations?.[0]?.value || '')
        : mug.variation;
    
    setKitConfig(prev => ({
      ...prev,
      mug: {
        ...prev.mug,
        ...mug,
        type: newType,
        variation: newVariation,
        termicaMarked: newType === 'termica' ? (mug.termicaMarked ?? prev.mug.termicaMarked ?? false) : undefined,
        termicaPhrase: newType === 'termica' ? (mug.termicaPhrase ?? prev.mug.termicaPhrase) : '',
      }
    }));
  };

  const resetKit = () => {
    const newCoffeeState = { size: COFFEE_SIZES[0]?.value || '', packagingColor: PACKAGING_COLORS[0]?.value || '' };
    
    const defaultAddonType = ADDON_OPTIONS[0];
    const newAddonState = { 
      type: defaultAddonType?.value || '', 
      variation: defaultAddonType?.variations?.[0]?.value || '', 
      cuadroDescription: '' 
    };
    
    const defaultMugType = MUG_OPTIONS[0];
    const newMugState = { 
      type: defaultMugType?.value || '', 
      variation: defaultMugType?.variations?.[0]?.value || '',
      termicaMarked: defaultMugType?.value === 'termica' ? false : undefined,
      termicaPhrase: ''
    };

    setKitConfig({
      ...initialKitConfig,
      coffee: newCoffeeState,
      addon: newAddonState,
      mug: newMugState
    });
    setCurrentStep(1);
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      if (step <= currentStep || step === 1) { // Allow navigation to previous steps or step 1
        setCurrentStep(step);
      } else { // For navigating forward, check if all preceding steps are valid
        let canNavigate = true;
        for (let i = 1; i < step; i++) {
          if (!isStepValid(i)) {
            canNavigate = false;
            break;
          }
        }
        if (canNavigate) {
          setCurrentStep(step);
        }
      }
    }
  };
  

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!kitConfig.coffee.size && !!kitConfig.coffee.packagingColor;
      case 2: {
        if (!kitConfig.addon.type) return false;
        const addonConfig = findOption(ADDON_OPTIONS, kitConfig.addon.type);
        if (addonConfig?.variations && addonConfig.variations.length > 0 && !kitConfig.addon.variation) return false;
        if (addonConfig?.requiresDescription && !kitConfig.addon.cuadroDescription) return false;
        return true;
      }
      case 3: {
        if (!kitConfig.mug.type) return false;
        const mugConfig = findOption(MUG_OPTIONS, kitConfig.mug.type);
        if (mugConfig?.variations && mugConfig.variations.length > 0 && !kitConfig.mug.variation) return false;
        if (mugConfig?.isPersonalizable && typeof kitConfig.mug.termicaMarked === 'undefined') return false; // Should be true or false if personalizable
        if (mugConfig?.isPersonalizable && kitConfig.mug.termicaMarked && !kitConfig.mug.termicaPhrase) return false;
        return true;
      }
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
              <Button
                onClick={() => { /* Potentially scroll to summary or final review action */ }}
                disabled={!isStepValid(currentStep)}
                className="text-lg px-6 py-3 bg-green-500 hover:bg-green-600"
              >
                Revisar Kit Completo <CheckSquare className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <aside className="lg:w-1/3">
          <OrderSummary 
            kitConfig={kitConfig} 
            onReset={resetKit} 
            currentStep={currentStep} 
            navigateToStep={navigateToStep}
            isStepValid={isStepValid} // Pass isStepValid here
          />
        </aside>
      </div>
    </div>
  );
}

