
import type { PresetKit } from '@/types';
import { Coffee as CoffeeIcon, Leaf, Rocket, BookOpen, Frame, Paperclip } from 'lucide-react';
import type { ElementType } from 'react';

export interface ItemVariation {
  value: string;
  label: string;
  image: string;
  dataAiHint: string;
  price: number; // Price for this specific variation
}

export interface ConfigurableItem {
  value: string;
  label: string;
  icon?: ElementType;
  variations?: ItemVariation[];
  isPersonalizable?: boolean; // For mugs like termica that can have text
  requiresDescription?: boolean; // For addons like cuadro
  personalizationFee?: number; // Extra cost for marking termica
  descriptionFee?: number; // Extra cost for cuadro description
}

export const MUG_OPTIONS: ConfigurableItem[] = [
  {
    value: 'termica',
    label: 'Taza Térmica',
    icon: CoffeeIcon,
    isPersonalizable: true,
    personalizationFee: 10000, 
    variations: [
      { value: 'negra', label: 'Negra', image: 'https://placehold.co/120x120/333333/FFFFFF?text=T.Negra', dataAiHint: 'black mug', price: 25000 },
      { value: 'blanca', label: 'Blanca', image: 'https://placehold.co/120x120/F5F5F5/333333?text=T.Blanca', dataAiHint: 'white mug', price: 25000 },
      { value: 'rosa', label: 'Rosa', image: 'https://placehold.co/120x120/FFC0CB/333333?text=T.Rosa', dataAiHint: 'pink mug', price: 25000 },
      { value: 'gris', label: 'Gris', image: 'https://placehold.co/120x120/A9A9A9/FFFFFF?text=T.Gris', dataAiHint: 'gray mug', price: 25000 },
    ],
  },
  {
    value: 'ecologica',
    label: 'Taza Ecológica',
    icon: Leaf,
    variations: [
      { value: 'natural', label: 'Natural', image: 'https://placehold.co/120x120/DEB887/333333?text=Eco+Natural', dataAiHint: 'bamboo cup', price: 20000 },
      { value: 'rosa_pastel', label: 'Rosa Pastel', image: 'https://placehold.co/120x120/FFD1DC/333333?text=Eco+Rosa', dataAiHint: 'pastel_pink cup', price: 20000 },
      { value: 'azul_cielo', label: 'Azul Cielo', image: 'https://placehold.co/120x120/ADD8E6/333333?text=Eco+Azul', dataAiHint: 'sky_blue cup', price: 20000 },
      { value: 'verde_menta', label: 'Verde Menta', image: 'https://placehold.co/120x120/98FB98/333333?text=Eco+Verde', dataAiHint: 'mint_green cup', price: 20000 },
    ],
  },
  {
    value: 'termo',
    label: 'Termo Viajero',
    icon: Rocket,
    isPersonalizable: true,
    personalizationFee: 7000,
    variations: [
      { value: 'default', label: 'Estándar', image: 'https://placehold.co/120x120/778899/FFFFFF?text=Termo', dataAiHint: 'travel thermos', price: 20000 }
    ],
  },
];

export const ADDON_OPTIONS: ConfigurableItem[] = [
  {
    value: 'agenda',
    label: 'Agenda Kawaii',
    icon: BookOpen,
    variations: [
      { value: 'floral', label: 'Floral', image: 'https://placehold.co/120x150/FFB6C1/4A4A4A?text=Agenda+Floral', dataAiHint: 'floral planner', price: 14000 },
      { value: 'estrellas', label: 'Estrellas', image: 'https://placehold.co/120x150/ADD8E6/4A4A4A?text=Agenda+Estrellas', dataAiHint: 'stars planner', price: 14000 },
      { value: 'topos', label: 'Topos', image: 'https://placehold.co/120x150/FFFFE0/4A4A4A?text=Agenda+Topos', dataAiHint: 'dots planner', price: 14000 },
    ],
  },
  {
    value: 'cuadro',
    label: 'Cuadro Decorativo',
    icon: Frame,
    requiresDescription: true,
    descriptionFee: 3000, 
    variations: [
      { value: 'default', label: 'Estándar', image: 'https://placehold.co/120x120/D2B48C/FFFFFF?text=Cuadro', dataAiHint: 'decorative frame', price: 11000 } 
    ],
  },
  {
    value: 'cuchara',
    label: 'Cuchara Clip Dorada',
    icon: Paperclip,
    variations: [
      { value: 'default', label: 'Dorada', image: 'https://placehold.co/120x120/FFD700/4A4A4A?text=Cuchara', dataAiHint: 'gold spoon', price: 17000 }
    ],
  },
];

export const PRESET_KITS_DATA: PresetKit[] = [
  {
    id: 'preset1',
    name: 'Kit Love',
    description: 'Empieza tu día con dulzura, energía y un toque adorable.',
    price: 25.99, 
    image: 'https://placehold.co/300x300/FFC0CB/4A3B31?text=Kit+Love', 
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'rosa' },
    addon: { type: 'agenda', variation: 'floral' },
    mug: { type: 'ecologica', variation: 'rosa_pastel' },
  },
  {
    id: 'preset2',
    name: 'Kit Paz',
    description: 'Un momento de calma y sabor con tu café favorito.',
    price: 29.50, 
    image: 'https://placehold.co/300x300/E6E6FA/4A3B31?text=Kit+Paz', 
    isPreset: true,
    coffee: { size: '150g', packagingColor: 'blanco' },
    addon: { type: 'cuadro', variation: 'default', cuadroDescription: 'Sueña en Grande ✨' },
    mug: { type: 'termica', variation: 'blanca', termicaMarked: false },
  },
  {
    id: 'preset3',
    name: 'Kit Esperanza',
    description: 'Lujo y sabor para los paladares más exigentes.',
    price: 35.00, 
    image: 'https://placehold.co/300x300/FFFACD/4A3B31?text=Kit+Esperanza', // LemonChiffon background, a bit different from gold
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'dorado' },
    addon: { type: 'cuchara', variation: 'default' },
    mug: { type: 'termo', variation: 'default' },
  },
  {
    id: 'preset4',
    name: 'Kit Gozo',
    description: 'Una explosión de alegría y sabor para iluminar tus días.',
    price: 32.00,
    image: 'https://placehold.co/300x300/F0E68C/4A3B31?text=Kit+Gozo', // Khaki background
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'blanco' },
    addon: { type: 'agenda', variation: 'estrellas' },
    mug: { type: 'ecologica', variation: 'verde_menta' },
  }
];

export const COFFEE_SIZES: { value: '150g' | '250g'; label: string; price: number }[] = [
  { value: '150g', label: '150 gramos', price: 17000 },
  { value: '250g', label: '250 gramos', price: 26000 },
];

export const PACKAGING_COLORS: Omit<ItemVariation, 'price'>[] = [
  { value: 'blanco', label: 'Blanco Nube ☁️', image: 'https://placehold.co/100x100/F5F5F5/4A3B31?text=Blanco', dataAiHint: 'white packaging' },
  { value: 'rosa', label: 'Rosa Pastel 🌸', image: 'https://placehold.co/100x100/FFC0CB/4A3B31?text=Rosa', dataAiHint: 'pink packaging' },
  { value: 'dorado', label: 'Dorado Brillante ✨', image: 'https://placehold.co/100x100/FFD700/4A3B31?text=Dorado', dataAiHint: 'gold packaging' },
];


export const THERMAL_MUG_CUSTOMIZATION_OPTIONS: { value: 'marcada' | 'sin_marcar'; label: string }[] = [
    { value: 'marcada', label: 'Con frase personalizada ✍️' },
    { value: 'sin_marcar', label: 'Sin marcar (lisa)' },
];

export const findOption = (config: ConfigurableItem[], value: string | undefined): ConfigurableItem | undefined => config.find(opt => opt.value === value);
export const findVariation = (option: ConfigurableItem | undefined, variationValue: string | undefined): ItemVariation | undefined => option?.variations?.find(v => v.value === variationValue);
export const findPackagingColor = (value: string | undefined): Omit<ItemVariation, 'price'> | undefined => PACKAGING_COLORS.find(pc => pc.value === value);
export const findCoffeeSize = (value: string | undefined) => COFFEE_SIZES.find(cs => cs.value === value);


    