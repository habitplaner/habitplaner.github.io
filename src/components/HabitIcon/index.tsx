import type { IHabit } from '@t/habit.types';
import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IHabitIconProps extends HTMLAttributes<HTMLDivElement> {
  habit: IHabit;
}

const HabitIcon: React.FC<IHabitIconProps> = ({ habit, ...rest }) => {
  return (
    <span
      {...rest}
      style={{
        backgroundColor: habit.color,
        ...(rest.style ?? {}),
      }}
      className={clsx(styles.miniHabit, rest.className)}
    >
      {habit.shortName}
    </span>
  );
};

export default HabitIcon;
