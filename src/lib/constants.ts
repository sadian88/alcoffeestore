
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
      { value: 'blanca', label: 'Blanca', image: '/img/productos/tazatermicablanca.png', dataAiHint: 'white mug', price: 25000 },
      { value: 'rosa', label: 'Rosa', image: '/img/productos/tazatermicarosa.png', dataAiHint: 'pink mug', price: 25000 },
      { value: 'gris', label: 'Gris', image: '/img/productos/tazatermicagris.png', dataAiHint: 'gray mug', price: 25000 },
    ],
  },
  {
    value: 'ecologica',
    label: 'Taza Ecológica',
    icon: Leaf,
    variations: [
      { value: 'natural', label: 'Natural', image: 'https://placehold.co/120x120.png?text=Taza+Eco', dataAiHint: 'bamboo cup', price: 20000 },
      { value: 'rosa_pastel', label: 'Rosa Pastel', image: 'https://placehold.co/120x120.png?text=Taza+Eco', dataAiHint: 'pastel pink cup', price: 20000 },
      { value: 'azul_cielo', label: 'Azul Cielo', image: 'https://placehold.co/120x120.png?text=Taza+Eco', dataAiHint: 'sky blue cup', price: 20000 },
      { value: 'verde_menta', label: 'Verde Menta', image: 'https://placehold.co/120x120.png?text=Taza+Eco', dataAiHint: 'mint green cup', price: 20000 },
    ],
  },
  {
    value: 'termo',
    label: 'Termo Viajero',
    icon: Rocket,
    isPersonalizable: true,
    personalizationFee: 7000,
    variations: [
      { value: 'default', label: 'Estándar', image: '/img/productos/termostandart.png', dataAiHint: 'travel thermos', price: 20000 }
    ],
  },
];

export const ADDON_OPTIONS: ConfigurableItem[] = [
  {
    value: 'agenda',
    label: 'Mini Agenda',
    icon: BookOpen,
    variations: [
      { value: 'miniblanca', label: 'Lineas doradas', image: '/img/productos/miniagendablanca.png', dataAiHint: 'white agenda', price: 12000 },
      { value: 'mininegra', label: 'Lineas doradas', image: '/img/productos/miniagendanegra.png', dataAiHint: 'black agenda', price: 12000 },
      { value: 'minirosa', label: 'Lineas doradas', image: '/img/productos/miniagendarosa.png', dataAiHint: 'pink agenda', price: 12000 },
      { value: 'palnner', label: 'Planeador', image: '/img/productos/miniagendarosa.png', dataAiHint: 'planner agenda', price: 15000 },
      { value: 'floral', label: 'Agenda Floral', image: '/img/productos/miniagendarosa.png', dataAiHint: 'floral agenda', price: 24000 },
      { value: 'estrellas', label: 'Agenda Estrellas', image: '/img/productos/miniagendablanca.png', dataAiHint: 'stars agenda', price: 39000 },
    ],
  },
  {
    value: 'cuadro',
    label: 'Cuadro Decorativo',
    icon: Frame,
    requiresDescription: true,
    descriptionFee: 3000, 
    variations: [
      { value: 'default', label: 'Estándar', image: '/img/productos/miniagendarosa.png', dataAiHint: 'decorative frame', price: 11000 } 
    ],
  },
  {
    value: 'cuchara',
    label: 'Cuchara Clip',
    icon: Paperclip,
    variations: [
      { value: 'cdorada', label: 'Dorada', image: 'https://placehold.co/120x120.png?text=Cuchara+Oro', dataAiHint: 'gold spoon', price: 17000 },
      { value: 'cplata', label: 'Plata', image: 'https://placehold.co/120x120.png?text=Cuchara+Plata', dataAiHint: 'silver spoon', price: 17000 }
    ],
  },
];

export const PRESET_KITS_DATA: PresetKit[] = [
  {
    id: 'preset1',
    name: 'Kit Love',
    description: 'Empieza tu día con dulzura, energía y un toque adorable.',
    price: 87000, 
    image: '/img/kits/love.png', 
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'rosa' },
    cuchara: { type: 'cuchara', variation: 'cdorada' }, 
    addon: { type: 'agenda', variation: 'floral' }, // Uses new 'floral' variation (price 24000)
    mug: { type: 'ecologica', variation: 'rosa_pastel' },
  },
  {
    id: 'preset2',
    name: 'Kit Paz',
    description: 'Un momento de calma y sabor con tu café favorito.',
    price: 102000, 
    image: '/img/kits/paz.png', 
    isPreset: true,
    coffee: { size: '150g', packagingColor: 'blanco' },
    cuchara: { type: 'cuchara', variation: 'cplata' }, 
    addon: { type: 'cuadro', variation: 'default', cuadroDescription: 'Sueña en Grande ✨' },
    mug: { type: 'termica', variation: 'blanca', termicaMarked: false },
  },
  {
    id: 'preset4',
    name: 'Kit Gozo',
    description: 'Una explosión de alegría y sabor para iluminar tus días.',
    price: 102000,
    image: '/img/kits/gozo.png',
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'blanco' },
    cuchara: { type: 'cuchara', variation: 'cdorada' }, 
    addon: { type: 'agenda', variation: 'estrellas' }, // Uses new 'estrellas' variation (price 39000)
    mug: { type: 'ecologica', variation: 'verde_menta' },
  }
];

export const COFFEE_SIZES: { value: '150g' | '250g'; label: string; price: number }[] = [
  { value: '150g', label: '150 gramos', price: 17000 },
  { value: '250g', label: '250 gramos', price: 26000 },
];

export const PACKAGING_COLORS: Omit<ItemVariation, 'price'>[] = [
  { value: 'blanco', label: 'Blanco Nube ☁️', image: 'https://placehold.co/100x100.png?text=Pack+Blanco', dataAiHint: 'white packaging' },
  { value: 'rosa', label: 'Rosa Pastel 🌸', image: 'https://placehold.co/100x100.png?text=Pack+Rosa', dataAiHint: 'pink packaging' },
  { value: 'dorado', label: 'Dorado Brillante ✨', image: 'https://placehold.co/100x100.png?text=Pack+Dorado', dataAiHint: 'gold packaging' },
];


export const THERMAL_MUG_CUSTOMIZATION_OPTIONS: { value: 'marcada' | 'sin_marcar'; label: string }[] = [
    { value: 'marcada', label: 'Con frase personalizada ✍️' },
    { value: 'sin_marcar', label: 'Sin marcar (lisa)' },
];

export const findOption = (config: ConfigurableItem[], value: string | undefined): ConfigurableItem | undefined => config.find(opt => opt.value === value);
export const findVariation = (option: ConfigurableItem | undefined, variationValue: string | undefined): ItemVariation | undefined => option?.variations?.find(v => v.value === variationValue);
export const findPackagingColor = (value: string | undefined): Omit<ItemVariation, 'price'> | undefined => PACKAGING_COLORS.find(pc => pc.value === value);
export const findCoffeeSize = (value: string | undefined) => COFFEE_SIZES.find(cs => cs.value === value);


    



