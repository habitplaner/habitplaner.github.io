import { stringToColor } from "../helpers/colorHelper.js";

export class HabitInCalendar {
  id = '';
  completedAt = null;
  createdAt = new Date();
  isoDate = new Date().toISOString().substring(0,10);
  comment = '';
  habit;


  constructor(habit){
    this.habit = habit;
  }

  updateFromObject(obj) {
    Object.entries(obj).forEach(([k,v]) => {
      this[k] = v;
    })

  }

  setIsCompleted(b) {
    this.completedAt = b ? new Date() : null;
  }

  setId(id) {
    this.id = id;
  }

  setDate(date) {
    this.isoDate = date.toISOString().substring(0,10);
  }

  toObject() {
    return {
      id: this.id,
      completedAt: this.completedAt,
      createdAt: this.createdAt,
      comment: this.comment,
      habit: this.habit,
      isoDate: this.isoDate,
    }
  }

}