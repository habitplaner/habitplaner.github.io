import HabitIcon from '@components/HabitIcon';
import type { IHabit } from '@t/habit.types';
import ListItem from '@ui-kit/List/ListItem';
import clsx from 'clsx';
import type React from 'react';
import type { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IHabitItemProps extends HTMLAttributes<HTMLLIElement> {
  habit: IHabit;
  toolbar?: React.ReactNode;
}

const HabitItem: React.FC<IHabitItemProps> = ({ habit, toolbar, ...rest }) => {
  return (
    <ListItem {...rest} className={clsx(styles.habitItem, rest.className)}>
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
    </ListItem>
  );
};

export default HabitItem;
