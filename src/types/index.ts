
export type CoffeeSize = '250g' | '150g';
export type PackagingColor = 'blanco' | 'rosa' | 'dorado';

export interface CoffeeSelection {
  size: CoffeeSize | '';
  packagingColor: PackagingColor | '';
}

export interface AddonSelection {
  type: string;
  variation?: string;
  cuadroDescription?: string;
}

export interface MugSelection {
  type: string;
  variation?: string;
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
  price?: number; // Total price of the kit
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
  addon: AddonSelection & { type: 'agenda' | 'cuadro' | 'cuchara' };
  mug: MugSelection & { type: 'termica' | 'ecologica' | 'termo' };
}

// Represents an individual component within a cart item (either a kit or a single product)
export interface CartItemComponentDetail {
  type: 'coffee' | 'addon' | 'mug';
  name: string; // e.g., "Café 250g, Empaque Rosa" or "Agenda Floral" or "Taza Térmica Negra"
  price: number; // Price of this specific component
  selectionDetails: CoffeeSelection | AddonSelection | MugSelection; // The actual selection data
  image?: string; // Image for this component
}

export interface CartItem {
  id: string; // Unique ID for this cart entry (e.g., timestamp + random)
  cartItemType: 'kit' | 'individual_product'; // Discriminator
  displayName: string; // e.g., "Kit Personalizado" or "Café 250g"
  totalPrice: number; // Total price for this cart entry (1 quantity)
  quantity: number;
  
  // Only if cartItemType is 'kit' and it's based on a preset
  isPresetKit?: boolean; 
  presetKitId?: string;

  // Array of components.
  // If cartItemType is 'kit', this will have 3 components (coffee, addon, mug).
  // If cartItemType is 'individual_product', this will have 1 component.
  components: CartItemComponentDetail[];

  // Overall image for the cart item. For a kit, could be a generic kit image or mug image.
  // For an individual product, it's that product's image.
  displayImage?: string; 
}
