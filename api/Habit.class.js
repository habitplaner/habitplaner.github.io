import { stringToColor } from "../helpers/colorHelper.js";

export class Habit {
  id = '';
  name = '';
  color = '#006699';
  shortName = '';
  description = '';
  periodicityHour = 24;
  createdAt = new Date();
  archivedAt = null;

  constructor(name = ''){
    this.name = name;
    this.color = stringToColor(name);
  }

  updateFromObject(obj) {
    Object.entries(obj).forEach(([k,v]) => {
      this[k] = v;
    })

  }

  setName(name) {
    this.name = name;
    this.color = stringToColor(name);
  }

  setId(id) {
    this.id = id;
  }
  toObject() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      shortName: this.shortName,
      description: this.description,
      periodicityHour: this.periodicityHour,
      createdAt: this.createdAt,
      archivedAt: this.archivedAt,
    }
  }

}