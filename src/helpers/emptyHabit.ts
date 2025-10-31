import type { IHabit } from '@t/habit.types';

export const getEmptyHabit = (p: Partial<IHabit>) => {
  return {
    id: '',
    name: '',
    description: '',
    color: '',
    shortName: '',
    createdAt: new Date().toISOString(),
    updatedAt: null,
    archivedAt: null,
    periodicityHour: null,
    ...p,
  } satisfies IHabit;
};
