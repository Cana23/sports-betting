export interface PeriodContextType {
  period: number;
  togglePeriod: () => void;
}

export const defaultPeriodContext: PeriodContextType = {
  period: 35,
  togglePeriod: () => {}
};