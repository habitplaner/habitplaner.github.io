import HabitIcon from '@components/HabitIcon';
import type { IHabit } from '@t/habit.types';

import styles from './styles.module.css';

interface IHabitCardItemProps {
  habit: IHabit;
}

const HabitCardItem: React.FC<IHabitCardItemProps> = ({ habit }) => {
  return (
    <div
      className={styles.habitsCardItem}
      draggable
      style={{ backgroundColor: habit.color, borderColor: habit.color }}
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', habit.id);

        (event.target as HTMLDivElement).classList.add(styles.dragging);
      }}
      onDragEnd={(event) => {
        (event.target as HTMLDivElement).classList.remove(styles.dragging);
      }}
    >
      <HabitIcon habit={habit} />
      <small>{habit.name}</small>
    </div>
  );
};

export default HabitCardItem;
