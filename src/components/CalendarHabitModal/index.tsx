import type { ICalendarHabit } from '@t/calendarHabit.types';
import type { IHabit } from '@t/habit.types';
import Button, { ButtonVariant } from '@ui-kit/Button';
import React from 'react';

import styles from './styles.module.css';
interface ICalendarHabitModalProps {
  habit: IHabit;
  calendarHabit: ICalendarHabit;
  onSave: ({ completedAt, comment }: Partial<ICalendarHabit>) => void;
  onDelete: () => void;
}

const CalendarHabitModal: React.FC<ICalendarHabitModalProps> = ({
  calendarHabit,
  onSave,
  onDelete,
}) => {
  const [completedAt, setCompletedAt] = React.useState<string | null>(
    calendarHabit.completedAt ?? null
  );
  const [comment, setComment] = React.useState(calendarHabit.comment ?? '');

  return (
    <div className={styles.calendarHabitForm}>
      <label>
        <input
          type="checkbox"
          checked={!!completedAt}
          onChange={(e) =>
            setCompletedAt(e.target.checked ? new Date().toISOString() : null)
          }
        />{' '}
        Сделано
      </label>
      <textarea
        autoFocus
        style={{ display: 'block' }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий"
      />
      <div style={{ fontSize: '10px' }}>
        <table border={0} width="100%">
          <tbody>
            <tr>
              <td>Добавлено в календарь</td>
              <td>
                {calendarHabit.createdAt
                  ? new Date(calendarHabit.createdAt).toLocaleString()
                  : '-'}
              </td>
            </tr>
            <tr>
              <td>Обновлено</td>
              <td>
                {calendarHabit.updatedAt
                  ? new Date(calendarHabit.updatedAt).toLocaleString()
                  : '-'}
              </td>
            </tr>
            <tr>
              {' '}
              <td>Завершено</td>
              <td>
                {calendarHabit.completedAt
                  ? new Date(calendarHabit.completedAt).toLocaleString()
                  : 'Неа'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer>
        <Button
          onClick={() => {
            if (window.confirm(`Точно удалить?`)) onDelete();
          }}
        >
          🗑️
        </Button>
        <Button
          onClick={() => {
            onSave({ completedAt, comment });
          }}
          variant={ButtonVariant.primary}
        >
          Сохранить
        </Button>
      </footer>
    </div>
  );
};
export default CalendarHabitModal;
