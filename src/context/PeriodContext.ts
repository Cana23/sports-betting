import { createContext } from 'react';
import { defaultPeriodContext, type PeriodContextType } from '../interfaces/periodContext';

export const PeriodContext = createContext<PeriodContextType>(defaultPeriodContext);