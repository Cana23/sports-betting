// src/context/PeriodProvider.tsx
import React, { useState, useCallback, ReactNode } from 'react';
import type { PeriodContextType } from '../interfaces/periodContext';
import { PeriodContext } from './PeriodContext';

interface PeriodProviderProps {
  children: ReactNode;
}

export const PeriodProvider: React.FC<PeriodProviderProps> = ({ children }) => {
  const [period, setPeriod] = useState<number>(35);

  const togglePeriod = useCallback(() => {
    setPeriod((prevPeriod) => prevPeriod + 1);
  }, []);

  const contextValue: PeriodContextType = {
    period,
    togglePeriod,
  };

  return (
    <PeriodContext.Provider value={contextValue}>
      {children}
    </PeriodContext.Provider>
  );
};
