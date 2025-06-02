
export type CoffeeSize = '250g' | '150g';
export type PackagingColor = 'blanco' | 'rosa' | 'dorado';

// These specific string literal types for AddonType and MugType might become too restrictive
// if we add many new types directly in components. Using string for more flexibility from constants.
// export type AddonType = 'agenda' | 'cuadro' | 'cuchara';
// export type MugType = 'termica' | 'ecologica' | 'termo';

export interface CoffeeSelection {
  size: CoffeeSize | '';
  packagingColor: PackagingColor | '';
}

export interface AddonSelection {
  type: string; // Main type like 'agenda', 'cuadro'
  variation?: string; // Specific variation like 'agenda_rosa_floral' or color value
  cuadroDescription?: string;
}

export interface MugSelection {
  type: string; // Main type like 'termica', 'ecologica'
  variation?: string; // Specific variation like 'termica_negra' or color value
  termicaMarked?: boolean;
  termicaPhrase?: string;
}

export interface KitConfig {
  id?: string;
  name?: string;
  coffee: CoffeeSelection;
  addon: AddonSelection;
  mug: MugSelection;
  isPreset?: boolean;
  price?: number;
  image?: string;
  description?: string;
}

export interface PresetKit extends KitConfig {
  id: string;
  name: string;
  isPreset: true;
  price: number;
  image: string;
  description: string;
  // Ensure preset kits also define addon.variation and mug.variation if applicable
  addon: AddonSelection & { type: 'agenda' | 'cuadro' | 'cuchara' }; // More specific for presets
  mug: MugSelection & { type: 'termica' | 'ecologica' | 'termo' }; // More specific for presets
}

export interface CartItem extends KitConfig {
  id: string;
  quantity: number;
}
