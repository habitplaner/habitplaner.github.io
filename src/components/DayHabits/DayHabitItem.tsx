import MiniCalendarHabit from '@components/Calendar/MiniCalendarHabit';
import type { ICalendarHabit } from '@t/calendarHabit.types';
import type { IHabit } from '@t/habit.types';
import ListItem from '@ui-kit/List/ListItem';
import type React from 'react';

import styles from './styles.module.css';

interface IDayHabitItemProps extends React.HTMLAttributes<HTMLLIElement> {
  habit: IHabit;
  calendarHabit: ICalendarHabit;
}

const DayHabitItem: React.FC<IDayHabitItemProps> = ({
  habit,
  calendarHabit,
  ...rest
}) => {
  return (
    <ListItem {...rest} className={styles.dayHabitListItem}>
      <strong>
        <MiniCalendarHabit habit={habit} calendarHabit={calendarHabit} />
        &nbsp; {habit.name}
      </strong>

      {calendarHabit.comment && (
        <div>
          <small>
            <em>{calendarHabit.comment}</em>
          </small>
        </div>
      )}

      <span style={{ marginLeft: 'auto' }}>
        {calendarHabit.completedAt ? '✅' : '☐'}
      </span>
    </ListItem>
  );
};

export default DayHabitItem;
