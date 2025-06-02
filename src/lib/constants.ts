import type { PresetKit } from '@/types';

export const PRESET_KITS_DATA: PresetKit[] = [
  {
    id: 'preset1',
    name: 'Kit Mañanero Kawaii',
    description: 'Empieza tu día con dulzura, energía y un toque adorable.',
    price: 25.99,
    image: 'https://placehold.co/300x300/FFC0CB/4A4A4A?text=Kit+Alegre',
    isPreset: true,
    coffee: { size: '250g', packagingColor: 'rosa' },
    addon: { type: 'agenda' },
    mug: { type: 'ecologica' },
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
    mug: { type: 'termica', termicaMarked: false },
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
    mug: { type: 'termo' },
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

export const ADDON_TYPES: { value: 'agenda' | 'cuadro' | 'cuchara'; label: string }[] = [
  { value: 'agenda', label: 'Agenda Kawaii 📔' },
  { value: 'cuadro', label: 'Cuadro Decorativo Personalizado 🖼️' },
  { value: 'cuchara', label: 'Cuchara Clip Dorada 🥄' },
];

export const MUG_TYPES: { value: 'termica' | 'ecologica' | 'termo'; label: string }[] = [
  { value: 'termica', label: 'Taza Térmica ☕' },
  { value: 'ecologica', label: 'Taza Ecológica de Bambú 🌱' },
  { value: 'termo', label: 'Termo Viajero Estilizado 🚀' },
];

export const THERMAL_MUG_OPTIONS: { value: 'marcada' | 'sin_marcar'; label: string }[] = [
    { value: 'marcada', label: 'Con frase personalizada ✍️' },
    { value: 'sin_marcar', label: 'Sin marcar (lisa)' },
];
