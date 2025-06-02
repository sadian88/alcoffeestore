export type CoffeeSize = '250g' | '150g';
export type PackagingColor = 'blanco' | 'rosa' | 'dorado';
export type AddonType = 'agenda' | 'cuadro' | 'cuchara';
export type MugType = 'termica' | 'ecologica' | 'termo';

export interface CoffeeSelection {
  size: CoffeeSize | '';
  packagingColor: PackagingColor | '';
}

export interface AddonSelection {
  type: AddonType | '';
  cuadroDescription?: string;
}

export interface MugSelection {
  type: MugType | '';
  termicaMarked?: boolean;
  termicaPhrase?: string;
}

export interface KitConfig {
  id?: string; // For items in cart
  name?: string; // For preset kits or to identify custom kits
  coffee: CoffeeSelection;
  addon: AddonSelection;
  mug: MugSelection;
  isPreset?: boolean;
  price?: number; 
  image?: string; 
  description?: string; // For preset kits primarily
}

export interface PresetKit extends KitConfig {
  id: string;
  name: string;
  isPreset: true;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends KitConfig {
  id: string; // Ensure cart items always have an ID
  quantity: number; // If we want to allow quantity adjustments later
}
