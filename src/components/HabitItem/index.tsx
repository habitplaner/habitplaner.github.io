import HabitIcon from '@components/HabitIcon';
import type { IHabit } from '@t/habit.types';
import type React from 'react';

import styles from './styles.module.css';

interface IHabitItemProps {
  habit: IHabit;
  toolbar?: React.ReactNode;
}

const HabitItem: React.FC<IHabitItemProps> = ({ habit, toolbar }) => {
  return (
    <div className={styles.habitItem}>
      <HabitIcon habit={habit} />
      <strong>{habit.name}</strong>
      <div style={{ marginLeft: 'auto' }}>
        <div>
          <small>
            <em>{habit.description}</em>
          </small>
        </div>
      </div>
      {toolbar}
    </div>
  );
};

export default HabitItem;
