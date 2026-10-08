import { ReactNode } from 'react';
import { ThemeProviderClient } from './ThemeProviderClient';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProviderClient>{children}</ThemeProviderClient>;
}
