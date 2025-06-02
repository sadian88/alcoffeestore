
import type { PresetKit } from '@/types';
import { Coffee as CoffeeIcon, Leaf, Rocket, BookOpen, Frame, Paperclip } from 'lucide-react';
import type { ElementType } from 'react';

export interface ItemVariation {
  value: string; // e.g., 'negra', 'rosa_floral'
  label: string; // e.g., 'Negra', 'Rosa Floral'
  image: string; // URL to placeholder
  dataAiHint: string;
}

export interface ConfigurableItem {
  value: string; // e.g., 'termica', 'agenda'
  label: string; // e.g., 'Taza Térmica ☕'
  icon?: ElementType;
  variations?: ItemVariation[];
  isPersonalizable?: boolean; // For mugs like termica that can have text
  requiresDescription?: boolean; // For addons like cuadro
}

export const MUG_OPTIONS: ConfigurableItem[] = [
  {
    value: 'termica',
    label: 'Taza Térmica',
    icon: CoffeeIcon,
    isPersonalizable: true,
    variations: [
      { value: 'negra', label: 'Negra', image: 'https://placehold.co/120x120/333333/FFFFFF?text=T.Negra', dataAiHint: 'black mug' },
      { value: 'blanca', label: 'Blanca', image: 'https://placehold.co/120x120/F5F5F5/333333?text=T.Blanca', dataAiHint: 'white mug' },
      { value: 'rosa', label: 'Rosa', image: 'https://placehold.co/120x120/FFC0CB/333333?text=T.Rosa', dataAiHint: 'pink mug' },
      { value: 'gris', label: 'Gris', image: 'https://placehold.co/120x120/A9A9A9/FFFFFF?text=T.Gris', dataAiHint: 'gray mug' },
    ],
  },
  {
    value: 'ecologica',
    label: 'Taza Ecológica',
    icon: Leaf,
    variations: [
      { value: 'natural', label: 'Natural', image: 'https://placehold.co/120x120/DEB887/333333?text=Eco+Natural', dataAiHint: 'bamboo cup' },
      { value: 'rosa_pastel', label: 'Rosa Pastel', image: 'https://placehold.co/120x120/FFD1DC/333333?text=Eco+Rosa', dataAiHint: 'pastel_pink cup' },
      { value: 'azul_cielo', label: 'Azul Cielo', image: 'https://placehold.co/120x120/ADD8E6/333333?text=Eco+Azul', dataAiHint: 'sky_blue cup' },
      { value: 'verde_menta', label: 'Verde Menta', image: 'https://placehold.co/120x120/98FB98/333333?text=Eco+Verde', dataAiHint: 'mint_green cup' },
    ],
  },
  {
    value: 'termo',
    label: 'Termo Viajero',
    icon: Rocket,
    // No variations specified by user for this one, can be added later if needed
  },
];

export const ADDON_OPTIONS: ConfigurableItem[] = [
  {
    value: 'agenda',
    label: 'Agenda Kawaii',
    icon: BookOpen,
    variations: [
      { value: 'floral', label: 'Floral', image: 'https://placehold.co/120x120/FFB6C1/4A4A4A?text=Agenda+Floral', dataAiHint: 'floral planner' },
      { value: 'estrellas', label: 'Estrellas', image: 'https://placehold.co/120x120/ADD8E6/4A4A4A?text=Agenda+Estrellas', dataAiHint: 'stars planner' },
      { value: 'topos', label: 'Topos', image: 'https://placehold.co/120x120/FFFFE0/4A4A4A?text=Agenda+Topos', dataAiHint: 'dots planner' },
    ],
  },
  {
    value: 'cuadro',
    label: 'Cuadro Decorativo',
    icon: Frame,
    requiresDescription: true,
  },
  {
    value: 'cuchara',
    label: 'Cuchara Clip Dorada',
    icon: Paperclip,
  },
];

export const PRESET_KITS_DATA: PresetKit[] = [
  {
    id: 'preset1',
    name: 'Kit Mañanero Kawaii',
    description: 'Empieza tu día con dulzura, energía y un toque adorable.',
    price: 25.99,
    image: 'https://placehold.co/300x300/FFC0CB/4A4A4A?text=Kit+Alegre',
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'rosa' },
    addon: { type: 'agenda', variation: 'floral' }, // Specify variation for preset
    mug: { type: 'ecologica', variation: 'rosa_pastel' }, // Specify variation for preset
  },
  {
    id: 'preset2',
    name: 'Kit Relax Pastel',
    description: 'Un momento de calma y sabor con tu café favorito.',
    price: 29.50,
    image: 'https://placehold.co/300x300/E6E6FA/4A4A4A?text=Kit+Relax',
    isPreset: true,
    coffee: { size: '150g', packagingColor: 'blanco' },
    addon: { type: 'cuadro', cuadroDescription: 'Sueña en Grande ✨' },
    mug: { type: 'termica', variation: 'blanca', termicaMarked: false }, // Specify variation
  },
  {
    id: 'preset3',
    name: 'Kit Dorado Deluxe',
    description: 'Lujo y sabor para los paladares más exigentes.',
    price: 35.00,
    image: 'https://placehold.co/300x300/FFD700/4A4A4A?text=Kit+Deluxe',
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'dorado' },
    addon: { type: 'cuchara' },
    mug: { type: 'termo' }, // No variation specified for termo in MUG_OPTIONS yet
  },
];

export const COFFEE_SIZES: { value: '150g' | '250g'; label: string }[] = [
  { value: '150g', label: '150 gramos' },
  { value: '250g', label: '250 gramos' },
];

export const PACKAGING_COLORS: { value: 'blanco' | 'rosa' | 'dorado'; label: string }[] = [
  { value: 'blanco', label: 'Blanco Nube ☁️' },
  { value: 'rosa', label: 'Rosa Pastel 🌸' },
  { value: 'dorado', label: 'Dorado Brillante ✨' },
];

// These are for the specific case of personalizing a thermal mug
export const THERMAL_MUG_CUSTOMIZATION_OPTIONS: { value: 'marcada' | 'sin_marcar'; label: string }[] = [
    { value: 'marcada', label: 'Con frase personalizada ✍️' },
    { value: 'sin_marcar', label: 'Sin marcar (lisa)' },
];

// Helper function to find a specific option by value from the new configs
export const findOption = (config: ConfigurableItem[], value: string | undefined) => config.find(opt => opt.value === value);
export const findVariation = (option: ConfigurableItem | undefined, variationValue: string | undefined) => option?.variations?.find(v => v.value === variationValue);
