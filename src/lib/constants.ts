
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
    personalizationFee: 2, // Example fee
    variations: [
      { value: 'negra', label: 'Negra', image: 'https://placehold.co/120x120/333333/FFFFFF?text=T.Negra', dataAiHint: 'black mug', price: 12 },
      { value: 'blanca', label: 'Blanca', image: 'https://placehold.co/120x120/F5F5F5/333333?text=T.Blanca', dataAiHint: 'white mug', price: 12 },
      { value: 'rosa', label: 'Rosa', image: 'https://placehold.co/120x120/FFC0CB/333333?text=T.Rosa', dataAiHint: 'pink mug', price: 13 },
      { value: 'gris', label: 'Gris', image: 'https://placehold.co/120x120/A9A9A9/FFFFFF?text=T.Gris', dataAiHint: 'gray mug', price: 11 },
    ],
  },
  {
    value: 'ecologica',
    label: 'Taza Ecológica',
    icon: Leaf,
    variations: [
      { value: 'natural', label: 'Natural', image: 'https://placehold.co/120x120/DEB887/333333?text=Eco+Natural', dataAiHint: 'bamboo cup', price: 9 },
      { value: 'rosa_pastel', label: 'Rosa Pastel', image: 'https://placehold.co/120x120/FFD1DC/333333?text=Eco+Rosa', dataAiHint: 'pastel_pink cup', price: 10 },
      { value: 'azul_cielo', label: 'Azul Cielo', image: 'https://placehold.co/120x120/ADD8E6/333333?text=Eco+Azul', dataAiHint: 'sky_blue cup', price: 10 },
      { value: 'verde_menta', label: 'Verde Menta', image: 'https://placehold.co/120x120/98FB98/333333?text=Eco+Verde', dataAiHint: 'mint_green cup', price: 10 },
    ],
  },
  {
    value: 'termo',
    label: 'Termo Viajero',
    icon: Rocket,
    variations: [
      { value: 'default', label: 'Estándar', image: 'https://placehold.co/120x120/778899/FFFFFF?text=Termo', dataAiHint: 'travel thermos', price: 15 }
    ],
  },
];

export const ADDON_OPTIONS: ConfigurableItem[] = [
  {
    value: 'agenda',
    label: 'Agenda Kawaii',
    icon: BookOpen,
    variations: [
      { value: 'floral', label: 'Floral', image: 'https://placehold.co/120x150/FFB6C1/4A4A4A?text=Agenda+Floral', dataAiHint: 'floral planner', price: 7 },
      { value: 'estrellas', label: 'Estrellas', image: 'https://placehold.co/120x150/ADD8E6/4A4A4A?text=Agenda+Estrellas', dataAiHint: 'stars planner', price: 7 },
      { value: 'topos', label: 'Topos', image: 'https://placehold.co/120x150/FFFFE0/4A4A4A?text=Agenda+Topos', dataAiHint: 'dots planner', price: 6 },
    ],
  },
  {
    value: 'cuadro',
    label: 'Cuadro Decorativo',
    icon: Frame,
    requiresDescription: true,
    descriptionFee: 3, // Example fee
    variations: [
      { value: 'default', label: 'Estándar', image: 'https://placehold.co/120x120/D2B48C/FFFFFF?text=Cuadro', dataAiHint: 'decorative frame', price: 10 }
    ],
  },
  {
    value: 'cuchara',
    label: 'Cuchara Clip Dorada',
    icon: Paperclip,
    variations: [
      { value: 'default', label: 'Dorada', image: 'https://placehold.co/120x120/FFD700/4A4A4A?text=Cuchara', dataAiHint: 'gold spoon', price: 4 }
    ],
  },
];

export const PRESET_KITS_DATA: PresetKit[] = [
  {
    id: 'preset1',
    name: 'Kit Mañanero Kawaii',
    description: 'Empieza tu día con dulzura, energía y un toque adorable.',
    price: 25.99, // This is the fixed price for the preset kit
    image: 'https://placehold.co/300x300/FFC0CB/4A4A4A?text=Kit+Alegre',
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'rosa' },
    addon: { type: 'agenda', variation: 'floral' },
    mug: { type: 'ecologica', variation: 'rosa_pastel' },
  },
  {
    id: 'preset2',
    name: 'Kit Relax Pastel',
    description: 'Un momento de calma y sabor con tu café favorito.',
    price: 29.50, // Fixed price
    image: 'https://placehold.co/300x300/E6E6FA/4A4A4A?text=Kit+Relax',
    isPreset: true,
    coffee: { size: '150g', packagingColor: 'blanco' },
    addon: { type: 'cuadro', variation: 'default', cuadroDescription: 'Sueña en Grande ✨' },
    mug: { type: 'termica', variation: 'blanca', termicaMarked: false },
  },
  {
    id: 'preset3',
    name: 'Kit Dorado Deluxe',
    description: 'Lujo y sabor para los paladares más exigentes.',
    price: 35.00, // Fixed price
    image: 'https://placehold.co/300x300/FFD700/4A4A4A?text=Kit+Deluxe',
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'dorado' },
    addon: { type: 'cuchara', variation: 'default' },
    mug: { type: 'termo', variation: 'default' },
  },
];

export const COFFEE_SIZES: { value: '150g' | '250g'; label: string; price: number }[] = [
  { value: '150g', label: '150 gramos', price: 5 },
  { value: '250g', label: '250 gramos', price: 8 },
];

// PACKAGING_COLORS do not have their own price, it's part of coffee.
export const PACKAGING_COLORS: Omit<ItemVariation, 'price'>[] = [
  { value: 'blanco', label: 'Blanco Nube ☁️', image: 'https://placehold.co/100x100/F5F5F5/333333?text=Blanco', dataAiHint: 'white packaging' },
  { value: 'rosa', label: 'Rosa Pastel 🌸', image: 'https://placehold.co/100x100/FFC0CB/333333?text=Rosa', dataAiHint: 'pink packaging' },
  { value: 'dorado', label: 'Dorado Brillante ✨', image: 'https://placehold.co/100x100/FFD700/4A4A4A?text=Dorado', dataAiHint: 'gold packaging' },
];


export const THERMAL_MUG_CUSTOMIZATION_OPTIONS: { value: 'marcada' | 'sin_marcar'; label: string }[] = [
    { value: 'marcada', label: 'Con frase personalizada ✍️' },
    { value: 'sin_marcar', label: 'Sin marcar (lisa)' },
];

export const findOption = (config: ConfigurableItem[], value: string | undefined): ConfigurableItem | undefined => config.find(opt => opt.value === value);
export const findVariation = (option: ConfigurableItem | undefined, variationValue: string | undefined): ItemVariation | undefined => option?.variations?.find(v => v.value === variationValue);
export const findPackagingColor = (value: string | undefined): Omit<ItemVariation, 'price'> | undefined => PACKAGING_COLORS.find(pc => pc.value === value);
export const findCoffeeSize = (value: string | undefined) => COFFEE_SIZES.find(cs => cs.value === value);

