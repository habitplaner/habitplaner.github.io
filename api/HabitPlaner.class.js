export class HabitPlaner {
  habits = [];
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
}