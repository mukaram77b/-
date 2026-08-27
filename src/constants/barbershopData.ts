export * from './spaData';
import { SPA_INFO, SERVICES_LIST, MASTER_THERAPISTS } from './spaData';

// Compatibility aliases for legacy names if referenced
export const BARBERSHOP_INFO = {
  ...SPA_INFO,
  neighborhood: 'Бишкек ш. (Эркиндик, Асанбай, Манас)'
};
export const SERVICES = SERVICES_LIST;
export const BARBERS = MASTER_THERAPISTS;
export const REVIEWS = [];
