export class HabitPlaner {
  habits = [];
  habitsOfMonth = [];
  constructor() {}
  async getAllHabitsForUser(userId) {
    const obj = await window.db.get(`habits/${userId}`); // {[id]: {obj}}
    this.habits = obj ? Object.values(obj) : [];
  }
  async addHabitForUser(userId, habit) {
    const newId = await window.db.getUniqueKey(`habits/${userId}`);
    habit.setId(newId);
    await window.db.set(`habits/${userId}/${newId}`, habit.toObject());
  }
  async addHabitToCalendar(userId, date, habitInCalendar) {
    const target = `habitsInCalendar/${userId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    const newId = await window.db.getUniqueKey(target);
    habitInCalendar.setId(newId);
    habitInCalendar.setDate(date);
    await window.db.set(`${target}/${newId}`, habitInCalendar.toObject());

    this.habitsOfMonth.push(habitInCalendar)
    return habitInCalendar;
  }
  async getHabitsOfMonth(userId, date) {
    const target = `habitsInCalendar/${userId}/${date.getFullYear()}/${date.getMonth()}`;
    const mothHabitsDictionary = await window.db.get(target);
    this.habitsOfMonth = Object.values(mothHabitsDictionary).flat().map((v) => Object.values(v).flat()).flat();
    return this.habitsOfMonth;
  }


  async getHabitsOfDate(userId, date) {
    const target = `habitsInCalendar/${userId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    const mothHabitsDictionary = await window.db.get(target);
    return Object.values(mothHabitsDictionary).flat();
  }
}