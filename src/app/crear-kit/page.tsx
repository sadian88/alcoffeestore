
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { KitConfig, CoffeeSelection, AddonSelection, MugSelection, CartItem, CartItemComponentDetail } from '@/types';
import { Button } from '@/components/ui/button';
import { StepCoffee } from '@/components/kit-builder/step-coffee';
import { StepAddon } from '@/components/kit-builder/step-addon';
import { StepMug } from '@/components/kit-builder/step-mug';
import { OrderSummary } from '@/components/kit-builder/order-summary';
import { KitProgressBar } from '@/components/kit-builder/kit-progress-bar';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/hooks/use-cart-store';
import { useToast } from '@/hooks/use-toast';
import { 
  MUG_OPTIONS, 
  ADDON_OPTIONS, 
  PACKAGING_COLORS, 
  COFFEE_SIZES, 
  findOption, 
  findVariation,
  findCoffeeSize,
  findPackagingColor,
  type ItemVariation,
  type ConfigurableItem
} from '@/lib/constants';

const initialCoffeeState: CoffeeSelection = { size: '', packagingColor: '' };
const initialAddonState: AddonSelection = { type: '', variation: '', cuadroDescription: '' };
const initialMugState: MugSelection = { type: '', variation: '', termicaMarked: false, termicaPhrase: '' };

const initialKitConfig: Readonly<KitConfig> = {
  name: 'Kit Personalizado',
  coffee: { ...initialCoffeeState },
  addon: { ...initialAddonState },
  mug: { ...initialMugState },
  isPreset: false,
  price: 0,
};

const TOTAL_STEPS = 3;
const STEP_NAMES = ["Café", "Complemento", "Taza"];


export function calculateCoffeePrice(coffee: CoffeeSelection): number {
  const coffeeSizeInfo = findCoffeeSize(coffee.size);
  return coffeeSizeInfo?.price || 0;
}

export function calculateAddonPrice(addon: AddonSelection): number {
  let price = 0;
  const addonTypeInfo = findOption(ADDON_OPTIONS, addon.type);
  if (addonTypeInfo) {
    const addonVariationInfo = findVariation(addonTypeInfo, addon.variation);
    if (addonVariationInfo) {
      price += addonVariationInfo.price;
    }
    if (addonTypeInfo.value === 'cuadro' && addon.cuadroDescription && addonTypeInfo.descriptionFee) {
      price += addonTypeInfo.descriptionFee;
    }
  }
  return price;
}

export function calculateMugPrice(mug: MugSelection): number {
  let price = 0;
  const mugTypeInfo = findOption(MUG_OPTIONS, mug.type);
  if (mugTypeInfo) {
    const mugVariationInfo = findVariation(mugTypeInfo, mug.variation);
    if (mugVariationInfo) {
      price += mugVariationInfo.price;
    }
    if (mugTypeInfo.value === 'termica' && mug.termicaMarked && mugTypeInfo.personalizationFee) {
      price += mugTypeInfo.personalizationFee;
    }
  }
  return price;
}


export default function CrearKitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [kitConfig, setKitConfig] = useState<KitConfig>({
    ...initialKitConfig,
    coffee: { ...initialCoffeeState },
    addon: { ...initialAddonState },
    mug: { ...initialMugState }
  });

  const router = useRouter();
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const calculateKitPriceTotal = useCallback((currentKitConfig: KitConfig): number => {
    const coffeePrice = calculateCoffeePrice(currentKitConfig.coffee);
    const addonPrice = calculateAddonPrice(currentKitConfig.addon);
    const mugPrice = calculateMugPrice(currentKitConfig.mug);
    return coffeePrice + addonPrice + mugPrice;
  }, []);

  useEffect(() => {
    const newPrice = calculateKitPriceTotal(kitConfig);
    setKitConfig(prev => ({ ...prev, price: newPrice }));
  }, [kitConfig.coffee, kitConfig.addon, kitConfig.mug, calculateKitPriceTotal]);


  useEffect(() => {
    let updated = false;
    const newConfig = { ...kitConfig };

    if (!newConfig.coffee.size && COFFEE_SIZES.length > 0) {
      newConfig.coffee.size = COFFEE_SIZES[0].value;
      updated = true;
    }
    if (!newConfig.coffee.packagingColor && PACKAGING_COLORS.length > 0) {
      newConfig.coffee.packagingColor = PACKAGING_COLORS[0].value;
      updated = true;
    }

    if (!newConfig.addon.type && ADDON_OPTIONS.length > 0) {
      const defaultAddonType = ADDON_OPTIONS[0];
      newConfig.addon.type = defaultAddonType.value;
      newConfig.addon.variation = defaultAddonType.variations?.[0]?.value || '';
      updated = true;
    }

    if (!newConfig.mug.type && MUG_OPTIONS.length > 0) {
      const defaultMugType = MUG_OPTIONS[0];
      newConfig.mug.type = defaultMugType.value;
      newConfig.mug.variation = defaultMugType.variations?.[0]?.value || '';
      newConfig.mug.termicaMarked = defaultMugType.value === 'termica' ? false : undefined;
      newConfig.mug.termicaPhrase = defaultMugType.value === 'termica' ? '' : undefined;
      updated = true;
    }
    if (updated) {
      setKitConfig(newConfig);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const updateMug = (mugUpdate: Partial<MugSelection>) => {
    const newType = mugUpdate.type === undefined ? kitConfig.mug.type : mugUpdate.type;
    const mugConfig = findOption(MUG_OPTIONS, newType);
    const newVariation = mugUpdate.variation === undefined
        ? (newType === kitConfig.mug.type ? kitConfig.mug.variation : mugConfig?.variations?.[0]?.value || '')
        : mugUpdate.variation;
    
    setKitConfig(prev => ({
      ...prev,
      mug: {
        ...prev.mug,
        ...mugUpdate,
        type: newType,
        variation: newVariation,
        termicaMarked: newType === 'termica' ? (mugUpdate.termicaMarked ?? prev.mug.termicaMarked ?? false) : undefined,
        termicaPhrase: newType === 'termica' ? (mugUpdate.termicaPhrase ?? prev.mug.termicaPhrase) : undefined,
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
      termicaPhrase: defaultMugType?.value === 'termica' ? '' : undefined
    };

    const newKit = {
      ...initialKitConfig,
      coffee: newCoffeeState,
      addon: newAddonState,
      mug: newMugState
    };
    newKit.price = calculateKitPriceTotal(newKit);
    setKitConfig(newKit);
    setCurrentStep(1);
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
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
        if (mugConfig?.isPersonalizable && typeof kitConfig.mug.termicaMarked === 'undefined') return false;
        // If termicaMarked is true, termicaPhrase must not be empty (if we want to enforce this, add: && (!kitConfig.mug.termicaMarked || (kitConfig.mug.termicaMarked && !!kitConfig.mug.termicaPhrase)))
        // For now, allowing empty phrase if marked, as fee is for marking itself.
        return true;
      }
      default: return false;
    }
  }

  const isEntireKitValid = () => isStepValid(1) && isStepValid(2) && isStepValid(3);

  const getCoffeeComponentDetail = (selection: CoffeeSelection): CartItemComponentDetail => {
    const sizeLabel = findCoffeeSize(selection.size)?.label || '';
    const colorLabel = findPackagingColor(selection.packagingColor)?.label || '';
    const colorData = findPackagingColor(selection.packagingColor);
    return {
      type: 'coffee',
      name: `Café ${sizeLabel}, Empaque ${colorLabel}`,
      price: calculateCoffeePrice(selection),
      selectionDetails: selection,
      image: colorData?.image.replace(/100x100/g, '80x80') || 'https://placehold.co/80x80.png'
    };
  };

  const getAddonComponentDetail = (selection: AddonSelection): CartItemComponentDetail => {
    const addonTypeInfo = findOption(ADDON_OPTIONS, selection.type);
    const variationInfo = findVariation(addonTypeInfo, selection.variation);
    let name = addonTypeInfo?.label || 'Complemento';
    if (variationInfo && (variationInfo.value !== 'default' || (addonTypeInfo?.variations?.length ?? 0) > 1)) {
      name += `, ${variationInfo.label}`;
    }
    if (selection.type === 'cuadro' && selection.cuadroDescription) {
      name += ` ("${selection.cuadroDescription}")`;
    }
    return {
      type: 'addon',
      name: name,
      price: calculateAddonPrice(selection),
      selectionDetails: selection,
      image: variationInfo?.image.replace(/120x150|120x120/g, '80x80') || 'https://placehold.co/80x80.png'
    };
  };

  const getMugComponentDetail = (selection: MugSelection): CartItemComponentDetail => {
    const mugTypeInfo = findOption(MUG_OPTIONS, selection.type);
    const variationInfo = findVariation(mugTypeInfo, selection.variation);
    let name = mugTypeInfo?.label || 'Taza';
    if (variationInfo && (variationInfo.value !== 'default' || (mugTypeInfo?.variations?.length ?? 0) > 1)) {
      name += `, ${variationInfo.label}`;
    }
    if (selection.type === 'termica' && selection.termicaMarked && selection.termicaPhrase) {
      name += ` (Frase: "${selection.termicaPhrase}")`;
    } else if (selection.type === 'termica' && selection.termicaMarked) {
      name += ` (Personalizada)`;
    }
    return {
      type: 'mug',
      name: name,
      price: calculateMugPrice(selection),
      selectionDetails: selection,
      image: variationInfo?.image.replace(/120x120/g, '80x80') || 'https://placehold.co/80x80.png'
    };
  };
  
  const handleAddFullKitToCart = (navigateToCart: boolean = false) => {
    if (!isEntireKitValid()) {
      toast({ title: "Kit Incompleto", description: "Por favor, completa todos los pasos de tu kit.", variant: "destructive" });
      if (!isStepValid(1)) navigateToStep(1);
      else if (!isStepValid(2)) navigateToStep(2);
      else if (!isStepValid(3)) navigateToStep(3);
      return;
    }

    const kitName = `Kit Personalizado ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const totalPrice = calculateKitPriceTotal(kitConfig);
    
    const coffeeComponent = getCoffeeComponentDetail(kitConfig.coffee);
    const addonComponent = getAddonComponentDetail(kitConfig.addon);
    const mugComponent = getMugComponentDetail(kitConfig.mug);

    const cartItem: Omit<CartItem, 'id' | 'quantity'> = {
      cartItemType: 'kit',
      displayName: kitName,
      totalPrice: totalPrice,
      components: [coffeeComponent, addonComponent, mugComponent],
      displayImage: mugComponent.image, // Default to mug image for kit
    };

    addToCart(cartItem);
    toast({ title: "¡Kit Agregado! 💖", description: `${kitName} ha sido añadido a tu carrito.`, className: "bg-primary/10 border-primary text-primary-foreground"});
    resetKit();
    if (navigateToCart) {
      router.push('/carrito');
    }
  };

  const handleAddIndividualComponentToCart = (componentType: 'coffee' | 'addon' | 'mug') => {
    let componentDetail: CartItemComponentDetail | undefined = undefined; // Initialize as undefined
    let displayName: string = ''; // Initialize as empty
    let isValid = false;

    if (componentType === 'coffee' && isStepValid(1)) {
      componentDetail = getCoffeeComponentDetail(kitConfig.coffee);
      displayName = componentDetail.name;
      isValid = true;
    } else if (componentType === 'addon' && isStepValid(2)) {
      componentDetail = getAddonComponentDetail(kitConfig.addon);
      displayName = componentDetail.name;
      isValid = true;
    } else if (componentType === 'mug' && isStepValid(3)) {
      componentDetail = getMugComponentDetail(kitConfig.mug);
      displayName = componentDetail.name;
      isValid = true;
    } else {
      toast({ title: "Selección Incompleta", description: `Por favor, completa la selección de ${componentType === 'coffee' ? 'café' : componentType === 'addon' ? 'complemento' : 'taza'}.`, variant: "destructive" });
      return;
    }

    if (isValid && componentDetail) { // Check if componentDetail is defined
      const cartItem: Omit<CartItem, 'id' | 'quantity'> = {
        cartItemType: 'individual_product',
        displayName: displayName,
        totalPrice: componentDetail.price,
        components: [componentDetail], // componentDetail is now guaranteed to be defined
        displayImage: componentDetail.image,
      };
      addToCart(cartItem);
      toast({ title: "¡Producto Agregado! ✨", description: `${displayName} ha sido añadido a tu carrito.` });
    }
  };


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
                onClick={() => handleAddFullKitToCart(true)}
                disabled={!isEntireKitValid()}
                className="text-lg px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Agregar Kit y Ver Carrito <ShoppingCart className="ml-2 h-5 w-5" />
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
            isStepValid={isStepValid}
            calculateCoffeePrice={calculateCoffeePrice}
            calculateAddonPrice={calculateAddonPrice}
            calculateMugPrice={calculateMugPrice}
            onAddFullKit={() => handleAddFullKitToCart(false)}
            onAddIndividualComponent={handleAddIndividualComponentToCart}
          />
        </aside>
      </div>
    </div>
  );
}

