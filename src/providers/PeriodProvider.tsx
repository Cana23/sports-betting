import React, { useState, useCallback, ReactNode } from 'react';
import type { PeriodContextType } from '../interfaces/periodContext';
import { PeriodContext } from '../context/PeriodContext';

interface PeriodProviderProps {
  children: ReactNode;
}

export const PeriodProvider: React.FC<PeriodProviderProps> = ({ children }) => {
  const [period, setPeriod] = useState<number>(35);

  const togglePeriod = useCallback(() => {
    setPeriod(period + 1);
  }, []);

  const contextValue: PeriodContextType = {
      period
  };

  return (
    <PeriodContext.Provider value={contextValue}>
      {children}
    </PeriodContext.Provider>
  );
};