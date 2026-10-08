import { SelectSize } from './types';

export const SIZE_STYLES: Record<
  SelectSize,
  { trigger: string; icon: string; option: string }
> = {
  sm: {
    trigger: 'py-1.5 text-xs',
    icon: 'w-3.5 h-3.5',
    option: 'py-1.5 text-xs',
  },
  md: {
    trigger: 'py-2.5 text-sm',
    icon: 'w-4 h-4',
    option: 'py-2 text-sm',
  },
  lg: {
    trigger: 'py-3.5 text-base',
    icon: 'w-5 h-5',
    option: 'py-2.5 text-base',
  },
};
