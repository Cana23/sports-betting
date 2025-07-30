import { useContext } from 'react';
import type { PeriodContextType } from '../interfaces/periodContext';
import { PeriodContext } from '../context/PeriodContext';

export const usePeriod = (): PeriodContextType => {
  const context = useContext(PeriodContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};