export interface IHabit {
  id: string;
  name: string;
  description: string;
  color: string;
  shortName: string;
  createdAt: string;
  updatedAt: string | null;
  archivedAt: string | null;
  periodicityHour: number | null;
}
