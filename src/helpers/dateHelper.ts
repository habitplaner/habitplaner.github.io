export const firstDateOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDateOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const getWeekDay = (date = new Date()) => (date.getDay() + 6) % 7;

export const getISODay = (date = new Date()) =>
  date.toISOString().substring(0, 10);
